<?php

function addAcfLocal() {
  // Define path and URL to the ACF plugin.
  define('MY_ACF_PATH', get_stylesheet_directory() . '/_plugins-and-libs/acf/');
  define('MY_ACF_URL', get_stylesheet_directory_uri() . '/_plugins-and-libs/acf/');

  // Include the ACF plugin.
  include_once(MY_ACF_PATH . 'acf.php');

  // Customize the url setting to fix incorrect asset URLs.
  add_filter('acf/settings/url', 'my_acf_settings_url');
  function my_acf_settings_url($url) {
    return MY_ACF_URL;
  }
}
