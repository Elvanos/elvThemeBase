<?php

function removeCommentsFromAdmin() {

	function removeCommentsFromAdmin_inner() {
		remove_menu_page('edit-comments.php');
	}

	add_action('admin_menu', 'removeCommentsFromAdmin_inner');
}
