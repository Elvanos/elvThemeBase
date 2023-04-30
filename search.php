<?php

function renderSearchTemplate() {

  /* Globals */
  global $themeSetup;

  /* Elements */

  /* Components */

  /* Setup data - Search */
  $localFields = get_fields();
  $globalFields = $themeSetup["options"]["globalComponents"];

  /* Setup data - Individual */

  /* Render Index */
  get_header();
?>

  <h2>
    <?php __('This is the generic "search.php" file!', $themeSetup['projectName'] . 'Theme'); ?>
  </h2>

<?php
  get_footer();
}
renderSearchTemplate();
