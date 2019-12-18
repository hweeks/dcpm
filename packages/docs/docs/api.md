# API

## Module

The API is exported from `@dcpm/cli` when imported as a regular module.

```js
import {BaseApi} from '@dcpm/cli';

const dcpmApi = new BaseApi('token-string')

const loginUser = async (username, password) => {
  const userToken = await dcpmApi.user('login', {username, password, baseUrl: 'https://blobs.dcpm.dev'})
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
