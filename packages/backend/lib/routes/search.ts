import { Router, NextFunction, Response, Request } from "express";
import { Blob } from "../models/blob";
import semver from "semver"

const router = Router();

export const getLatest = (versions: string[]) => {
  const sortedVersions = versions.filter(version => semver.valid(version)).sort(semver.rcompare);
  return sortedVersions[0]
}

const findBlob = async (req: Request, res: Response, next: NextFunction) => {
  const {searchTerm, searchVersion} = req.body
  const queryResult = await Blob.find({
    name: searchTerm
  })
  const hasResults = queryResult && queryResult.length > 0
  if (hasResults) {
    const parsedResults = queryResult.map(blobDoc => {
      const {name, versions} = blobDoc
      const flatVersions = Array.isArray(versions) && versions.map(singleVersion => singleVersion.version)
      return {name, versions: flatVersions, latest: getLatest(flatVersions as string[])}
    })
    res.send(parsedResults)
  } else {
    next()
  }
}

router.post('/api/search', findBlob)

export const SearchRouter = router
