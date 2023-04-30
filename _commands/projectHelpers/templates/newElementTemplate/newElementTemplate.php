<?php

/**
 * Element - {FILE_NAME}
 */

function renderElement_{FILE_NAME}($data) { 

  /* Globals */
  global $themeSetup;

  /* Elements */

  // Element - Dynamic Action Link
  if (!function_exists("renderElement_dynamicActionLink")) {
    get_template_part("views/elements/dynamicActionLink");
  }

  /* Element data */

  /* Render element */

  ?>
  <div class="{FILE_NAME} js-{FILE_NAME}">
    
  </div>
<?php } ?>