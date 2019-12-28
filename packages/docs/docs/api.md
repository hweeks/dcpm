# API

## Module

The API is exported from `@dcpm/cli` when imported as a regular module.

```js
import { User } from "@dcpm/api";

export const loginOrCreateCommand = async (username: string, password: string) => {
  const blobUrl = 'https://blobs.dcpm.dev'
  try {
    const token = await User.login(username, password, blobUrl)
    console.log(`Looks like we _just_ managed to get ${username} all logged in.`)
  } catch (error) {
    const {message} = error
    console.log(message || 'We blew up trying to log you in, but I have no idea why.')
  }
}
```

There is a declaration emitted on build with a full API for this module.

## User

### `/api/user/login`

#### type

POST

#### body

headers:
```js
{
  "token": "token string"
}
```

payload:

type: application/json

```js
{
  "username": "your username",
  "password": "your password"
}
```

#### response

```js
{
  "token": "token string"
}
```

### `/api/user/create`

#### type

POST

#### body

headers:
```js
{
  "token": "token string"
}
```

payload:

type: application/json

```js
{
  "username": "your username",
  "password": "your password"
}
```

#### response

```js
{
  "token": "token string"
}
```

## Blob

### `/api/blob/add`

#### type

POST

#### body

```js
{
  "token": "token string"
}
```

payload:

type: form-data

```js
{
  "name": "desired name",
  "author": "desired author",
  "about": "desired about",
  "version": "desired version",
  "scm": "desired scm",
  "blob": "file to upload as a zip",
  "tags": "comma seperated list of tags related to your manifest",
}
```

#### response

```
ok
```

### `/api/blob/user`

#### type

POST

#### body

headers:
```js
{
  "token": "token string"
}
```

payload:

type: application/json

```js
{
  "username": "username",
  "action": "add || remove",
  "name": "name of package to update"
}
```

#### response

```
ok
```

### `/api/blob/get/:blob/:version`

#### type

GET

#### response

The file you requested.

## Search

### `/api/search`

#### type

POST

#### body

payload:

type: application/json

```js
{
  "searchTerm": "a package name or a tag like 'mongo'",
  "searchVersion": "you can specify a version if wanted"
}
```

#### response

```js
[
    {
        "name": "package-name",
        "versions": [
            "3.0.1",
            "3.0.2"
        ],
        "requestedVersion": "3.0.2",
        "tags": [
            "test",
            "test-one",
            "test-two"
        ]
    }
]
```
