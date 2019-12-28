import { Router, NextFunction, Response, Request } from "express";
import { Blob } from "../models/blob";
import semver from "semver"

const router = Router();

export const getLatest = (versions: string[]) => {
  const sortedVersions = versions.filter(version => semver.valid(version)).sort(semver.rcompare);
  return sortedVersions[0]
}

export const getVersionRange = (versions: string[], wantedVersion: string) => {
  const sortedVersions = versions.filter(version => semver.valid(version)).sort(semver.rcompare);
  return sortedVersions.find(version => semver.satisfies(version, wantedVersion)) || ''
}

const findBlob = async (req: Request, res: Response, next: NextFunction) => {
  const {searchTerm, searchVersion} = req.body
  const nameSearch = await Blob.find({
    name: searchTerm,
  })
  const tagSearch = await Blob.find({
    tags: searchTerm,
  })
  const queryResult = [...tagSearch, ...nameSearch]
  const hasResults = queryResult && queryResult.length > 0
  if (hasResults) {
    const parsedResults = queryResult.map(blobDoc => {
      const {name, versions, tags} = blobDoc
      const flatVersions : string[] = versions.map(singleVersion => singleVersion.version) || ['']
      const requestedVersion = searchVersion ?
        getVersionRange(flatVersions, searchVersion) :
        getLatest(flatVersions)
      return {name, versions: flatVersions, requestedVersion, tags}
    })
    res.send(parsedResults)
  } else {
    res.send({})
  }
}

router.post('/api/search', findBlob)

export const SearchRouter = router
