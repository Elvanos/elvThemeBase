import path from "path"
import fs from "fs"
import appRootPath from "app-root-path"
import dotEnv from 'dotenv'
import PrettyError from "pretty-error"

/*
----------------------------------------------------------------------------------------------
 BASIC SETUP - CREATE NEW PAGE TEMPLATE SCRIPT
----------------------------------------------------------------------------------------------
*/
const refreshFileList = () => {

  // Pretty error handling
  const pe = new PrettyError()
  let renderedError

/*
----------------------------------------------------------------------------------------------
 ARGUMENT AND SETUP CHECKING
----------------------------------------------------------------------------------------------
*/

  // Check for proper config data and read it
  if (!fs.existsSync(`${appRootPath}/.vscode`) || !fs.existsSync(`${appRootPath}/.vscode/tasks.json`)) {
    renderedError = pe.render(new Error())
    console.log(renderedError)

    console.log(
        '\x1b[31m',
        'Missing ".vscode" folder or "tasks.json" file!'
      )
    console.log(
        `${(fs.existsSync(`${appRootPath}/.vscode`)) ? '\x1b[32m' : '\x1b[31m'}`,
        `.vscode folder: ${(fs.existsSync(`${appRootPath}/.vscode`)) ? 'Exists' : 'Not found'}`
       )
    console.log(
        `${(fs.existsSync(`${appRootPath}/.vscode/tasks.json`)) ? '\x1b[32m' : '\x1b[31m'}`,
        `tasks.json file: ${(fs.existsSync(`${appRootPath}/.vscode`)) ? 'Exists' : 'Not found'}`
      )
    console.log('')

    process.exit(666)
  }

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

/*
----------------------------------------------------------------------------------------------
 LIST REFRESH
----------------------------------------------------------------------------------------------
*/

  // Prep base variables
  const theList = []
  const basePath = `${appRootPath}/views`

  // General processing function
  const processDirectory = (prefix, basePath, finalPath) => {
    const pathToRead = `${basePath}/${finalPath}`
    let localList = []

    // Process everything in the directory if it exists
    if (fs.existsSync(pathToRead)) {
      localList = fs.readdirSync(pathToRead)
      localList.forEach((file) => {
        const filePathString = `${pathToRead}/${file}`
        const isDirectory = fs.lstatSync(filePathString).isDirectory()

        // If it is a file, add it to "The List" without prefixes
        if (!isDirectory) {
          theList.push(`${prefix}: ${path.parse(file).name}`)
        }
      })
    }
  }

  // General checking
  if (
    fs.existsSync(`${appRootPath}`) &&
    fs.existsSync(`${appRootPath}/views`)
  ) {

    // Process elements and components
    processDirectory('Element', basePath, 'elements')
    processDirectory('Component', basePath, 'components')

    // Load current tasks config
    let tasksData = fs.readFileSync(`${appRootPath}/.vscode/tasks.json`, 'utf8')
    tasksData = JSON.parse(tasksData)

    // Replace the particular task that needs it
    tasksData.inputs.forEach(single => {
      if (single.id === 'insertList') {
        single.options = theList
      }
    })

    // Update the file with fresh file list
    tasksData = JSON.stringify(tasksData, null, '\t')
    fs.writeFileSync(`${appRootPath}/.vscode/tasks.json`, tasksData)
  }
}

export default refreshFileList
