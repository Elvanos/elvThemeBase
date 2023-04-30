<?php
  function removeStylesAndPadding() {
    if (has_action( "wpcf7_init")){

      // Remove CF7 Custom styles
      wp_deregister_style( 'contact-form-7' );

      // Remove CF7 <br>s and <p>s
      add_filter('wpcf7_autop_or_not', '__return_false');
    }
  }
