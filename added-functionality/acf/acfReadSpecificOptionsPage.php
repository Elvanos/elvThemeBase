<?php

function acfReadSpecificOptionsPage() {

  global $themeSetup;

  if (function_exists('acf_add_options_page')) {
    $themeSetup['options'] = get_fields('themes-settings');
  }
}
