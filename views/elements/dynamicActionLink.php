<?php

/**
 * Element - dynamicActionLink
 */

function renderElement_dynamicActionLink($data, $extraClasses = "", $specialImage = false) {

  /* Globals */
  global $themeSetup;

  /* Elements */

  // Element - Image
  if (!function_exists("renderElement_image")) {
    get_template_part("views/elements/image");
  }

  /* Element data */
  $interactionType = $data["interactionType"];

  /* Render element */

?>

  <?php
  // Common link case
  if ($interactionType == 'link') {
    $linkURL = $data["normalLink"]['url'];
    $linkText = $data["normalLink"]['title'];
    $linkTarget = ($data["normalLink"]['target']) ? '_blank' : '_self';
  ?>
    <a href="<?= $linkURL ?>" target="<?= $linkTarget ?>" class="dynamicActionLink <?= $extraClasses ?>">
      <?php if ($specialImage) { ?>
        <?php renderElement_image($specialImage) ?>
      <?php } ?>
      <?= $linkText ?>
    </a>
  <?php } ?>

  <?php
  // Special script interaction case
  if ($interactionType == 'special') {
    $specialText = $data["specialInteractionText"];
    $specialScripts = $data["specialSiteInteractions"];
    $specialUUID = 'specialAction-' . uniqid();
  ?>

    <a href="#" id="<?= $specialUUID ?>" class="<?= $extraClasses ?>">
      <?php if ($specialImage) { ?>
        <?php renderElement_image($specialImage) ?>
      <?php } ?>
      <?= $specialText ?>
    </a>

    <?php
    if ($specialScripts) {
      foreach ($specialScripts as $specialScript) {

        // Action type
        $specialActionType = $specialScript["actionType"];

        // Checkbox handling
        $specialCheckboxSelector = $specialScript["selectorValue"];

        // Textfield handling
        $specialTextfieldSelector = $specialScript["selectorName"];
        $specialTextfieldValue = $specialScript["textToFill"];

        // Smoothscroll handling
        $specialScrollSelector = $specialScript["selectorJquery"];
    ?>
        <script>
          jQuery(document).ready(function() {
            jQuery('#<?= $specialUUID ?>').click(function(e) {
              e.preventDefault();

              <?php if ($specialActionType == 'setText') { ?>
                var specialInput = jQuery('[name=<?= $specialTextfieldSelector ?>]');
                if (specialInput.length > 0) {
                  specialInput.val('<?= $specialTextfieldValue ?>');
                }
              <?php } ?>

              <?php if ($specialActionType == 'setCheckbox') { ?>
                var specialCheckbox = jQuery('[value="<?= $specialCheckboxSelector ?>"]');
                if (specialCheckbox.length > 0) {
                  specialCheckbox.prop('checked', true);
                }
              <?php } ?>

              <?php if ($specialActionType == 'smoothScroll') { ?>
                var headerHeight = (jQuery('header')) ? jQuery('header').height() : 0;
                var specialScroll = jQuery('<?= $specialScrollSelector ?>');
                if (specialScroll.length > 0) {
                  jQuery('html, body').animate({
                    scrollTop: specialScroll.offset().top - headerHeight
                  }, 1300);

                  setTimeout(() => {
                    jQuery('html, body').animate({
                      scrollTop: specialScroll.offset().top - headerHeight
                    }, 0);
                  }, 1300);
                }
              <?php } ?>
            });
          });
        </script>
    <?php }
    } ?>

  <?php } ?>

<?php
}
