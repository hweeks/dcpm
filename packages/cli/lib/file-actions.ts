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
    tags: string[];
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
  scripts?: {
    [key: string]: string
  }
}

export interface ZipResolve {
  config: BlobManifest,
  location: string
}

const archiveSync = (pathIn: string) : Promise<ZipResolve> => {
  return new Promise((resolve, reject) => {
    const zipLocation = `${tmpDir}/blob-${Date.now()}.zip`
    const outputFile = fs.createWriteStream(zipLocation)
    const zipFile = archiver('zip', {
      zlib: {level: 9}
    });
    asyncRead(`${pathIn}/manifest.yml`, {encoding: 'utf8'}).then((manifestFile) => {
      const dcpmConfig : BlobManifest = yaml.safeLoad(manifestFile)
      const filesToCompress : string[]= [
        './manifest.yml',
        dcpmConfig.about.about as string,
        dcpmConfig.config,
        ...Object.entries(dcpmConfig.overrides || {}).map(([_, value]) => value as string)
      ].filter(Boolean)
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
        resolve({
          config: dcpmConfig,
          location: zipLocation
        })
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


export const getManifest = async (pathIn : string) => {
  const manifestPath = `${pathIn}/manifest.yml`
  const checkForFile = await statSync(manifestPath)
  if (checkForFile.isFile()) {
    const manifestFile = await asyncRead(manifestPath, 'utf8')
    const dcpmConfig : BlobManifest = yaml.safeLoad(manifestFile)
    return dcpmConfig
  } else {
    throw new Error(`There's no manifest at ${manifestPath}, what's up with that?`)
  }
}
