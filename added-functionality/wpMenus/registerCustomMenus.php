<?php

function registerMenus() {

  global $themeSetup;

  register_nav_menu('headerMenu_main', __('Header menu - Main', $themeSetup['projectName'] . 'Theme'));
}
