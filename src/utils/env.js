const path = require('path')
const {
  readdirSync: readdir,
  readFileSync: readFile,
  writeFileSync: writeFile,
} = require('fs')

let variablesPath
let variablesText

const findVariables = () => {
  if (!variablesPath) {
    (function dive(dir) {
      const list = readdir(dir)
      if (list.includes('variables')) {
        variablesPath = `${dir}${path.sep}variables`
      } else if (dir !== '/') {
        dive(path.resolve(dir, `..${path.sep}`))
      }
    })('.')
  }

  return variablesPath
}

const readVariables = (force = false) => {
  if (!variablesText || force) {
    if (findVariables()) {
      variablesText = readFile(findVariables()).toString()
    }
  }

  return variablesText || null
}

const getVariables = (force = false) => {
  if (!findVariables()) {
    return null
  }

  const variables = readVariables(force)
  .split('\n')
  .filter(item => Boolean(item))
  .reduce((prev, curr) => {
    const [key, value] = curr.split('=')
    return {
      ...prev,
      [key]: value,
    }
  }, {})

  return variables || null
}

const setVariables = variables => {
  if (!findVariables()) {
    return null
  }

  const variablesText = Object.entries(variables)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n')

  writeFile(variablesPath, variablesText)

  return variablesText
}

module.exports = {getVariables, readVariables, setVariables}
