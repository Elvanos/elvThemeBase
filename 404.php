<?php

function render404Template() {

  /* Globals */
  global $themeSetup;

  /* Elements */

  /* Components */

  /* Setup data - 404 */
  $localFields = get_fields();
  $globalFields = $themeSetup["options"]["globalComponents"];

  /* Setup data - Individual */

  /* Render Index */
  get_header();
?>

  <h2>
    <?php __('This is the generic "404.php" file!', $themeSetup['projectName'] . 'Theme'); ?>
  </h2>

<?php
  get_footer();
}
render404Template();
