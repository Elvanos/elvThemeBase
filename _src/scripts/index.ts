/* Layout - Imports */
import { header } from './layout/header'
import { footer } from './layout/footer'
import { pageContent } from './layout/pageContent'

/* Elements - Imports */
import { button } from './elements/button'

/* Components - Imports */

/* Page Templates - Imports */

/*
  -----------------------------------
  MAIN FILE
  -----------------------------------
*/
const elvtheme = (): void => {
  /* Layout */
  header()
  footer()
  pageContent()

  /* Elements */
  button()

  /* Components */

  /* Page Templates */
}

export default elvtheme
