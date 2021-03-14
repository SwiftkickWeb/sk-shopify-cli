/* eslint no-cond-assign: "warn" */
const {Command, flags} = require('@oclif/command')
const {promisify} = require('util')
const chalk = require('chalk')
const exec = promisify(require('child_process').exec)
const {env: {getVariables, readVariables, setVariables}} = require('../../utils')

class SyncEnvsCommand extends Command {
  async run() {
    const {flags} = this.parse(SyncEnvsCommand)
    // const name = flags.listOnly || 'world'

    let variablesText = readVariables()
    if (!variablesText) {
      this.log("Couldn't find/read variables file")
      return
    }

    this.log(chalk.bold.underline('variables (pre-write):'))
    this.log(`${variablesText.trim()}\n`)

    const variables = getVariables()
    if (!variables) {
      this.log("Couldn't parse variables file")
      return
    }

    const password = Object.entries(variables).find(([key]) => key.indexOf('PASSWD') !== -1)[1]
    const storeURL = Object.entries(variables).find(([key]) => key.indexOf('SHOP') !== -1)[1]

    const cmd = `theme get --list -p=${password} -s=${storeURL}`
    this.log(chalk.bold(cmd))
    const output = await exec(cmd)
    if (output.stderr) {
      this.error(output.stderr)
      return
    }

    this.log(`${output.stdout.trim()}\n`)

    if (flags['list-only']) {
      return
    }

    const prodMatch = output.stdout.match(/$\s*\[(\d+)\]\[live\]/m)
    if (prodMatch) {
      variables.PROD_THEMEID = prodMatch[1]
    } else {
      this.log("Couldn't find live theme. Which... is very surprising.")
    }

    const stageMatch = output.stdout.match(/$\s*\[(\d+)\]\s+\[STAGING\]/m)
    if (stageMatch) {
      variables.STAGING_THEMEID = stageMatch[1]
    } else {
      this.log("Couldn't find [STAGING] theme.")
    }

    const qaMatch = output.stdout.match(/$\s*\[(\d+)\]\s+\[QA\]/m)
    if (qaMatch) {
      variables.QA_THEMEID = qaMatch[1]
    } else {
      this.log("Couldn't find [QA] theme.")
    }

    if (flags.personal) {
      let personalRegExp = new RegExp('$\\s*\\[(\\d+)\\]\\s+\\[' + flags.personal + '\\]', 'm')
      const personalMatch = output.stdout.match(personalRegExp)
      if (personalMatch) {
        variables.PERSONAL_THEMEID = personalMatch[1]
      } else {
        this.log("Couldn't find [" + flags.personal + '] theme.')
      }
    }

    variablesText = setVariables(variables)

    this.log(chalk.bold.underline('variables (post-write):'))
    this.log(variablesText)
  }
}

SyncEnvsCommand.description = `theme:sync-envs: getting/updating current project/repo variables

Grabs the current variables file, and makes it sync up with what the Shopify API currently has for the themes.

Only doing PROD and STAGING syncing, currently; future plans to include .sk-shopify-rc.json/.yml file, which will manually control which is synced with what.
`

SyncEnvsCommand.flags = {
  'list-only': flags.boolean({
    char: 'l',
    description: 'just output current theme list from Shopify Theme API',
    default: false,
  }),
  'personal': flags.string({
    char: 'p',
    description: 'search-string for personal theme',
    default: '',
  }),
}

module.exports = SyncEnvsCommand
