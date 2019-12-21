#!/usr/bin/env node

import yargs from "yargs";
import {getCommand, publishCommand, loginOrCreateCommand, modifyPermsCommand} from './actions'

yargs
  .command(
    'get <name> [ver]',
    'fetch a version of a dcpm bundle',
    {},
    function ({name, ver}) {
      getCommand(name as string, ver as string)
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
    'auth <user> [password]',
    'authenticate yourself to enable publishing, will also create an account if a new username',
    {},
    function ({user, password}) {
      loginOrCreateCommand(user as string, password as string)
    }
  )
  .command(
    'add-user <user> [name]',
    'allow another user to publish your package',
    {},
    function ({user, name}) {
      modifyPermsCommand(user as string, 'add', name as string)
    }
  )
  .command(
    'remove-user <user> [name]',
    'revoke user publish permission',
    {},
    function ({user, name}) {
      modifyPermsCommand(user as string, 'remove', name as string)
    }
  )
  .help()
  .argv
