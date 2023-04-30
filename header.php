<!DOCTYPE html>
<html class="htmlWrapper" <?php language_attributes() ?>>

<head>

  <?php global $themeSetup; ?>

  <?php
  $baseTitle = (get_the_title()) ? get_the_title() : __('Error 404', $themeSetup['projectName'] . 'Theme');
  $fullTitle = get_bloginfo('blogtitle') . " | " . $baseTitle;
  $bodyClasses = join(" ", get_body_class())
  ?>

  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>
    <?= $fullTitle ?>
  </title>

  <?php wp_head(); ?>

</head>

<body class="<?= $bodyClasses ?>">

  <header class="header js-header">

  </header>

  <div class="pageWrapper js-pageWrapper">
    <div class="contentWrapper js-contentWrapper">