#!/usr/bin/env node

import yargs from "yargs";
import {getCommand, publishCommand} from './actions'

yargs
  .command(
    'get [name] [version]',
    'fetch a version of a dcpm bundle',
    {},
    function ({name, version}) {
      getCommand(name as string, version as string)
    }
  )
  .command(
    'publish',
    'publish a version of a compose file',
    {},
    function () {
      publishCommand()
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
