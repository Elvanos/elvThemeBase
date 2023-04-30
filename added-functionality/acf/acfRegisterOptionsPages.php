<?php
function acfRegisterOptionsPages() {

  global $themeSetup;

  if (function_exists('acf_add_options_page')) {
    acf_add_options_page(array(
      'page_title' => __('Theme Settings', $themeSetup['projectName'] . 'Theme'),
      'menu_title' => __('Theme Settings', $themeSetup['projectName'] . 'Theme'),
      'menu_slug' => 'themes-settings',
      'capability' => 'switch_themes',
      'position' => '59',
      'parent_slug' => '',
      'icon_url' => 'dashicons-welcome-widgets-menus',
      'redirect' => true,
      'post_id' => 'themes-settings',
      'autoload' => true,
      'update_button' => __('Save changes', $themeSetup['projectName'] . 'Theme'),
      'updated_message' => __('Changes successfully saved', $themeSetup['projectName'] . 'Theme'),
    ));
  }
}
