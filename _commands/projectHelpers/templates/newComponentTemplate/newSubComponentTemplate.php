<?php

/**
 * Sub-component - {FILE_NAME}_exampleSubComponent
 * Parent Component - {FILE_NAME}
 */

function renderSubComponent_{FILE_NAME}_exampleSubComponent($data) { 
  
  /* Globals */
  global $themeSetup;

  /* Elements */

  // Element - Dynamic Action Link
  if (!function_exists("renderElement_dynamicActionLink")) {
    get_template_part("views/elements/dynamicActionLink");
  }
  
  /* Sub-component data */

  /* Render sub-components */

  ?>
  <div class="{FILE_NAME}_exampleSubComponent js-{FILE_NAME}_exampleSubComponent">

  </div>
<?php } ?>