import { createReadStream, ReadStream} from "fs";
import chalk from "chalk";
import { Blob, User } from "@dcpm/api";
import { DcpmConfig, cwd } from "./config";
import { tmpDir, decompressToFolder, compressFolder } from "./archive";
const log = console.log

const warnLog = (message : string) => log(chalk.yellow(message))

const BuiltConfig = new DcpmConfig()

export const getCommand = async (packageName: string, packageVersion: string) => {
  const currentConfig = await BuiltConfig.getConfig()
  const blobUrl = currentConfig.blobs || 'https://blobs.dcpm.dev'
  const writeLocation = `${tmpDir}/blob-${packageName}-${packageVersion}.zip`
  try {
    await Blob.get({
      name: packageName,
      version: packageVersion,
      urlBase: blobUrl,
      location: writeLocation
    })
    await decompressToFolder(writeLocation, `${cwd}/${packageName}`)
    console.log(`Managed to grab ${packageName} at version ${packageVersion}, just barely.`)
  } catch (error) {
    const {message} = error
    warnLog(message || 'We blew up trying to get your package, but I have no idea why.')
  }
}

export const publishCommand = async () => {
  const currentConfig = await BuiltConfig.getConfig()
  const blobUrl = currentConfig.blobs || 'https://blobs.dcpm.dev'
  const zipInfo = await compressFolder(cwd)
  const manifestInfo = zipInfo.config
  const zipLocation = zipInfo.location
  try {
    await Blob.add({
      name: manifestInfo.about.name,
      author: manifestInfo.about.author,
      about: manifestInfo.about.about,
      version: manifestInfo.about.version,
      scm: manifestInfo.remotes.scm,
      baseUrl: blobUrl,
      blob: createReadStream(zipLocation) as unknown as ReadStream
    }, currentConfig.token || '')
    console.log(`Published ${manifestInfo.about.name} to ${blobUrl}, nice.`)
  } catch (error) {
    const {message} = error
    warnLog(message || 'We blew up trying to publish your package, but I have no idea why.')
  }
}

export const loginOrCreateCommand = async (username: string, password: string) => {
  const currentConfig = await BuiltConfig.getConfig()
  const blobUrl = currentConfig.blobs || 'https://blobs.dcpm.dev'
  try {
    const token = await User.login(username, password, blobUrl)
    await BuiltConfig.setConfig({token})
    console.log(`Looks like we _just_ managed to get ${username} all logged in.`)
  } catch (error) {
    const {message} = error
    warnLog(message || 'We blew up trying to log you in, but I have no idea why.')
  }
}

export const modifyPermsCommand = async (user: string, action: 'add' | 'remove', packageName: string) => {
  const currentConfig = await BuiltConfig.getConfig()
  const blobUrl = currentConfig.blobs || 'https://blobs.dcpm.dev'
  try {
    await Blob.manageUser({
      username: user,
      action,
      name: packageName,
      baseUrl: blobUrl
    }, currentConfig.token || '')
    console.log(`We've ${action}ed ${user} ${action === 'add' ? 'to' : 'from'} ${packageName}`)
  } catch (error) {
    const {message} = error
    warnLog(message || 'We blew up trying to modify package permissions, but I have no idea why.')
  }
}
