import { Router, NextFunction, Response, Request } from "express";
import jws from 'jws';
import { User, IUserDoc } from "../models/user";
import { Blob, IBlobDoc, IBlobPayload, VersionConfig } from "../models/blob";
import { fileMiddleware, } from "../server/db";
import semver from 'semver'
import { Types } from "mongoose";

const router = Router();

interface ParsingInput {
  name: string,
  author: string,
  about: string,
  version: string,
  scm: string,
  token?: string | string[]
}

const parseInput = async ({name, author, about, version, scm, token} : ParsingInput) => {
  if (!token) {
    throw new Error('A token is needed to add a blob. Try `dcpm auth` and then re-run `dcpm publish`.')
  }
  const [pAbout, pAuthor, pName, pVersion, pScm] = [
    [about,'about'], [author,'author'], [name,'name'], [version,'version'], [scm,'scm']
  ].map(([value, name]) => {
    if (!value) {
      throw new Error(`You didn't have a ${name} in your upload. Please fix this.`)
    }
    return value
  })
  if (!semver.valid(pVersion)) {
    throw new Error(`It seems like the version you pushed, ${pVersion}, isn't a valid semver version.`)
  }
  return {
    token: Array.isArray(token) ? token[0] : token,
    name: pName,
    author: pAuthor,
    about: pAbout,
    version: pVersion,
    scm: pScm
  }
}

const handleBlobUpdate = async (blobToUpdate : IBlobDoc, {name, version} : ParsingInput, foundUser: IUserDoc, file : Types.ObjectId) => {
  const currentDoc = blobToUpdate.toObject()
  const foundAuthor = currentDoc.authors.find((singleAuthor: any) => {
    return singleAuthor.toString() === foundUser.id
  })
  if (!foundAuthor) {
    throw new Error(`You are not authorized to publish this package. Ask the owner, ${currentDoc.owner}, to add you.`)
  }
  const foundVersion = currentDoc.versions.find((versionInfo : VersionConfig) => versionInfo.version === version)
  if (foundVersion) {
    throw new Error(`Looks like we already have version ${version}, please update your version prior to publish.`)
  }
  currentDoc.versions.push({
    version,
    file
  })
  await blobToUpdate.updateOne(currentDoc)
  return await Blob.findOne({name})
}

const updateOrCreateBlob = async ({name, author, about, version, scm} : ParsingInput, foundUser: IUserDoc, file : Types.ObjectId) => {
  const foundBlob = await Blob.findOne({name})
  if (!foundBlob) {
    const blobPayload : IBlobPayload = {
      owner: foundUser._id,
      name,
      about,
      versions: [
        {
          version,
          file
        }
      ],
      scm,
      authors: [
        foundUser._id
      ]
    }
    return await Blob.create(blobPayload)
  } else {
    return await handleBlobUpdate(
      foundBlob,
      {name, author, about, version, scm},
      foundUser,
      file
    )
  }
}

const decodeToken = (token: string) => {
  return jws.decode(token)
}

const addBlob = async (req: Request, res: Response, next: NextFunction) => {
  const {token} = req.headers
  let {name, author, about, version, scm} = req.body
  const file = req.file.id
  let sanitizedPayload
  try {
    sanitizedPayload = await parseInput({name, author, about, version, scm, token})
  } catch (error) {
    next(error)
    return
  }
  const tokenParsed = decodeToken(sanitizedPayload.token)
  const foundUser = await User.findById(tokenParsed.payload)
  if (!foundUser) {
    next(new Error("I'm not seeing any users that match your token. Verify publish and account status."))
    return
  }
  try {
    await updateOrCreateBlob(sanitizedPayload, foundUser, file)
    next()
    return
  } catch (error) {
    next(error)
    return
  }
}

router.post('/api/blob/add', fileMiddleware.single('blob'), addBlob)

const getBlob = async (req: Request, res: Response, next: NextFunction) => {
  const {blob, version} = req.params
  const foundBlob = await Blob.findOne({name:blob})
  if (!foundBlob) {
    next(new Error(`We can't find a blob named ${blob}. Check the name and try again.`))
  }
  const blobObject = (foundBlob as IBlobDoc).toObject()
  const foundVersion : VersionConfig = blobObject.versions.find((currentVersion: VersionConfig) => {
    return currentVersion.version === version
  })
  if (!foundVersion) {
    next(new Error(`We can't find a blob version ${version}. Check the version and try again.`))
  }
  // TODO How to upload files?
}

router.get('/api/blob/get/:blob/:version', getBlob)

export const BlobRouter = router
