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

  * postman/paw/insomnia
  * chrome debug tools

Run: `yarn watch` to get a locally running stack on `localhost:4000`

Hit the endpoint with your REST client and attach chromes debugger tools from `chrome://inspect` or your ide if you prefer.

## Stack

This is built on:

  * typescript
  * mongoose
  * express
