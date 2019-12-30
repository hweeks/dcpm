import { createReadStream, readFile, statSync} from "fs";
import path from 'path'
import chalk from "chalk";
import { Blob, User } from "@dcpm/api";
import { DcpmConfig, cwd } from "./config";
import { tmpDir, decompressToFolder, compressFolder } from "./archive";
import { promisify } from "util";

const asyncRead = promisify(readFile)
const log = console.log
const warn = (message : string) => log(chalk.yellow(message))
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
    log(`Managed to grab ${packageName} at version ${packageVersion}, just barely.`)
  } catch (error) {
    const {message} = error
    warn(message || 'We blew up trying to get your package, but I have no idea why.')
  }
}

const getReadmeContent = async (fileLocation : string) => {
  const filePath = path.resolve(cwd, fileLocation)
  const fileInfo = statSync(filePath)
  if (fileInfo.isFile()) {
    return asyncRead(filePath, 'utf8')
  } else {
    throw new Error(`There was no readable file at ${filePath}, double check your config.`)
  }
}

export const publishCommand = async () => {
  const currentConfig = await BuiltConfig.getConfig()
  const blobUrl = currentConfig.blobs || 'https://blobs.dcpm.dev'
  const zipInfo = await compressFolder(cwd)
  const manifestInfo = zipInfo.config
  const zipLocation = zipInfo.location
  try {
    const blobPayload = {
      name: manifestInfo.about.name,
      author: manifestInfo.about.author,
      about: await getReadmeContent(manifestInfo.about.about),
      version: manifestInfo.about.version,
      tags: manifestInfo.about.tags,
      scm: manifestInfo.remotes.scm,
      baseUrl: blobUrl,
      blob: createReadStream(zipLocation)
    }
    await Blob.add(blobPayload, currentConfig.token || '')
    log(`Published ${manifestInfo.about.name} to ${blobUrl}, nice.`)
  } catch (error) {
    const {message} = error
    warn(message || 'We blew up trying to publish your package, but I have no idea why.')
  }
}

export const loginOrCreateCommand = async (username: string, password: string) => {
  const currentConfig = await BuiltConfig.getConfig()
  const blobUrl = currentConfig.blobs || 'https://blobs.dcpm.dev'
  try {
    const token = await User.login(username, password, blobUrl)
    await BuiltConfig.setConfig({token})
    log(`Looks like we _just_ managed to get ${username} all logged in.`)
  } catch (error) {
    const {message} = error
    if (message.includes(username)) {
      const newToken = await User.create(username, password, blobUrl)
      await BuiltConfig.setConfig({token: newToken})
      log(`Looks like we _just_ managed to get ${username} created.`)
    } else {
      warn(message || 'We blew up trying to log you in, but I have no idea why.')
    }
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
    log(`We've ${action}ed ${user} ${action === 'add' ? 'to' : 'from'} ${packageName}`)
  } catch (error) {
    const {message} = error
    warn(message || 'We blew up trying to modify package permissions, but I have no idea why.')
  }
}
