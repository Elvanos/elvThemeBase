<?php

/**
 * Component - {FILE_NAME}
 */

function renderComponent_{FILE_NAME}($data) { 
  
  /* Globals */
  global $themeSetup;

  /* Elements */

  // Element - Dynamic Action Link
  if (!function_exists("renderElement_dynamicActionLink")) {
    get_template_part("views/elements/dynamicActionLink");
  }

  {SUB_FILE_LOAD}
  {SUB_FILE_DATA_LOAD}
  /* Component data */

  /* Render component */
  
  ?>
  <section class="{FILE_NAME} js-{FILE_NAME}">
    <div class="container">
      <div class="row">
        <?php 
          {SUB_FILE_RUN}
         ?>
      </div>
    </div>
  </section>
<?php } ?>