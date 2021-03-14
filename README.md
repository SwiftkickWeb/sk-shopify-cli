skw-shopify-cli
==============

CLI for skw Shopify projects.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/skw-shopify-cli.svg)](https://npmjs.org/package/skw-shopify-cli)
[![Downloads/week](https://img.shields.io/npm/dw/skw-shopify-cli.svg)](https://npmjs.org/package/skw-shopify-cli)
[![License](https://img.shields.io/npm/l/skw-shopify-cli.svg)](https://github.com///blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
* [Roadmap](#roadmap)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g skw-shopify-cli
$ skw-shopify COMMAND
running command...
$ skw-shopify (-v|--version|version)
skw-shopify-cli/0.2.0 darwin-x64 node-v8.9.0
$ skw-shopify --help [COMMAND]
USAGE
  $ skw-shopify COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`skw-shopify help [COMMAND]`](#skw-shopify-help-command)
* [`skw-shopify theme:sync-envs`](#skw-shopify-themesync-envs)

## `skw-shopify help [COMMAND]`

display help for skw-shopify

```
USAGE
  $ skw-shopify help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `skw-shopify theme:sync-envs`

theme:sync-envs: getting/updating current project/repo variables

```
USAGE
  $ skw-shopify theme:sync-envs

OPTIONS
  -l, --list-only          just output current theme list from Shopify Theme API
  -p, --personal=personal  search-string for personal theme

DESCRIPTION
  Grabs the current variables file, and makes it sync up with what the Shopify API currently has for the themes.

  Only doing PROD and STAGING syncing, currently; future plans to include .skw-shopify-rc.json/.yml file, which will 
  manually control which is synced with what.
```

_See code: [src/commands/theme/sync-envs.js](https://github.com/SwiftkickWeb/skw-shopify-cli/blob/v0.2.0/src/commands/theme/sync-envs.js)_
<!-- commandsstop -->

# Roadmap
* Building in Homebrew support.
* Build support for `.skw-shopify-rc` file, for user configurable options, re-naming of the different environments and what to sync
* Init/Set-up commands, building out defaults (incl. for the above mentioned `.skw-shopify-rc` file)
