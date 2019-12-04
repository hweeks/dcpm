#!/usr/bin/env node

import yargs from "yargs";
import {getCommand} from './actions'

yargs
  .command(
    'get [package] <version>',
    'fetch a version of a compose file',
    {},
    function (args) {
      getCommand(args.package as string, args.version as string)
    }
  )
  .command(
    'publish [package]',
    'publish a version of a compose file',
    {},
    function (argv) {
      debugger
    }
  )
  .command(
    'auth',
    'authenticate yourself to enable publishing',
    {},
    function (argv) {
      debugger
    }
  )
  .command(
    'add-user [username]',
    'allow another user to publish your package',
    {},
    function (argv) {
      debugger
    }
  )
  .command(
    'remove-user [username]',
    'revoke user publish permission',
    {},
    function (argv) {
      debugger
    }
  )
  .help()
  .argv
