/**
 * Element - button
 */

export const button = ():void => {
  // Creates a ripple effect on the button
  function createRipple (this: HTMLElement) {

  }

  // Run the script for each individual element found on the page
  const elementSelector = document.querySelectorAll('.js-button') as unknown as HTMLElement[]
  elementSelector.forEach((element: HTMLElement) => {
    element.addEventListener('click', createRipple)
  })
}
