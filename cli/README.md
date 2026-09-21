# `@dcpm/cli`

## overview

This package is used to fetch, publish, and manage your packages on DCPM. The tool is expected to be installed globally. To install this via npm:

    npm i -g @dcpm/cli

or yarn if you're close enough to facebook that they dictate your development practices:

    yarn global add @dcpm/cli

At this point you can fetch packages from dcpm. To see what's available go to the [DCPM App](https://app.dcpm.dev). Here you can search for packages and read our [docs](https://docs.dcpm.dev).

## use

### auth

To login just run:

    dcpm auth

This will prompt for a username and password and log you in, or create an account if it's a new username, and save your token to `~/.dcpm`.

### run

You can run any of the scripts in a manifest via:

    dcpm run <script-name>

This will run the script and output the result to your command line. This is an early feature, expect changes.

### setup

To create a `.env` file with the correct values run:

    dcpm setup

This will ask you a series of questions and then write a `.env` file. If the manifest doesn't have any setup it will let you know.

### get

The most simple use case is fetching a simple package:

    dcpm get home-media

This will find the latest version of `home-media` and create a folder called `home-media` in your current working directory that contains all of its files.

You can also specify a version:

    dcpm get home-media@1.0.1

This does the same thing but for a deterministic package version.

## publish

To publish a package, navigate to the folder that contains a `manifest.yml` as defined by our [docs](https://docs.dcpm.dev) and run:

    dcpm publish

This will read the manifest, zip the correct files, and upload them to our backend. You need to be logged in to do this.

## user management

This command allows you to authorize additional users to publish new versions of your package:

    dcpm add-user some-person your-package

Removal can be accomplished via:

    dcpm remove-user some-person your-package

## warning

This project is in a _very_ early alpha state. This stuff is liable to change at random. The docs site _should_ be up to date whenever a batch of changes comes out.

# TODO

1. consume exported types from other packages
1. update as learned
