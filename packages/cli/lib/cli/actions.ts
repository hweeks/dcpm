import { createReadStream } from "fs";
import * as blobReqs from "../api/blob";
import { DcpmConfig, cwd } from "./config";
import { tmpDir, decompressToFolder, compressFolder } from "./archive";

const BuiltConfig = new DcpmConfig()

export const getCommand = async (packageName: string, packageVersion: string) => {
  const currentConfig = await BuiltConfig.getConfig()
  const blobUrl = currentConfig.blobs || 'https://blobs.dcpm.dev'
  const writeLocation = `${tmpDir}/blob-${packageName}-${packageVersion}.zip`
  await blobReqs.get({
    name: packageName,
    version: packageVersion,
    urlBase: blobUrl,
    location: writeLocation
  })
  await decompressToFolder(writeLocation, `${cwd}/${packageName}`)
}

export const publishCommand = async () => {
  const currentConfig = await BuiltConfig.getConfig()
  const blobUrl = currentConfig.blobs || 'https://blobs.dcpm.dev'
  const zipInfo = await compressFolder(cwd)
  const manifestInfo = zipInfo.config
  const zipLocation = zipInfo.location
  await blobReqs.add({
    name: manifestInfo.about.name,
    author: manifestInfo.about.author,
    about: manifestInfo.about.about,
    version: manifestInfo.about.version,
    scm: manifestInfo.remotes.scm,
    baseUrl: blobUrl,
    blob: createReadStream(zipLocation) as unknown as ReadableStream
  }, currentConfig.token || '')
}
