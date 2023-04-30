import open from "open"
import fs from "fs"
import appRootPath from "app-root-path"
import dotEnv from 'dotenv'
import PrettyError from "pretty-error"
import refreshFileList from "./refreshFileList/refreshFileList.js"

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
    '\x1b[31m',
    'Missing config file or wrong data inside!'
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
    'Input lacks either a filename(1. argument) or a template name(2. argument) or file generation input (3. & 4. argument)!'
  )
  console.log(
    `${(process.argv.slice(2)[0]) ? '\x1b[32m' : '\x1b[31m'}`,
    `Argument 1: ${process.argv.slice(2)[0]}`
  )
  console.log(
    `${(process.argv.slice(2)[1]) ? '\x1b[32m' : '\x1b[31m'}`,
    `Argument 2: ${process.argv.slice(2)[1]}`
  )
  console.log(
    `${(process.argv.slice(2)[1]) ? '\x1b[32m' : '\x1b[31m'}`,
    `Argument 3: ${process.argv.slice(2)[2]}`
  )
  console.log(
    `${(process.argv.slice(2)[1]) ? '\x1b[32m' : '\x1b[31m'}`,
    `Argument 4: ${process.argv.slice(2)[3]}`
  )
  console.log('')

  process.exit(666)
}
const argFileName = process.argv.slice(2)[0]
const argTemplateName = process.argv.slice(2)[1]
const argGenerateSCSS = (process.argv.slice(2)[2] === 'Yes')
const argGenerateTS = (process.argv.slice(2)[3] === 'Yes')

/*
----------------------------------------------------------------------------------------------
 PHP FILE GENERATION (no integration)
----------------------------------------------------------------------------------------------
*/

// Check if the target folder exists, if not, create it
if (!fs.existsSync(`${appRootPath}/page-templates/`)) {
  fs.mkdirSync(`${appRootPath}/page-templates/`)
}

// Check if the file already exists
if (fs.existsSync(`${appRootPath}/page-templates/page-${argFileName}.php`)) {
  renderedError = pe.render(new Error())
  console.log(renderedError)

  console.log(
    '\x1b[31m',
    'File already exists!'
  )
  console.log(
    '\x1b[31m',
    `${appRootPath}/page-templates/page-${argFileName}.php`
  )
  console.log('')

  process.exit(666)
}

// Read template contents
let templateContentPHP = fs.readFileSync(`${appRootPath}/_commands/projectHelpers/templates/newPageTemplate/newPageTemplate.php`, 'utf8')

// Prep the contents for new file
templateContentPHP = templateContentPHP.replace('{PROJECT_LONG_NAME}', projectLongName)
templateContentPHP = templateContentPHP.replace('{TEMPLATE_NAME}', argTemplateName)

// Write the new file
fs.writeFileSync(`${appRootPath}/page-templates/page-${argFileName}.php`, templateContentPHP)

// Report success
console.log(
  '\x1b[32m',
  `Succesfully created "page-${argFileName}.php" with template name "${argTemplateName}"`
)
console.log('')

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
      '"src/styles" folder doesn\'t exist!'
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
  if (!fs.existsSync(`${appRootPath}/_src/styles/pageTemplates`)) {
    fs.mkdirSync(`${appRootPath}/_src/styles/pageTemplates/`)
  }

  // Check if the file already exists
  if (fs.existsSync(`${appRootPath}/_src/styles/pageTemplates/${argFileName}.scss`)) {
    renderedError = pe.render(new Error())
    console.log(renderedError)

    console.log(
      '\x1b[31m',
      'File already exists!'
    )
    console.log(
      '\x1b[31m',
      `${appRootPath}/_src/styles/pageTemplates/${argFileName}.scss`
    )
    console.log('')

    process.exit(666)
  }

  // Read template contents
  let templateContentSCSS = fs.readFileSync(`${appRootPath}/_commands/projectHelpers/templates/newPageTemplate/newPageTemplate.scss`, 'utf8')

  // Prep the contents for new file
  templateContentSCSS = templateContentSCSS.replace(/{FILE_NAME}/g, argFileName)

  // Write the new file
  fs.writeFileSync(`${appRootPath}/_src/styles/pageTemplates/${argFileName}.scss`, templateContentSCSS)

  console.log(
    '\x1b[32m',
    `Succesfully created "${argFileName}.scss"`
  )

  // Integrate the newly created file into the SCSS index file
  let indexContentSCSS = fs.readFileSync(`${appRootPath}/_src/styles/index.scss`, 'utf8')

  // Prep the contents for new file
  indexContentSCSS = indexContentSCSS.replace('/* Page Templates */', `/* Page Templates */\r\n@import "./pageTemplates/${argFileName}.scss";`)

  // Write the updated index file
  fs.writeFileSync(`${appRootPath}/_src/styles/index.scss`, indexContentSCSS)

  // Report success
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
      '"src" folder doesn\'t exist!'
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
      '"src/scripts" folder doesn\'t exist!'
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
  if (!fs.existsSync(`${appRootPath}/_src/scripts/pageTemplates`)) {
    fs.mkdirSync(`${appRootPath}/_src/scripts/pageTemplates/`)
  }

  // Check if the file already exists
  if (fs.existsSync(`${appRootPath}/_src/scripts/pageTemplates/${argFileName}.ts`)) {
    renderedError = pe.render(new Error())
    console.log(renderedError)

    console.log(
      '\x1b[31m',
      'File already exists!'
    )
    console.log(
      '\x1b[31m',
      `${appRootPath}/_src/scripts/pageTemplates/${argFileName}.ts`
    )
    console.log('')

    process.exit(666)
  }

  // Read template contents
  let templateContentTS = fs.readFileSync(`${appRootPath}/_commands/projectHelpers/templates/newPageTemplate/newPageTemplate.ts`, 'utf8')

  // Prep the contents for new file
  templateContentTS = templateContentTS.replace(/{FILE_NAME}/g, argFileName)

  // Write the new file
  fs.writeFileSync(`${appRootPath}/_src/scripts/pageTemplates/${argFileName}.ts`, templateContentTS)

  console.log(
    '\x1b[32m',
    `Succesfully created "${argFileName}.ts"`
  )

  // Integrate the newly created file into the TS index file
  let indexContentTS = fs.readFileSync(`${appRootPath}/_src/scripts/index.ts`, 'utf8')

  // Prep the contents for new file
  indexContentTS = indexContentTS.replace('/* Page Templates - Imports */', `/* Page Templates - Imports */\r\nimport { ${argFileName} } from './pageTemplates/${argFileName}'`)
  indexContentTS = indexContentTS.replace('/* Page Templates */', `/* Page Templates */\r\n  ${argFileName}()`)

  // Write the updated index file
  fs.writeFileSync(`${appRootPath}/_src/scripts/index.ts`, indexContentTS)

  // Report success
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
  await open(`${appRootPath}/page-templates/page-${argFileName}.php`, {
    app: {
      name: 'code'
    }
  })
  if (argGenerateSCSS) {
    await open(`${appRootPath}/_src/styles/pageTemplates/${argFileName}.scss`, {
      app: {
        name: 'code'
      }
    })
  }
  if (argGenerateTS) {
    await open(`${appRootPath}/_src/scripts/pageTemplates/${argFileName}.ts`, {
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
