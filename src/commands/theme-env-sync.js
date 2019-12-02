/* eslint no-cond-assign: "warn" */
const {Command, flags} = require('@oclif/command')
const {promisify} = require('util')
const exec = promisify(require('child_process').exec)
const {env: {getVariables, setVariables}} = require('../utils')

class ThemeEnvSyncCommand extends Command {
  async run() {
    const {flags} = this.parse(ThemeEnvSyncCommand)
    // const name = flags.listOnly || 'world'

    const variables = getVariables()

    if (!variables) {
      this.log("Couldn't find/read variables file")
      return
    }

    const password = Object.entries(variables).find(([key]) => key.indexOf('PASSWD') !== -1)[1]
    const storeURL = Object.entries(variables).find(([key]) => key.indexOf('SHOP') !== -1)[1]

    const output = await exec(`theme get --list -p=${password} -s=${storeURL}`)
    if (output.stderr) {
      this.error(output.stderr)
      return
    }

    if (flags['list-only']) {
      this.log(output.stdout)
      return
    }

    const prodMatch = output.stdout.match(/$\s*\[(\d+)\]\[live\]/m)
    variables.PROD_THEMEID = prodMatch[1]

    const stageMatch = output.stdout.match(/$\s*\[(\d+)\]\s+\[STAGING\]/m)
    variables.STAGING_THEMEID = stageMatch[1]

    setVariables(variables)
  }
}

ThemeEnvSyncCommand.description = `theme-env-sync: getting/updating current project/repo variables

Grabs the current variables file, and makes it sync up with what the Shopify API currently has for the themes.

Only doing PROD and STAGING syncing, currently; future plans to include .sk-shopify-rc.json/.yml file, which will manually control which is synced with what.
`

ThemeEnvSyncCommand.flags = {
  'list-only': flags.boolean({
    char: 'l',
    description: 'just output current theme list from Shopify Theme API',
    default: false,
  }),
}

module.exports = ThemeEnvSyncCommand
