/**
 * Page - {FILE_NAME}
 */
export const {FILE_NAME} = ():void => {

  // Kill the script if the selector doesn't exist
  const pageSelector = document.querySelector('.page-template-page-{FILE_NAME}')
  if(pageSelector === null){
    return
  }

}
