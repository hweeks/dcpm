# DCPM

## What Is This?

This is a tool for sharing configuration and setup for docker-compose. It comes in three pieces:

  1. the backend which hosts our files
  1. the frontend for searching and view packages
  1. the cli because i like cli stuff

## What Can It Do?

At a high level it allows for the sharing and consumption of complex docker-compose configs with a nice interview process for setting something up correctly. This is a move away from the current style of sharing which involves copy down a docker compose file from somewhere and trying to follow along in a readme.

For a deeper dive: [DCPM Docs Site](https://docs.dcpm.dev/)

To search what's available: [DCPM Main Site](https://app.dcpm.dev/)

CLI Setup: [dcpm cli on npm](https://www.npmjs.com/package/@dcpm/cli)

## I Wanna Make Changes

That's cool, and I'm really glad you feel that way. Let's talk about how it works locally and how to build this stuff out.

### Tools Needed

  * docker
  * docker-compose
  * yarn

### Local Dev Flow

Every package has the same dev script in it, `yarn dev`. When run in any of our packages (backend, frontend, cli), it will start up nodemon and monitor for changes, which will auto trigger a reload. For the CLI or Frontend to work you should start the back end first.

To start any dev process, simply:

    yarn

From the root, and everything else should be good to go!

#### Example: Editing the Frontend

You would:

  1. `cd backend`
  1. `yarn dev`
  1. `cd ../frontend`
  1. `yarn dev`

Now you can build out frontend features against your backend.

## Deployments (applications)

This is currently to do. I deploy to k8s on digital ocean through a helper repo on my local, but I haven't set it up for CI yet. It's my next to do. We are publishing the docker containers though.

## Deployments CLI

> you must use the angular commit conventions for semantic release if you want a publish to work :P

When a merge to master happens and all tests/lint passes we autodeploy to npm. Check for release tags in the repo,

## CI Checks

The CI will:

  * install all packages
  * check your commit aligns with expectations
  * lint and test them
  * deploy new docker builds for all packages

Please make sure your commit passes :)
