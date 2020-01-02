# Manifest

## Overview

The manifests here are based heavily off of `npm`'s packages. I'm originally a js dev, so if any of this looks like some excessive love for that style of code, empathize with me please.

A manifest for a deployed package looks like this:

```yml
about:
  name: 'My fancy config'
  author: 'hweeks <root@hweeks.com>'
  about: './README.md'
  version: '1.0.0'
  tags:
    - 'something'
    - 'something else'
remotes:
  scm: 'https://github.com/me/my-fancy-config'
  blobs: 'https://blobs.dcpm.dev'
config: './docker-compose.yml'
overrides:
  dev: './docker-compose.dev.yml'
  stable: './docker-compose.stable.yml'
scripts:
  configure: './some-bash-file.sh'
supports:
  docker: '19.03.1'
  docker-compose: '1.24.1'
```
### about

The about object defines your project in human readable terms. If you have a `readme.md` in the root we will display it as the about page of your config through [blob search](https://search.dcpm.dev)

#### name

The name of your config. It must be unique to be published.

#### author

The maintainer of your config.

#### version

A semver compliant version of your package.

#### tags

These are hints for people looking up packages about what to expect from yours or what it does. It also makes the in-built search suck less.

#### about

This is the markdown flavored info about your package. At some point there will be a front end to view available packages.

### remotes

This is a listing of the places that your code lives.

#### scm

This is the url to whatever place you store your source code.

#### blobs

Optional: This is the place to upload your config to when publishing.

### config

This is just the location of your compose file.

### overrides

Optional: This is a listing of all your different environment overrides.

### scripts

Optional: This is a listing of helper scripts you've built. It runs in the CWD of the package executing it. Currently logs output, no nice error catching or anything of merit.

### supports

Optional: This is a mapping of what versions you support of docker and docker-compose.

#### docker

The version of docker you support. Ranges are fine.

#### docker-compose

The version of docker-compose you support. Ranges are fine.
