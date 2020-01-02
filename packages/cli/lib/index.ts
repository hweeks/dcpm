#!/usr/bin/env node

import yargs from "yargs";
import semver from "semver"
import inquirer from "inquirer";
import {getCommand, publishCommand, loginOrCreateCommand, modifyPermsCommand, executeCommand} from './actions'

yargs
  .command(
    'get <name>',
    'fetch a version of a dcpm bundle',
    {},
    function ({name}) {
      let pkgName = name as string
      const ver = pkgName.split('@').pop()
      const verCheck = semver.valid(ver) ? ver : 'latest'
      if (verCheck !== 'latest') {
        pkgName = pkgName.replace(`@${ver}`, '')
      }
      getCommand(pkgName, verCheck as string)
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
    'login or create a user',
    {},
    function () {
      inquirer.prompt([
        {
          type: 'input',
          name: 'username',
          message: "username:"
        },
        {
          type: 'password',
          name: 'password',
          message: "password:"
        },
      ]).then(answers => {
        const {username, password} = answers
        loginOrCreateCommand(username as string, password as string)
      })
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
  .command(
    'run <script>',
    'run a manifest script',
    {},
    function ({script}) {
      executeCommand(script as string)
    }
  )
  .help()
  .argv
