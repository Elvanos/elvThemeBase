/**
 * Component - {FILE_NAME}
 */

{SUB_FILE_IMPORT}

export const {FILE_NAME} = ():void => {

  // Run the script for each individual component found on the page
  const componentSelector = document.querySelectorAll('.js-{FILE_NAME}') as unknown as HTMLElement[]
  componentSelector.forEach((component:HTMLElement) => {
    {SUB_FILE_RUN}
  })

}
