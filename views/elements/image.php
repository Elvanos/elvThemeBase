<?php

/**
 * Element - image
 */

function renderElement_image($data, $imageClasses = '', $altText = false, $fullSettings = false) {

  /* Globals */
  global $themeSetup;

  /* Elements */

  // Element - Dynamic Action Link

  /* Element data */
  if ($data) {

    // Alt text processing
    $altText = ($altText) ? $altText : $data["alt"];

    // Image sizing
    $fourKimage = $data["url"];
    if ($fullSettings == false) {
      $desktopImage = aq_resize($data["url"], $data["width"] / 2);
    }
    if ($fullSettings != false) {
      $fourKimage = aq_resize(
        $data["url"],
        $fullSettings["width"],
        $fullSettings["height"],
        $fullSettings["crop"],
        true,
        $fullSettings["upscale"]
      );
      $desktopImage = aq_resize(
        $data["url"],
        $fullSettings["width"] / 2,
        $fullSettings["height"] / 2,
        $fullSettings["crop"],
        true,
        $fullSettings["upscale"]
      );
    }
  }

  /* Render element */

?>
  <picture class="image js-image <?= $imageClasses ?>">
    <source srcset="<?= $desktopImage ?>" media="(max-width: 3199px)">
    <img src="<?= $fourKimage ?>" alt="<?= $altText ?>" />
  </picture>
<?php } ?>