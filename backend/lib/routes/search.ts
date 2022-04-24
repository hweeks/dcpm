import { Router, NextFunction, Response, Request } from "express";
import { Blob } from "../models/blob";
import semver from "semver";
import { User } from "../models/user";
import { logger } from "../server/log";

const router = Router();

export const getLatest = (versions: string[]) => {
  const sortedVersions = versions
    .filter((version) => semver.valid(version))
    .sort(semver.rcompare);
  return sortedVersions[0];
};

export const getVersionRange = (versions: string[], wantedVersion: string) => {
  const sortedVersions = versions
    .filter((version) => semver.valid(version))
    .sort(semver.rcompare);
  return (
    sortedVersions.find((version) =>
      semver.satisfies(version, wantedVersion)
    ) || ""
  );
};

const findBlob = async (req: Request, res: Response, next: NextFunction) => {
  const { searchTerm, searchVersion } = req.body;
  const nameSearch = await Blob.find({
    name: { $regex: searchTerm, $options: "i" },
  }).sort({ downloads: -1 });
  const tagSearch = await Blob.find({
    tags: searchTerm,
  }).sort({ downloads: -1 });
  const queryResult = [...tagSearch, ...nameSearch];
  const hasResults = queryResult && queryResult.length > 0;
  if (hasResults) {
    const parsedResults = queryResult.map(async (blobDoc) => {
      const { name, versions, tags, about, scm, owner, downloads } = blobDoc;
      const ownerName = await User.findById(owner);
      const flatVersions: string[] = versions.map(
        (singleVersion) => singleVersion.version
      ) || [""];
      const requestedVersion = searchVersion
        ? getVersionRange(flatVersions, searchVersion)
        : getLatest(flatVersions);
      return {
        name,
        versions: flatVersions,
        requestedVersion,
        tags,
        about,
        scm,
        owner: ownerName?.username,
        downloads,
      };
    });
    const allResults = await Promise.all(parsedResults);
    res.send(allResults);
  } else {
    logger.debug({ message: "Search Failure", req });
    res.send({});
  }
};

router.post("/api/search", findBlob);

export const SearchRouter = router;
