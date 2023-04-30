  <?php

  function removeStandardWPPosts() {
    function removeMenu() {
      remove_menu_page('edit.php');
    }

    add_action('admin_menu', 'removeMenu');

    function removeAdminBarLinks() {
      global $wp_admin_bar;
      $wp_admin_bar->remove_menu('new-post');
    }
    add_action('wp_before_admin_bar_render', 'removeAdminBarLinks');
  }

  ?>
  
  