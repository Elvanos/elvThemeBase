/**
  * Sub-component - {FILE_NAME}_exampleSubComponent
  * Parent Component - {FILE_NAME}
 */

export const {FILE_NAME}_exampleSubComponent = (parentElement: HTMLElement):void => {

  // Kill the script if the selector doesn't exist
  const subComponentSelector = parentElement.querySelector('.js-{FILE_NAME}_exampleSubComponent') as unknown as HTMLElement
  if(subComponentSelector === null){
    return
  }

}
