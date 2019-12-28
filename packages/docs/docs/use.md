# Usage

The main tool `dcpm` has a few things it can do.

## get

Use: `dcpm get [package]@[version]`

This will fetch whatever config you want. If no version, latest is grabbed. Version ranges work too.

## publish

Use: `dcpm publish`

This will push a new version of your package to [dcpm blobs](https://blobs.dcpm.dev).

## auth

Use: `dcpm auth [user] [password]`

This will either log you in or create a user. Token will be written to `~/.dcpm`.

## add-user

Use: `dcpm add-user [user] [name]`

This will allow you to add another user to publish your package.

## remove-user

Use: `dcpm remove-user [user] [name]`

This will allow you to remove a user from the currently authorized ones.

