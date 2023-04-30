<?php

function registerCustomCategories() {

  // Blank Tags/Categories for any post type - Name as you wish
  function createTags_() {
    global $themeSetup;

    // URL Slug of this newly created taxonomy (Only lowercase alphanumeric characters, dashes and underscores, max 32 chars)
    $taxonomySlug = '';

    // URL slug of the post type this is connected to (can be multiple)
    $postsSlugs = array('');

    // A bunch of labels in Czech language as a placeholder - Adjust as needed for your language
    $labels = array(
      'name'              => __('Tagy zaměstnanců', $themeSetup['projectName'] . 'Theme'),
      'singular_name'     => __('Tag zaměstnanců', $themeSetup['projectName'] . 'Theme'),
      'search_items'      => __('Hledat v tazích zaměstnanců', $themeSetup['projectName'] . 'Theme'),
      'all_items'         => __('Všechny tagy zaměstnanců', $themeSetup['projectName'] . 'Theme'),
      'edit_item'         => __('Editovat tag zaměstnanců', $themeSetup['projectName'] . 'Theme'),
      'update_item'       => __('Updatovat tag zaměstnanců', $themeSetup['projectName'] . 'Theme'),
      'add_new_item'      => __('Přidat tag zaměstnanců', $themeSetup['projectName'] . 'Theme'),
      'new_item_name'     => __('Přidat jméno tagu zaměstnanců', $themeSetup['projectName'] . 'Theme'),
      'menu_name'         => __('Tagy zaměstnanců', $themeSetup['projectName'] . 'Theme'),
    );

    $args = array(
      // "false" for tags, "true" for categories
      'hierarchical'      => false,
      'labels'            => $labels,
      'show_ui'           => true,
      'show_admin_column' => true,
      'query_var'         => true,
      'rewrite'           => array('slug' => $taxonomySlug),
    );

    register_taxonomy($taxonomySlug, $postsSlugs, $args);
  }

  // Register Taxonomies on WP Init - Rename based on the function name above
  //add_action('init', 'createTags_', 0);
}
