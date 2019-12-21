import {promisify} from 'util'
import fs, { ReadStream } from 'fs'
import stream from 'stream'
import fetch from 'node-fetch'
import FormData from 'form-data'

const pipeline = promisify(stream.pipeline)

export interface BlobGetArgs {
  name: string
  version: string
  location: string,
  urlBase: string
}

export const get = async ({name, version, location, urlBase}: BlobGetArgs) => {
  const request = await fetch(`${urlBase}/api/blob/get/${name}/${version}.zip`)
  await pipeline(request.body, fs.createWriteStream(location))
}

export interface BlobAddArgs {
  name: string
  author: string
  about: string
  version: string
  scm: string
  blob: ReadStream
  baseUrl: string
}

export const add = async ({name, author, about, version, scm, blob, baseUrl} : BlobAddArgs, token : string) => {
  const formData : FormData = new FormData()
  const formParts :[string | ReadStream, string][] = [
    [name, 'name'],
    [author, 'author'],
    [about, 'about'],
    [version, 'version'],
    [scm, 'scm'],
    [blob, 'blob']
  ]
  formParts.forEach(([data, dataName]) => {
    formData.append(dataName, data)
  });
  const request = await fetch(`${baseUrl}/api/blob/add`, {
    method: "POST",
    headers: {
      token,
      ...formData.getHeaders()
    },
    body: formData
  })
  if (!request.ok) {
    const body = await request.json()
    throw new Error(body.message || request.statusText)
  }
  return request.ok
}

export interface AddUserArgs {
  username: string
  action: 'add' | 'remove'
  name: string,
  baseUrl: string
}

export const manageUser = async ({username, action, name, baseUrl} : AddUserArgs, token: string) => {
  const request = await fetch(`${baseUrl}/api/blob/user`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      token
    },
    body: JSON.stringify({username, action, name})
  })
  return request.json()
}

export type TBlobApiMethods = 'manageUser' | 'add' | 'get'

export type PossibleBlobArgs = AddUserArgs | BlobAddArgs | BlobGetArgs
