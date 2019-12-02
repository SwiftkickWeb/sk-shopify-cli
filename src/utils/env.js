const path = require('path')
const {readdirSync: readdir, readFileSync: readFile, writeFileSync: writeFile} = require('fs')

let variablesPath

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

const getVariables = () => {
  if (!findVariables()) {
    return null
  }

  const variables = readFile(findVariables()).toString()
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

  const contents = Object.entries(variables)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n')

  writeFile(variablesPath, contents)
}

module.exports = {getVariables, setVariables}
