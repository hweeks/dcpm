import { createReadStream, readFile, statSync, writeFile} from "fs";
import path from 'path'
import chalk from "chalk";
import { Blob, User } from "./api";
import { DcpmConfig, cwd } from "./config";
import { tmpDir, decompressToFolder, compressFolder, getManifest, EnvQuestion } from "./file-actions";
import { promisify } from "util";
import { runInContext } from "./cmd";
import inquirer, { InputQuestion } from "inquirer";

const asyncRead = promisify(readFile)
const asyncWrite = promisify(writeFile)
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

export const executeCommand = async (script: string) => {
  try {
    const manifestInfo = await getManifest(cwd)
    if (manifestInfo.scripts) {
      const possibleScript = manifestInfo.scripts[script]
      if (!possibleScript) {
        throw new Error(`I really couldn't find any scripts by the name ${script} in ${cwd}. Maybe you fat fingered it?`)
      }
      await runInContext(possibleScript)
      log(`We have now run ${script}, I hope you got what you wanted from it.`)
    }
  } catch (error) {
    const {message} = error
    warn(message || 'We blew up trying to run a script, but I have no idea why.')
  }
}

export const runSetup = async () => {
  try {
    const manifestInfo = await getManifest(cwd)
    if (manifestInfo.env?.length) {
      const questions = manifestInfo.env.map((questionConfig : EnvQuestion) => {
        const inputConfig : InputQuestion = {
          type: 'input',
          name: questionConfig.var,
          message: questionConfig.msg,
        }
        if (questionConfig.fallback) {
          inputConfig.default = questionConfig.fallback
        }
        return inputConfig
      })
      inquirer.prompt(questions).then(async (answers) => {
        let envFile = ''
        for (const [key,value] of Object.entries(answers)) {
          envFile += `${key}=${value}\n`
        }
        await asyncWrite(`${cwd}/.env`, envFile)
        log(`We've written your env file to ${cwd}/.env. You're now all setup.`)
      }).catch(err => {
        throw new Error(`We couldn't setup this project because of ${err.message}`)
      })
    } else {
      log('There is not any setup script in this package. Sorry.')
    }
  } catch (error) {
    const {message} = error
    warn(message || 'We blew up trying to run setup, but I have no idea why.')
  }
}

runSetup()
