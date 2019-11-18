# Manifest

## Overview

The manfests here are based heavily off of `npm`'s packages. I'm orignally a js dev, so if any of this looks like some excessive love for that style of code, empathize with me please.

A manifest for a deployed package looks like this:

```yml
about:
  name: 'My fancy config'
  author: 'hweeks <root@hweeks.com>'
  readme: './README.md'
  version: '1.0.0'
remotes:
  scm: 'https://github.com/me/my-fancy-config'
  blobs: 'https://blobs.dcpm.dev'
config: './docker-compose.yml'
overrides:
  dev: './docker-compose.dev.yml'
  stable: './docker-compose.stable.yml'
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

### supports

Optional: This is a mapping of what versions you support of docker and docker-compose.

#### docker

The version of docker you support. Ranges are fine.

#### docker-compose

The version of docker-compose you support. Ranges are fine.
