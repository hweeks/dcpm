import {promisify} from 'util'
import fs, { statSync } from 'fs'
import path from 'path'
import os from 'os'
import unzipper from 'unzipper'
import yaml from 'js-yaml'
import archiver from 'archiver'
import glob from 'glob'
import { BlobManifest } from './manifest'

const asyncRead = promisify(fs.readFile)
const asyncGlob = promisify(glob)
export const tmpDir = os.tmpdir()

export interface EnvQuestion {
  var: string,
  msg: string,
  fallback?: string,
}

export interface ZipResolve {
  config: BlobManifest,
  location: string
}

const archiveSync = (pathIn: string, inputFiles: string[]) : Promise<ZipResolve> => {
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
      const allFiles = [...filesToCompress, ...inputFiles].filter(path => !path.endsWith('/'))
      allFiles.forEach((pathToFile) => {
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

const getGlobFilesArray = async (filePath: string, pathIn: string) => {
  const files = await asyncRead(filePath, 'utf8')
  const patterns = files.split('\n').filter(Boolean)
  const fileMap = patterns.map(async pathPattern => {
    const globPattern = await asyncGlob(`${pathIn}/${pathPattern}`)
    return globPattern
  })
  const filesArray = await Promise.all(fileMap)
  return filesArray.reduce((acc, val) => acc.concat(val), []);
}

const determineFilesToZip = async (pathIn: string) => {
  const ignorePath = path.resolve(pathIn, '.dcpmignore')
  let ignoreFile
  try {
    ignoreFile = await statSync(ignorePath)
  } catch (error) {
    ignoreFile = null
  }
  const keepPath = path.resolve(pathIn, '.dcpmkeep')
  let keepFile
  try {
    keepFile = await statSync(keepPath)
  } catch (error) {
    keepFile = null
  }
  const defaultFiles = await asyncGlob(`${pathIn}/**/*`)
  let ignoreFiles = ['']
  let keepFiles = ['']
  if (ignoreFile?.isFile()) {
    ignoreFiles = await getGlobFilesArray(ignorePath, pathIn)
  }
  if (keepFile?.isFile()) {
    keepFiles = await getGlobFilesArray(keepPath, pathIn)
  }
  const finalFiles = keepFile ? [...keepFiles] : [...defaultFiles]
  if (keepFile?.isFile()) {
    finalFiles.push(keepPath)
  }
  if (ignoreFile?.isFile()) {
    finalFiles.push(ignorePath)
  }
  return [...finalFiles ].filter(file => Boolean(file) && !ignoreFiles.includes(file))
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

export const compressFolder = async (pathIn: string) => {
  const checkForDirectory = await statSync(pathIn)
  if (!checkForDirectory.isDirectory()) {
    throw new Error('We are zipping up directories here, not files or nothing. Tough luck kiddo.')
  }
  const filesToZip = await determineFilesToZip(pathIn)
  return archiveSync(pathIn, filesToZip)
}

export const decompressToFolder = async (pathIn: string, destination: string) => {
  const checkForDirectory = await statSync(pathIn)
  if (!checkForDirectory.isFile()) {
    throw new Error('We are decompressing files here, not directories or nothing. Tough luck kiddo.')
  }
  return unarchiveSync(pathIn, destination)
}
