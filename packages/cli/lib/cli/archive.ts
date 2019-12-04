import {promisify} from 'util'
import fs, { statSync } from 'fs'
import path from 'path'
import os from 'os'
import unzipper from 'unzipper'
import yaml from 'js-yaml'
import archiver from 'archiver'

const asyncRead = promisify(fs.readFile)
export const tmpDir = os.tmpdir()

export interface BlobManifest {
  about: {
    name: string;
    author: string;
    about: string;
    version: string;
  }
  remotes: {
    scm: string;
    blobs: string;
  }
  config: string;
  overrides: {
    [key: string]: string
  }
  supports: {
    docker: string
    'docker-compose': string
  }
}

const archiveSync = (pathIn: string) => {
  return new Promise((resolve, reject) => {
    const outputFile = fs.createWriteStream(`${tmpDir}/blob.zip`)
    const zipFile = archiver('zip', {
      zlib: {level: 9}
    });
    asyncRead(`${pathIn}/manifest.yml`, {encoding: 'utf8'}).then((manifestFile) => {
      const dcpmConfig : BlobManifest = yaml.safeLoad(manifestFile)
      const filesToCompress : string[]= [
        './manifest.yml',
        dcpmConfig.about.about as string,
        dcpmConfig.config,
        ...Object.entries(dcpmConfig.overrides).map(([_, value]) => value as string)
      ]
      filesToCompress.forEach((pathToFile) => {
        const composedPath = path.resolve(pathIn, pathToFile)
        const fileToZip = fs.createReadStream(composedPath)
        zipFile.append(fileToZip, {
          name: pathToFile.replace('./', '')
        })
      })
      zipFile.pipe(outputFile)
      zipFile.on('error', (err) => {
        reject(err)
      })
      outputFile.on('finish', () => {
        resolve(`${tmpDir}/blob.zip`)
      })
      zipFile.finalize()
    })
  })
}

export const compressFolder = async (pathIn: string) => {
  const checkForDirectory = await statSync(pathIn)
  if (!checkForDirectory.isDirectory()) {
    throw new Error('We are zipping up directories here, not files or nothing. Tough luck kiddo.')
  }
  return archiveSync(pathIn)
}

const unarchiveSync = (pathIn: string, destination: string) => {
  return new Promise((resolve, reject) => {
    const zipFile = fs.createReadStream(pathIn)
    zipFile.pipe(unzipper.Extract({ path: destination })).on('finish', () => {
      resolve()
    }).on('error', (err) => {
      reject(err)
    })
  })
}

export const decompressToFolder = async (pathIn: string, destination: string) => {
  const checkForDirectory = await statSync(pathIn)
  if (!checkForDirectory.isFile()) {
    throw new Error('We are decompressing files here, not directories or nothing. Tough luck kiddo.')
  }
  return unarchiveSync(pathIn, destination)
}
