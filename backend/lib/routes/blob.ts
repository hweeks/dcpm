import { Router, NextFunction, Response, Request } from "express";
import jws from "jws";
import { User, IUserDoc } from "../models/user";
import { Blob, IBlobDoc, IBlobPayload, VersionConfig } from "../models/blob";
import { fileMiddleware, gfs } from "../server/db";
import semver from "semver";
import { Types } from "mongoose";
import { ObjectID } from "bson";
import { getLatest, getVersionRange } from "./search";

const router = Router();

export interface ParsingInput {
  name: string;
  author: string;
  about: string;
  version: string;
  scm: string;
  token?: string | string[];
  tags: string[];
}

export const parseInput = ({
  name,
  author,
  about,
  version,
  scm,
  token,
  tags,
}: ParsingInput) => {
  if (!token) {
    throw new Error(
      "A token is needed to add a blob. Try `dcpm auth` and then re-run `dcpm publish`."
    );
  }
  const [pAbout, pAuthor, pName, pVersion, pScm] = [
    [about, "about"],
    [author, "author"],
    [name, "name"],
    [version, "version"],
    [scm, "scm"],
  ].map(([value, name]) => {
    if (!value) {
      throw new Error(
        `You didn't have a ${name} in your upload. Please fix this.`
      );
    }
    return value;
  });
  if (!semver.valid(pVersion)) {
    throw new Error(
      `It seems like the version you pushed, ${pVersion}, isn't a valid semver version.`
    );
  }
  return {
    token: Array.isArray(token) ? token[0] : token,
    name: pName,
    author: pAuthor,
    about: pAbout,
    version: pVersion,
    scm: pScm,
    tags,
  };
};

const handleBlobUpdate = async (
  blobToUpdate: IBlobDoc,
  { name, version, tags, about, scm }: ParsingInput,
  foundUser: IUserDoc,
  file: Types.ObjectId
) => {
  let currentDoc = blobToUpdate.toObject();
  const foundAuthor = currentDoc.authors.find((singleAuthor: any) => {
    return singleAuthor.toString() === foundUser.id;
  });
  if (!foundAuthor) {
    throw new Error(
      `You are not authorized to publish this package. Ask the owner, ${currentDoc.owner}, to add you.`
    );
  }
  const foundVersion = currentDoc.versions.find(
    (versionInfo: VersionConfig) => versionInfo.version === version
  );
  if (foundVersion) {
    throw new Error(
      `Looks like we already have version ${version}, please update your version prior to publish.`
    );
  }
  currentDoc.versions.push({
    version,
    file,
  });
  currentDoc = { ...currentDoc, tags, about, scm };
  await blobToUpdate.updateOne(currentDoc);
  return await Blob.findOne({ name });
};

export const updateOrCreateBlob = async (
  { name, author, about, version, scm, tags }: ParsingInput,
  foundUser: IUserDoc,
  file: Types.ObjectId
) => {
  const foundBlob = await Blob.findOne({ name });
  if (!foundBlob) {
    const blobPayload: IBlobPayload = {
      owner: foundUser._id,
      name,
      about,
      versions: [
        {
          version,
          file,
        },
      ],
      scm,
      authors: [foundUser._id],
      tags,
    };
    return await Blob.create(blobPayload);
  } else {
    return await handleBlobUpdate(
      foundBlob,
      { name, author, about, version, scm, tags },
      foundUser,
      file
    );
  }
};

const decodeToken = (token: string) => {
  return jws.decode(token);
};

export const addBlob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.headers;
  let { name, author, about, version, scm, tags } = req.body;
  const file = req?.file?.id;
  let sanitizedPayload;
  try {
    sanitizedPayload = parseInput({
      name,
      author,
      about,
      version,
      scm,
      token,
      tags: tags.split(","),
    });
  } catch (error) {
    next(error);
    return;
  }
  const tokenParsed = decodeToken(sanitizedPayload.token);
  const foundUser = await User.findById(tokenParsed.payload);
  if (!foundUser) {
    next(
      new Error(
        "I'm not seeing any users that match your token. Verify publish and account status."
      )
    );
    return;
  }
  try {
    await updateOrCreateBlob(sanitizedPayload, foundUser, file);
    res.send({ message: "ok" });
    next();
    return;
  } catch (error) {
    next(error);
    return;
  }
};

router.post("/api/blob/add", fileMiddleware.single("blob"), addBlob);

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.headers;
  const safeToken = Array.isArray(token) ? token[0] : token || "";
  let { username, action, name } = req.body;
  const tokenParsed = decodeToken(safeToken);
  const foundUser = await User.findById(tokenParsed.payload);
  if (!foundUser) {
    next(
      new Error(
        "I'm not seeing any users that match your token. Verify publish and account status."
      )
    );
    return;
  }
  const foundBlob = await Blob.findOne({ name });
  if (!foundBlob) {
    next(new Error("I'm not seeing any blobs that match your search."));
    return;
  }
  const toBeChangedUser = await User.findOne({ username });
  if (!toBeChangedUser) {
    next(
      new Error(
        `I'm not abe to find the user ${username}. Are you sure you got that correct?`
      )
    );
    return;
  }
  const currentBlob = foundBlob.toObject();
  if (action === "add") {
    const alreadyThereUser = currentBlob.authors.find(
      (user: ObjectID) => user.toString() === toBeChangedUser.id
    );
    if (alreadyThereUser) {
      next(
        new Error(
          `It looks like ${username} is already here. I'm not going to do anything.`
        )
      );
      return;
    }
    currentBlob.authors.push(toBeChangedUser._id);
  } else if (action === "remove") {
    currentBlob.authors = currentBlob.authors.filter(
      (user: ObjectID) => user.toString() !== toBeChangedUser.id
    );
  } else {
    next(
      new Error(
        `I can only add or remove a user, I have no idea how to ${action} a user.`
      )
    );
    return;
  }
  await foundBlob.updateOne(currentBlob);
  res.send({ message: "ok" });
  next();
};

router.post("/api/blob/user", updateUser);

export const getBlob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blob, version } = req.params;
  const foundBlob = await Blob.findOne({ name: blob });
  if (!foundBlob) {
    next(
      new Error(
        `We can't find a blob named ${blob}. Check the name and try again.`
      )
    );
  }
  const blobObject = foundBlob?.toObject();
  let foundVersion = "";
  const requestedVersion = version.replace(".zip", "");
  const flatVersions: string[] = blobObject?.versions?.map(
    (singleVersion: VersionConfig) => singleVersion.version
  ) || [""];
  if (version.includes("latest")) {
    foundVersion = getLatest(flatVersions);
  } else {
    foundVersion = getVersionRange(flatVersions, requestedVersion);
  }
  const versionConfig = blobObject?.versions?.find(
    (currentVersion: VersionConfig) => {
      return currentVersion.version === foundVersion;
    }
  );
  if (!versionConfig) {
    next(
      new Error(
        `We can't find a blob version ${requestedVersion}. Check the version and try again.`
      )
    );
    return;
  }
  const readStream = gfs
    .createReadStream({
      _id: versionConfig.file.toString(),
    })
    .on("error", () => {
      const errorOut = new Error(
        "Well crap, I just can seem to make a file out of this blob"
      );
      next(errorOut);
    });
  await foundBlob?.update({
    downloads: (foundBlob.downloads || 0) + 1,
  });
  res.set("Content-Type", "application/zip");
  readStream.pipe(res);
};

router.get("/api/blob/get/:blob/:version", getBlob);

export const BlobRouter = router;
