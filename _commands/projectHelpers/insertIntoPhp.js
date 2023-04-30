import fs from "fs"
import appRootPath from "app-root-path"
import dotEnv from 'dotenv'
import PrettyError from "pretty-error"

/*
----------------------------------------------------------------------------------------------
 BASIC SETUP - CREATE NEW PAGE TEMPLATE SCRIPT
----------------------------------------------------------------------------------------------
*/

// Pretty error handling
const pe = new PrettyError()
let renderedError

/*
----------------------------------------------------------------------------------------------
 ARGUMENT AND SETUP CHECKING
----------------------------------------------------------------------------------------------
*/

// Check for proper config data and read it
dotEnv.config()
const projectName = process.env.THEME_NAME
const projectLongName = process.env.THEME_NAME_LONG
const projectLowercaseName = process.env.THEME_NAME_LOWERCASE

if ((!fs.existsSync(`${appRootPath}/.env`)) || !projectName || !projectLongName || !projectLowercaseName) {
  renderedError = pe.render(new Error())
  console.log(renderedError)

  console.log(
    '\x1b[31m', 'Missing config file or wrong data inside!'
  )
  console.log(
    `${(fs.existsSync(`${appRootPath}/.env`)) ? '\x1b[32m' : '\x1b[31m'}`,
    `.env file: ${(fs.existsSync(`${appRootPath}/.env`)) ? 'Exists' : 'Not found'}`
  )
  console.log(
    `${(projectName) ? '\x1b[32m' : '\x1b[31m'}`,
    `Project name - Scripts: ${projectName}`
  )
  console.log(
    `${(projectLongName) ? '\x1b[32m' : '\x1b[31m'}`,
    `Project name, Long variation - Scripts: ${projectLongName}`
  )
  console.log(
    `${(projectLowercaseName) ? '\x1b[32m' : '\x1b[31m'}`,
    `Project name, Lowercase variation: ${projectLowercaseName}`
  )
  console.log('')

  process.exit(666)
}

// Check for proper input args and read them
if (process.argv.length < 5) {
  renderedError = pe.render(new Error())
  console.log(renderedError)

  console.log('\x1b[31m', 'Input lacks either a filename with the type(1. argument)!')
  console.log(`${(process.argv.slice(2)[0]) ? '\x1b[32m' : '\x1b[31m'}`, `Argument 1: ${process.argv.slice(2)[0]}`)
  console.log('')

  process.exit(666)
}

const argMix = process.argv.slice(2)[0]
const fnArgs = argMix.split(': ')
const argPhpWrap = (process.argv.slice(2)[1] === 'Yes')
const argCurrentFilePath = process.argv.slice(2)[2]
const argCurrentFileLineNumber = parseInt(process.argv.slice(2)[3])

const trimPhpTags = (input) => {
  input = input.split('\n')
  input.splice(0, 2)
  input.splice(input.length - 2, 2)
  input = input.join('\n')
  return input
}

const addPhpTags = (input) => {
  input = input.split('\n')
  input.splice(0, 0, '<?php')
  input.splice(input.length, 0, '?>')
  input = input.join('\n')
  return input
}

// Read template contents
let templateContentPHP = fs.readFileSync(`${appRootPath}/_commands/projectHelpers/templates/insertIntoPhp/insertIntoPhp.php`, 'utf8')

switch (fnArgs[0]) {
  case 'Component': {
    // Cut first and two last two lines if PHP tag is not meant to be added
    if (!argPhpWrap) {
      templateContentPHP = trimPhpTags(templateContentPHP)
    }

    templateContentPHP = templateContentPHP.replace(/{FILE_TYPE}/g, 'Component')
    templateContentPHP = templateContentPHP.replace(/{FUNCTION_TYPE}/g, 'renderComponent')
    templateContentPHP = templateContentPHP.replace(/{FILE_NAME}/g, fnArgs[1])
    templateContentPHP = templateContentPHP.replace(/{FULL_FILE_PATH}/g, `views/components/${fnArgs[1]}`)

    break
  }
  case 'Element': {
    // Cut first and two last two lines if PHP tag is not meant to be added
    if (!argPhpWrap) {
      templateContentPHP = trimPhpTags(templateContentPHP)
    }

    templateContentPHP = templateContentPHP.replace(/{FILE_TYPE}/g, 'Element')
    templateContentPHP = templateContentPHP.replace(/{FUNCTION_TYPE}/g, 'renderElement')
    templateContentPHP = templateContentPHP.replace(/{FILE_NAME}/g, fnArgs[1])
    templateContentPHP = templateContentPHP.replace(/{FULL_FILE_PATH}/g, `views/elements/${fnArgs[1]}`)

    break
  }
  default: {
    renderedError = pe.render(new Error())
    console.log(renderedError)

    console.log(
      '\x1b[31m',
      'Unsupported file type!'
    )
    console.log('')

    process.exit(666)
  }
}

let currentFileContents = fs.readFileSync(argCurrentFilePath, 'utf8')

let autoImportComponents = (currentFileContents.includes('/* Components */'))
let autoImportElements = (currentFileContents.includes('/* Elements */'))
let autoImportDataList = (currentFileContents.includes('/* Setup data - Individual */'))

if (!autoImportComponents && !autoImportElements) {
  currentFileContents = currentFileContents.split('\n')
  currentFileContents.splice(argCurrentFileLineNumber, 0, templateContentPHP)
  currentFileContents = currentFileContents.join('\n')
}

// Case - Component
if (autoImportComponents && fnArgs[0] === 'Component') {
  if (argPhpWrap) {
    templateContentPHP = trimPhpTags(templateContentPHP)
  }

  const tempContentPHP = templateContentPHP.split('\n')
  const tempFnContent = tempContentPHP.splice(0, 5).join('\n')
  let tempFnCall = tempContentPHP.splice(tempContentPHP.length - 2, 2).join('\n')

  if (argPhpWrap) {
    tempFnCall = addPhpTags(tempFnCall)
  }

  currentFileContents = currentFileContents.split('\n')
  currentFileContents.splice(argCurrentFileLineNumber, 0, tempFnCall)
  currentFileContents = currentFileContents.join('\n')

  // Prep the file
  currentFileContents = currentFileContents.replace('/* Components */', `/* Components */\r\n${tempFnContent}`)

  if (autoImportDataList) {
    currentFileContents = currentFileContents.replace('/* Setup data - Individual */', `/* Setup data - Individual */\r\n  $${fnArgs[1]}_data = $localFields['${fnArgs[1]}'];`)
  }
}

// Case - Element
if (autoImportElements && fnArgs[0] === 'Element') {
  if (argPhpWrap) {
    templateContentPHP = trimPhpTags(templateContentPHP)
  }

  const tempContentPHP = templateContentPHP.split('\n')
  const tempFnContent = tempContentPHP.splice(0, 5).join('\n')
  let tempFnCall = tempContentPHP.splice(tempContentPHP.length - 2, 2).join('\n')

  if (argPhpWrap) {
    tempFnCall = addPhpTags(tempFnCall)
  }

  currentFileContents = currentFileContents.split('\n')
  currentFileContents.splice(argCurrentFileLineNumber, 0, tempFnCall)
  currentFileContents = currentFileContents.join('\n')

  // Prep the file
  currentFileContents = currentFileContents.replace('/* Elements */', `/* Elements */\r\n${tempFnContent}`)

  if (autoImportDataList) {
    currentFileContents = currentFileContents.replace('/* Setup data - Individual */', `/* Setup data - Individual */\r\n  $${fnArgs[1]}_data = $localFields['${fnArgs[1]}'];`)
  }
}

fs.writeFileSync(argCurrentFilePath, currentFileContents)
