<?php

function addAcfExtendedLocal() {
  define('MY_ACFE_PATH', get_stylesheet_directory() . '/_plugins-and-libs/acf-extended/');
  define('MY_ACFE_URL', get_stylesheet_directory_uri() . '/_plugins-and-libs/acf-extended/');

  include_once(MY_ACFE_PATH . 'acf-extended.php');

  add_filter('acf/settings/acfe/url', 'my_acfe_settings_url');
  function my_acfe_settings_url($url) {

    return MY_ACFE_URL;
  }
}
