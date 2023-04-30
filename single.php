<?php

function renderSingleTemplate() {

  /* Globals */
  global $themeSetup;

  /* Elements */

  /* Components */

  /* Setup data - Single */
  $localFields = get_fields();
  $globalFields = $themeSetup["options"]["globalComponents"];

  /* Setup data - Individual */

  /* Render Index */
  get_header();
?>

  <h1><?php the_title() ?></h1>

  <h2>
    <?php __('This is the generic "single.php" file!', $themeSetup['projectName'] . 'Theme'); ?>
  </h2>

  <article>
    <?php the_content() ?>
  </article>

<?php
  get_footer();
}
renderSingleTemplate();
