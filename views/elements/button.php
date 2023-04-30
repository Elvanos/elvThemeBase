<?php

/**
 * Element - button
 */

function renderElement_button($data, $buttonExtraClasses = '') {

  /* Globals */
  global $themeSetup;

  /* Elements */

  // Element - Dynamic Action Link
  if (!function_exists("renderElement_dynamicActionLink")) {
    get_template_part("views/elements/dynamicActionLink");
  }

  /* Element data */

  /* Render element */
  $buttonExtraClasses = 'button js-button ' . $buttonExtraClasses;
?>
  <?php if ($data && $data["interactionType"] != 'none') { ?>
    <?php renderElement_dynamicActionLink($data, $buttonExtraClasses); ?>
  <?php } ?>
<?php } ?>