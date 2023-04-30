<?php

function removeWPEmbed() {

	function removeEmbedScript(){
		wp_deregister_script( 'wp-embed' );
	}

	//Remove the REST API endpoint.
	remove_action('rest_api_init', 'wp_oembed_register_route');

	// Turn off oEmbed auto discovery.
	add_filter( 'embed_oembed_discover', '__return_false' );

	//Don't filter oEmbed results.
	remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);

	//Remove oEmbed discovery links.
	remove_action('wp_head', 'wp_oembed_add_discovery_links');

	//Remove oEmbed JavaScript from the front-end and back-end.
	remove_action('wp_head', 'wp_oembed_add_host_js');

	add_action('wp_footer', 'removeEmbedScript');

}
