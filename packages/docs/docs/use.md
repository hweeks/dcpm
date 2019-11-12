# Usage

The main tool `dcpm` has a few things it can do.

## get

Use: `dcpm get [package]`

This will fetch whatever config you want. Versions can be appended to the end of the package you'd like. When fetched a `dcpm-lock.yml` will be written to the same directory you fetch from.

## publish

Use: `dcpm publish [version]`

This will push a new version of your package to [dcpm blobs](https://blobs.dcpm.dev).

## auth

Use: `dcpm auth`

This will prompt you to create a user. Once logged in only that users token can publish a package. Token will be written to `~/.dcpmrc`.

## add-user

Use: `dcpm add-user [username]`

This will allow you to add another user to publish your package. This must be run from the root of the project you are modifying.

## remove-user

Use: `dcpm remove-user [username]`

This will allow you to remove a user from the currently authorized ones. This must be run from the root of the project you are modifying.

