import { createReadStream, ReadStream} from "fs";
import * as blobReqs from "../api/blob";
import * as userReqs from "../api/user";
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
    blob: createReadStream(zipLocation) as unknown as ReadStream
  }, currentConfig.token || '')
}

export const loginOrCreateCommand = async (username: string, password: string) => {
  const currentConfig = await BuiltConfig.getConfig()
  const blobUrl = currentConfig.blobs || 'https://blobs.dcpm.dev'
  const token = await userReqs.login(username, password, blobUrl)
  await BuiltConfig.setConfig({token})
}

export const modifyPermsCommand = async (user: string, action: 'add' | 'remove', packageName: string) => {
  const currentConfig = await BuiltConfig.getConfig()
  const blobUrl = currentConfig.blobs || 'https://blobs.dcpm.dev'
  await blobReqs.manageUser({
    username: user,
    action,
    name: packageName,
    baseUrl: blobUrl
  }, currentConfig.token || '')
}
