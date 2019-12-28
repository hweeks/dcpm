# Introduction

## Overview

The dcpm has a few fundamental chunks:

  1. the `dcpm` cli provided by the `@dcpm/cli` package
  1. the `dcpm` store provided by the `@dcpm/backend` package

The dcpm backend will of course be the first package available from dcpm. Checkout the history of this monorepo to watch how I steer and guide this project via day one dog fooding.

### Manifest

This is the main way to define and share your configs. It contains information about what you're pushing. It also can define versions of `docker` and `docker-compose` you are supporting. To learn more:

See [Manifest](/manifest/)

### Use

The main way to interact with our configs. The cli tool allows pulling and pushing of your configs. To learn more:

See [Use](/use/)

### Backend

What is does our API need?

See [API](/api/)

## What is this?

Conceptually this is a simple way to share simple configs. This is far less feature rich than kubernetes, but it's not trying to solve that problem. This tool I'm envisioning as an easy way to share some simple configs with folks.

## Why?

This should serve as an easy way to share configs you've built. Do you want to host your own custom stack but think other would want in? Do you want to containerize some self hosted app and be able to share just the config for it? Are you tired of searching for docker-compose files built by someone that has all the services you want pre-baked in?

I'm trying to solve the simple home enthusiast use case here. This is not and will not ever be something built for production use. This should be for easy local dev and simple home services. If you want productions stacks please check out helm and kubernetes.
