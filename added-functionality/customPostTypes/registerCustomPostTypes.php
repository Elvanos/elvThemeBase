<?php

function registerCustomPostTypes() {

  // Blank Post type - Name as you wish
  function createPostType_() {
    global $themeSetup;

    // URL slug of the post type (Only lowercase alphanumeric characters, dashes and underscores, max 20 chars)
    $postSlug = '';

    // A bunch of labels in Czech language as a placeholder - Adjust as needed for your language
    $labels = [
      'name'                  => __('Případové studie', $themeSetup['projectName'] . 'Theme'),
      'singular_name'         => __('Případová studie', $themeSetup['projectName'] . 'Theme'),
      'menu_name'             => __('Případové studie', $themeSetup['projectName'] . 'Theme'),
      'name_admin_bar'        => __('Přidat případovou studii', $themeSetup['projectName'] . 'Theme'),
      'archives'              => __('Archivy případových studií', $themeSetup['projectName'] . 'Theme'),
      'attributes'            => __('Atributy případových studií', $themeSetup['projectName'] . 'Theme'),
      'parent_item_colon'     => __('Nadřazená případová studie', $themeSetup['projectName'] . 'Theme'),
      'all_items'             => __('Všechny případové studie', $themeSetup['projectName'] . 'Theme'),
      'add_new_item'          => __('Přidat případovou studii', $themeSetup['projectName'] . 'Theme'),
      'add_new'               => __('Přidat případovou studii', $themeSetup['projectName'] . 'Theme'),
      'new_item'              => __('Přidat případovou studii', $themeSetup['projectName'] . 'Theme'),
      'edit_item'             => __('Editovat případovou studii', $themeSetup['projectName'] . 'Theme'),
      'update_item'           => __('Aktualizovat případovou studii', $themeSetup['projectName'] . 'Theme'),
      'view_item'             => __('Zobrazit případovou studii', $themeSetup['projectName'] . 'Theme'),
      'view_items'            => __('Zobrazit případové studie', $themeSetup['projectName'] . 'Theme'),
      'search_items'          => __('Hledat případové studie', $themeSetup['projectName'] . 'Theme'),
      'not_found'             => __('Nenalezeno', $themeSetup['projectName'] . 'Theme'),
      'not_found_in_trash'    => __('Nenalezeno v koši', $themeSetup['projectName'] . 'Theme'),
      'featured_image'        => __('Náhledový obrázek', $themeSetup['projectName'] . 'Theme'),
      'set_featured_image'    => __('Nastavit náhledový obrázek', $themeSetup['projectName'] . 'Theme'),
      'remove_featured_image' => __('Odstranit náhledový obrázek', $themeSetup['projectName'] . 'Theme'),
      'use_featured_image'    => __('Použít jako náhledový obrázek', $themeSetup['projectName'] . 'Theme'),
      'insert_into_item'      => __('Přidat k této případové studii', $themeSetup['projectName'] . 'Theme'),
      'uploaded_to_this_item' => __('Nahrát k této případové studii', $themeSetup['projectName'] . 'Theme'),
      'items_list'            => __('Seznam případových studií', $themeSetup['projectName'] . 'Theme'),
      'items_list_navigation' => __('Navigace seznamu případových studií', $themeSetup['projectName'] . 'Theme'),
      'filter_items_list'     => __('Filtrovat seznam případových studií', $themeSetup['projectName'] . 'Theme'),
    ];
    $args = [
      'label'               => __('Případové studie', $themeSetup['projectName'] . 'Theme'),
      'description'         => __('Seznam případových studií', $themeSetup['projectName'] . 'Theme'),
      'labels'              => $labels,
      'rewrite'             => ['slug' => $postSlug],
      // List of features the post supports; can be found here: https://developer.wordpress.org/reference/functions/register_post_type/
      'supports'            => [
        'title',
        'page-attributes'
      ],
      // "true" for sub-post support (like Pages in WP), "false" for behavioer like Posts in WP
      'hierarchical'        => false,
      'public'              => true,
      'show_ui'             => true,
      'show_in_menu'        => true,
      // List of icons can be found here: https://developer.wordpress.org/resource/dashicons/
      'menu_icon'           => 'dashicons-pressthis',
      'menu_position'       => 20,
      'show_in_admin_bar'   => true,
      'show_in_nav_menus'   => true,
      'can_export'          => true,
      'has_archive'         => false,
      'exclude_from_search' => true,
      'publicly_queryable'  => true,
    ];
    register_post_type($postSlug, $args);
  }

  // Register Post type on WP Init - Rename based on the function name above
  //add_action('init', 'createPostType_', 2);

}
