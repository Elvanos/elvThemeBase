<?php


require_once get_template_directory() . '/_plugins-and-libs/plugin-activator/class-tgm-plugin-activation.php';
add_action('tgmpa_register', 'registerCustomRequiredRequiredpLugins');

function registerCustomRequiredRequiredpLugins() {

	global $themeSetup;

	$plugins = [];

	if ($themeSetup['pluginTweaks']['useClassicEditor']) {
		$currentPlugin = [
			'name'      => 'Classic Editor',
			'slug'      => 'classic-editor',
			'required'  => true,
			'force_activation'   => true,
			'force_deactivation' => true
		];
		array_push($plugins, $currentPlugin);
	}

	if ($themeSetup['pluginTweaks']['useLocalACF']) {
		$currentPlugin = [
			'name'      => 'ACF to REST API',
			'slug'      => 'acf-to-rest-api',
			'required'  => true,
			'force_activation'   => true,
			'force_deactivation' => true
		];
		array_push($plugins, $currentPlugin);
	}

	if ($themeSetup['pluginTweaks']['suggestTweakPlugins']) {
		$currentPlugin = [
			'name'      => 'Fluid Customizer',
			'slug'      => 'fluid-customizer',
			'required'  => false,
			'force_activation'   => true,
			'force_deactivation' => true
		];
		array_push($plugins, $currentPlugin);
	}

	if ($themeSetup['pluginTweaks']['suggestTweakPlugins']) {
		$currentPlugin = [
			'name'      => 'SVG Support',
			'slug'      => 'svg-support',
			'required'  => false,
			'force_activation'   => true,
			'force_deactivation' => false
		];
		array_push($plugins, $currentPlugin);
	}

	$config = array(
		'id'           => 'elvtheme',              // Unique ID for hashing notices for multiple instances of TGMPA.
		'default_path' => '',                      // Default absolute path to bundled plugins.
		'menu'         => 'tgmpa-install-plugins', // Menu slug.
		'parent_slug'  => 'themes.php',            // Parent menu slug.
		'capability'   => 'edit_theme_options',    // Capability needed to view plugin install page, should be a capability associated with the parent menu used.
		'has_notices'  => true,                    // Show admin notices or not.
		'dismissable'  => true,                    // If false, a user cannot dismiss the nag message.
		'dismiss_msg'  => '',                      // If 'dismissable' is false, this message will be output at top of nag.
		'is_automatic' => false,                   // Automatically activate plugins after installation or not.
		'message'      => '',                      // Message to output right before the plugins table.
	);

	tgmpa($plugins, $config);
}
