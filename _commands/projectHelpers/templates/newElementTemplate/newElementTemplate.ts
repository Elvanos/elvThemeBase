/**
 * Element - {FILE_NAME}
 */

export const {FILE_NAME} = ():void => {

  // Run the script for each individual element found on the page
  const elementSelector = document.querySelectorAll('.js-{FILE_NAME}') as unknown as HTMLElement[]
  elementSelector.forEach((component:HTMLElement) => {

  })

}
