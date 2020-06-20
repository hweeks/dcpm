#!/usr/bin/env node

import yargs, {Argv} from "yargs";
import semver from "semver"
import inquirer from "inquirer";
import {getCommand, publishCommand, loginOrCreateCommand, modifyPermsCommand, executeCommand, runSearch, runSetup} from './actions'
import { execSync } from "child_process";

interface LoginQuestions {
  username: string,
  password: string
}

yargs
  .command(
    'get <name>',
    'fetch a version of a dcpm bundle',
    (getArgs: Argv) => getArgs.option('name', {
      description: 'The name of the package you want to fetch. Add a version with @ to fetch a particular version.',
      default: ''
    }),
    function ({name}) {
      let pkgName = name
      const ver = pkgName.split('@').pop()
      const verCheck = ver && semver.valid(ver) ? ver : 'latest'
      if (verCheck !== 'latest') {
        pkgName = pkgName.replace(`@${ver}`, '')
      }
      getCommand(pkgName, verCheck)
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
      inquirer.prompt<LoginQuestions>([
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
        loginOrCreateCommand(username, password)
      })
    }
  )
  .command(
    'add-user <user> [name]',
    'allow another user to publish your package',
    (addUserArgs: Argv) => addUserArgs.option('user', {
      description: "The user you are trying to add permissions for.",
      default: ''
    }).option('name', {
      description: "The package you'd like to add this user to.",
      default: ''
    }),
    function ({user, name}) {
      modifyPermsCommand(user, 'add', name)
    }
  )
  .command(
    'remove-user <user> [name]',
    'revoke user publish permission',
    (addUserArgs: Argv) => addUserArgs.option('user', {
      description: "The user you are trying to remove permissions for.",
      default: ''
    }).option('name', {
      description: "The package you'd like to remove this user from.",
      default: ''
    }),
    function ({user, name}) {
      modifyPermsCommand(user, 'remove', name)
    }
  )
  .command(
    'run <script>',
    'run a manifest script',
    (runArgs: Argv) => runArgs.option('script', {
      description: 'The name of the script in your manifest you want to run.',
      default: ''
    }),
    function ({script}) {
      executeCommand(script)
    }
  )
  .command(
    'search [query]',
    'search packages in the registry',
    {},
    function ({query}) {
      runSearch(query)
    }
  )
  .command(
    'setup',
    'run the env setup',
    {},
    function () {
      runSetup()
    }
  )
  .command(
    '*',
    'Proxy a request through to docker-compose',
    {},
    () => {
      const [,, ...passThrough] = process.argv
      const builtCommand = passThrough.join(' ')
      const baseCommand = passThrough[0]
      const composeChoices = execSync('docker-compose -h', {encoding: 'utf8'})
      const dockerCompHasCommand = composeChoices.includes(baseCommand)
      if (!dockerCompHasCommand) {
        console.warn(`${baseCommand} was not found in you docker compose command choices. I will run the command but expect an error!`)
      }
      try {
        execSync(`docker-compose ${builtCommand}`, {
          cwd: process.cwd(),
          env: process.env,
          stdio: 'inherit'
        })
      } catch (error) {
        console.error(error.message)
      }
    }
  )
  .demandCommand()
  .help()
  .argv
