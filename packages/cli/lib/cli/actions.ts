import path from 'path'
import * as blobReqs from "../api/blob";
import { DcpmConfig, cwd } from "./config";
import { tmpDir, decompressToFolder } from "./archive";

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
  await decompressToFolder(writeLocation, cwd)
}

const testConcept = async () => {
  await getCommand('test-package-2', '1.0.8')
}

testConcept()
