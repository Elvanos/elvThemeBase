import open from "open"
import fs from "fs"
import appRootPath from "app-root-path"
import dotEnv from 'dotenv'
import PrettyError from "pretty-error"
import refreshFileList from "./refreshFileList/refreshFileList.js"

/*
----------------------------------------------------------------------------------------------
 BASIC SETUP - CREATE NEW ELEMENT SCRIPT
----------------------------------------------------------------------------------------------
*/

// Pretty error handling
const pe = new PrettyError()
let renderedError

/*
----------------------------------------------------------------------------------------------
 ARGUMENT CHECKING
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
if (process.argv.length < 6) {
  renderedError = pe.render(new Error())
  console.log(renderedError)

  console.log(
    '\x1b[31m',
    'Input lacks either a filename(1. argument) or a template name(2. argument) !'
  )
  console.log(`
    ${(process.argv.slice(2)[0]) ? '\x1b[32m' : '\x1b[31m'}`,
    `Argument 1: ${process.argv.slice(2)[0]}`
  )
  console.log('')

  process.exit(666)
}
const argFileName = process.argv.slice(2)[0]
const argGeneratePHP = (process.argv.slice(2)[1] === 'Yes')
const argGenerateSCSS = (process.argv.slice(2)[2] === 'Yes')
const argGenerateTS = (process.argv.slice(2)[3] === 'Yes')

/*
----------------------------------------------------------------------------------------------
 PHP FILE GENERATION (no integration)
----------------------------------------------------------------------------------------------
*/
if (argGeneratePHP) {
  // Check if the target folder exists, if not, create it
  if (!fs.existsSync(`${appRootPath}/views/`)) {
    fs.mkdirSync(`${appRootPath}/views/`)
  }

  // Check if the target sub-folder exists, if not, create it
  if (!fs.existsSync(`${appRootPath}/views/elements`)) {
    fs.mkdirSync(`${appRootPath}/views/elements`)
  }

  // Check if the file already exists - Main File
  if (fs.existsSync(`${appRootPath}/views/elements/${argFileName}.php`)) {
    renderedError = pe.render(new Error())
    console.log(renderedError)

    console.log(
      '\x1b[31m',
      'File already exists!'
    )
    console.log(
      '\x1b[31m', 
      `${appRootPath}/views/elements/${argFileName}.php`
    )
    console.log('')

    process.exit(666)
  }

  // Read template contents - Main File
  let templateContentPHP = fs.readFileSync(`${appRootPath}/_commands/projectHelpers/templates/newElementTemplate/newElementTemplate.php`, 'utf8')

  // Prep the contents for new file - Main File
  templateContentPHP = templateContentPHP.replace(/{FILE_NAME}/g, argFileName)

  // Write the new file - Main File
  fs.writeFileSync(`${appRootPath}/views/elements/${argFileName}.php`, templateContentPHP)

  // Report success
  console.log('\x1b[32m', `Succesfully created "${argFileName}.php"`)
  console.log('')
}

/*
----------------------------------------------------------------------------------------------
 SCSS FILE GENERATION AND INTEGRATION
----------------------------------------------------------------------------------------------
*/

if (argGenerateSCSS) {
  // Check if the SRC folder exists, if not, exit (as that is too much of a deal for this script)
  if (!fs.existsSync(`${appRootPath}/_src/`)) {
    renderedError = pe.render(new Error())
    console.log(renderedError)

    console.log(
      '\x1b[31m',
      '"src" folder doesn\'t exist!'
    )
    console.log(
      '\x1b[31m',
      `${appRootPath}/_src/`
    )
    console.log('')

    process.exit(666)
  }

  // Check if the SRC/styles folder exists, if not, exit (as that is too much of a deal for this script)
  if (!fs.existsSync(`${appRootPath}/_src/styles`)) {
    renderedError = pe.render(new Error())
    console.log(renderedError)

    console.log(
      '\x1b[31m',
      '"_src/styles" folder doesn\'t exist!'
    )
    console.log(
      '\x1b[31m',
      `${appRootPath}/_src/styles/`
    )
    console.log('')

    process.exit(666)
  }

  // Check if the SRC/styles/index.scss file exists, if not, exit (as that is too much of a deal for this script)
  if (!fs.existsSync(`${appRootPath}/_src/styles/index.scss`)) {
    renderedError = pe.render(new Error())
    console.log(renderedError)

    console.log(
      '\x1b[31m',
      '"/_src/styles/index.scss" file doesn\'t exist!'
    )
    console.log(
      '\x1b[31m',
      `${appRootPath}/_src/styles/index.scss`
    )
    console.log('')

    process.exit(666)
  }

  // Check if the target folder exists, if not, create it
  if (!fs.existsSync(`${appRootPath}/_src/styles/elements`)) {
    fs.mkdirSync(`${appRootPath}/_src/styles/elements/`)
  }

  // Check if the file already exists - Main File
  if (fs.existsSync(`${appRootPath}/_src/styles/elements/${argFileName}.scss`)) {
    renderedError = pe.render(new Error())
    console.log(renderedError)

    console.log(
      '\x1b[31m',
      'File already exists!'
    )
    console.log(
      '\x1b[31m',
      `${appRootPath}/_src/styles/elements/${argFileName}.scss`
    )
    console.log('')

    process.exit(666)
  }

  // Read template contents - Main File
  let templateContentSCSS = fs.readFileSync(`${appRootPath}/_commands/projectHelpers/templates/newElementTemplate/newElementTemplate.scss`, 'utf8')

  // Prep the contents for new file - Main File
  templateContentSCSS = templateContentSCSS.replace(/{FILE_NAME}/g, argFileName)

  // Write the new file - Main File
  fs.writeFileSync(`${appRootPath}/_src/styles/elements/${argFileName}.scss`, templateContentSCSS)

  // Integrate the newly created file into the SCSS index file - Main File
  let indexContentSCSS = fs.readFileSync(`${appRootPath}/_src/styles/index.scss`, 'utf8')

  // Prep the modified index content - Main File
  indexContentSCSS = indexContentSCSS.replace('/* Elements */', `/* Elements */\r\n  @import "./elements/${argFileName}.scss";`)

  // Write the updated index file - Main file
  fs.writeFileSync(`${appRootPath}/_src/styles/index.scss`, indexContentSCSS)

  // Report success
  console.log(
    '\x1b[32m',
    `Succesfully created "${argFileName}.scss"`
  )
  console.log(
    '\x1b[32m',
    `Succesfully integrated "${argFileName}.scss" into coresponding index file`
  )
  console.log('')
}

/*
----------------------------------------------------------------------------------------------
 TS FILE GENERATION AND INTEGRATION
----------------------------------------------------------------------------------------------
*/

if (argGenerateTS) {
  // Check if the SRC folder exists, if not, exit (as that is too much of a deal for this script)
  if (!fs.existsSync(`${appRootPath}/_src/`)) {
    renderedError = pe.render(new Error())
    console.log(renderedError)

    console.log(
      '\x1b[31m',
      '"_src" folder doesn\'t exist!'
    )
    console.log(
      '\x1b[31m',
      `${appRootPath}/_src/`
    )
    console.log('')

    process.exit(666)
  }

  // Check if the SRC/scripts folder exists, if not, exit (as that is too much of a deal for this script)
  if (!fs.existsSync(`${appRootPath}/_src/scripts`)) {
    renderedError = pe.render(new Error())
    console.log(renderedError)

    console.log(
      '\x1b[31m',
      '"_src/scripts" folder doesn\'t exist!'
    )
    console.log(
      '\x1b[31m',
      `${appRootPath}/_src/scripts/`
    )
    console.log('')

    process.exit(666)
  }

  // Check if the SRC/scripts/index.ts file exists, if not, exit (as that is too much of a deal for this script)
  if (!fs.existsSync(`${appRootPath}/_src/scripts/index.ts`)) {
    renderedError = pe.render(new Error())
    console.log(renderedError)

    console.log(
      '\x1b[31m',
      '"/_src/scripts/index.ts" file doesn\'t exist!'
    )
    console.log(
      '\x1b[31m',
      `${appRootPath}/_src/scripts/index.ts`
    )

    console.log('')

    process.exit(666)
  }

  // Check if the target folder exists, if not, create it
  if (!fs.existsSync(`${appRootPath}/_src/scripts/elements`)) {
    fs.mkdirSync(`${appRootPath}/_src/scripts/elements/`)
  }

  // Check if the file already exists
  if (fs.existsSync(`${appRootPath}/_src/scripts/elements/${argFileName}.ts`)) {
    renderedError = pe.render(new Error())
    console.log(renderedError)

    console.log(
      '\x1b[31m',
      'File already exists!'
    )
    console.log(
      '\x1b[31m',
      `${appRootPath}/_src/scripts/elements/${argFileName}.ts`
    )
    console.log('')

    process.exit(666)
  }

  // Read template contents - Main File
  let templateContentTS = fs.readFileSync(`${appRootPath}/_commands/projectHelpers/templates/newElementTemplate/newElementTemplate.ts`, 'utf8')

  // Prep the contents for new file - Main File
  templateContentTS = templateContentTS.replace(/{FILE_NAME}/g, argFileName)

  // Write the new file - Main File
  fs.writeFileSync(`${appRootPath}/_src/scripts/elements/${argFileName}.ts`, templateContentTS)

  // Integrate the newly created file into the TS index file - Main File
  let indexContentTS = fs.readFileSync(`${appRootPath}/_src/scripts/index.ts`, 'utf8')

  // Prep the modified index content - Main File
  indexContentTS = indexContentTS.replace('/* Elements - Imports */', `/* Elements - Imports */\r\nimport { ${argFileName} } from './elements/${argFileName}'`)
  indexContentTS = indexContentTS.replace('/* Elements */', `/* Elements */\r\n  ${argFileName}()`)

  // Write the updated index file - Main File
  fs.writeFileSync(`${appRootPath}/_src/scripts/index.ts`, indexContentTS)

  // Report success
  console.log(
    '\x1b[32m',
    `Succesfully created "${argFileName}.ts"`
  )
  console.log(
    '\x1b[32m',
    `Succesfully integrated "${argFileName}.ts" into coresponding index file`
  )
  console.log('')
}

/*
----------------------------------------------------------------------------------------------
 AUTO-OPEN CREATED FILES & CLEANUP
----------------------------------------------------------------------------------------------
*/
const openFiles = async () => {
  if (argGeneratePHP) {
    await open(`${appRootPath}/views/elements/${argFileName}.php`, {
      app: {
        name: 'code'
      }
    })
  }
  if (argGenerateSCSS) {
    await open(`${appRootPath}/_src/styles/elements/${argFileName}.scss`, {
      app: {
        name: 'code'
      }
    })
  }
  if (argGenerateTS) {
    await open(`${appRootPath}/_src/scripts/elements/${argFileName}.ts`, {
      app: {
        name: 'code'
      }
    })
  }
}
openFiles()
  .catch(() => {
    console.log(
      '\x1b[31m',
      'Can\'t open created files!'
    )
  })

refreshFileList()
