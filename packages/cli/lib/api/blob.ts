import {promisify} from 'util'
import fs from 'fs'
import stream from 'stream'
import fetch from 'node-fetch'
import FormData from 'form-data'

const pipeline = promisify(stream.pipeline)

export interface BlobGetArgs {
  name: string
  version: string
  location: string
}

export const get = async ({name, version, location}: BlobGetArgs) => {
  const request = await fetch(`http://localhost:3000/api/blob/get/${name}/${version}.zip`)
  await pipeline(request.body, fs.createWriteStream(location))
}

export interface BlobAddArgs {
  name: string
  author: string
  about: string
  version: string
  scm: string
  blob: ReadableStream
}

export const add = async ({name, author, about, version, scm, blob} : BlobAddArgs, token : string) => {
  const formData : FormData = new FormData()
  const formParts :[string | ReadableStream, string][] = [
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
  const request = await fetch('http://localhost:3000/api/blob/add', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      token
    },
    body: formData
  })
  return request.json()
}

export interface AddUserArgs {
  username: string
  action: 'add' | 'remove'
  name: string
}

export const manageUser = async ({username, action, name} : AddUserArgs, token: string) => {
  const request = await fetch('http://localhost:3000/api/blob/user', {
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
