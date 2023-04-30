<?php

function renderArchiveTemplate() {

  /* Globals */
  global $themeSetup;

  /* Elements */

  /* Components */

  /* Setup data - Archive */
  $localFields = get_fields();
  $globalFields = $themeSetup["options"]["globalComponents"];

  /* Setup data - Individual */

  /* Render Index */
  get_header();
?>

  <h2>
    <?php __('This is the generic "archive.php" file!', $themeSetup['projectName'] . 'Theme'); ?>
  </h2>

<?php
  get_footer();
}
renderArchiveTemplate();
