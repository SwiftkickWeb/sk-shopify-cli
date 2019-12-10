sk-shopify-cli
==============

CLI for SK Shopify projects.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/sk-shopify-cli.svg)](https://npmjs.org/package/sk-shopify-cli)
[![Downloads/week](https://img.shields.io/npm/dw/sk-shopify-cli.svg)](https://npmjs.org/package/sk-shopify-cli)
[![License](https://img.shields.io/npm/l/sk-shopify-cli.svg)](https://github.com///blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
* [Roadmap](#roadmap)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g sk-shopify-cli
$ sk-shopify COMMAND
running command...
$ sk-shopify (-v|--version|version)
sk-shopify-cli/0.0.2 darwin-x64 node-v12.10.0
$ sk-shopify --help [COMMAND]
USAGE
  $ sk-shopify COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sk-shopify help [COMMAND]`](#sk-shopify-help-command)
* [`sk-shopify theme:sync-envs`](#sk-shopify-themesync-envs)

## `sk-shopify help [COMMAND]`

display help for sk-shopify

```
USAGE
  $ sk-shopify help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `sk-shopify theme:sync-envs`

theme:sync-envs: getting/updating current project/repo variables

```
USAGE
  $ sk-shopify theme:sync-envs

OPTIONS
  -l, --list-only  just output current theme list from Shopify Theme API

DESCRIPTION
  Grabs the current variables file, and makes it sync up with what the Shopify API currently has for the themes.

  Only doing PROD and STAGING syncing, currently; future plans to include .sk-shopify-rc.json/.yml file, which will 
  manually control which is synced with what.
```

_See code: [src/commands/theme/sync-envs.js](https://github.com/SwiftkickWeb/sk-shopify-cli/blob/v0.0.2/src/commands/theme/sync-envs.js)_
<!-- commandsstop -->

# Roadmap
* Building in Homebrew support.
* Build support for `.sk-shopify-rc` file, for user configurable options, re-naming of the different environments and what to sync
* Init/Set-up commands, building out defaults (incl. for the above mentioned `.sk-shopify-rc` file)
