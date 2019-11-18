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

## urls

### /api/user/create

TYPE: post

PAYLOAD: {
  username: string,
  password: string,
}

RETURN: {
  token: string,
}

### /api/user/login

TYPE: post

PAYLOAD: {
  username: string,
  password: string,
}

RETURN: {
  token: string,
}

### /api/blob/add

TYPE: post
