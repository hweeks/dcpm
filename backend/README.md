# `@dcpm/backend`

The back-end that powers [dcpm blobs](https://blobs.dcpm.dev).

## Usage

This is meant to be run using our docker container, or via `dcpm` itself.

## Overview

The backend is going to be very basic. It will be two things:

  * express
  * mongodb

## Local Development

For local dev we'd recommend:

  * REST client
  * chrome debug tools
  * docker and docker-compose

Run: `yarn dev` to get a locally running stack on `localhost:3000`

Hit the endpoint with your REST client and attach chrome's debugger tools from `chrome://inspect` or your ide if you prefer.

## Stack

This is built on:

  * typescript
  * mongoose
  * express

## API

> todo: document

## TODO

1. fix tests
1. fix build
1. fix types
1. move to mongodb-memory-server for local dev
1. move to esbuild register
1. clean nodemon usage
1. create core route/payload enums
1. fix things i learned lol
