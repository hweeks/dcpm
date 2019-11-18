# API

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
