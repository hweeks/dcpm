import {promisify} from 'util'
import fs from 'fs'
import path from 'path'
import os from 'os'

// This env override is for testing, use this to point at your local manifest to vet a feature quickly
export const cwd = process.env.CWD_OVERRIDE ? process.env.CWD_OVERRIDE : process.cwd()
export const homedir = os.homedir()

export const syncRead = promisify(fs.readFile)
export const syncWrite = promisify(fs.writeFile)

export interface DcpmConfigFile {
  blobs?: string
  token?: string
}

export class DcpmConfig {
  path: string
  config?: DcpmConfigFile
  constructor(pathOverride?: string) {
    this.path = path.resolve(homedir, '.dcpm')
    if (pathOverride) {
      this.path = path.resolve(cwd, pathOverride)
    }
  }
  async getConfig(shouldRefresh? : boolean) {
    if (this.config && !shouldRefresh) {
      return this.config
    }
    let configFile
    try {
      const configString = await syncRead(this.path, 'utf8')
      configFile = JSON.parse(configString) as unknown as DcpmConfigFile
    } catch (err) {
      console.log(`We didn't find a file at ${this.path}, we're gonna make one. Deets: ${err.message}`)
      configFile = {}
      await syncWrite(this.path, JSON.stringify(configFile, null, 2))
    }
    this.config = configFile
    return configFile
  }
  async setConfig(configChanges : DcpmConfigFile) {
    if (!this.config) {
      await this.getConfig()
    }
    const rebuiltConfig = {...this.config, ...configChanges}
    this.config = rebuiltConfig
    await syncWrite(this.path, JSON.stringify(rebuiltConfig, null, 2))
  }
  changePath(pathInput:string) {
    this.path = pathInput
    return this.path
  }
}
