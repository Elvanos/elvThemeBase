<?php 

if( function_exists('acf_add_local_field_group') ):

acf_add_local_field_group(array(
	'key' => 'group_61d104738ff5c',
	'title' => 'Element - Special site interactions/Common link',
	'fields' => array(
		array(
			'key' => 'field_61d106f58202c',
			'label' => 'Button type/Link',
			'name' => 'interactionType',
			'aria-label' => '',
			'type' => 'radio',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array(
				'width' => '50',
				'class' => '',
				'id' => '',
			),
			'acfe_save_meta' => 0,
			'choices' => array(
				'link' => 'Normal link',
				'special' => 'Special interaction',
				'none' => 'Nothing/Disabled',
			),
			'default_value' => 'link',
			'return_format' => 'value',
			'allow_null' => 0,
			'other_choice' => 0,
			'layout' => 'horizontal',
			'save_other_choice' => 0,
		),
		array(
			'key' => 'field_61d107a88202d',
			'label' => 'Normal link',
			'name' => 'normalLink',
			'aria-label' => '',
			'type' => 'acfe_advanced_link',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => array(
				array(
					array(
						'field' => 'field_61d106f58202c',
						'operator' => '==',
						'value' => 'link',
					),
				),
			),
			'wrapper' => array(
				'width' => '50',
				'class' => '',
				'id' => '',
			),
			'acfe_save_meta' => 0,
			'post_type' => '',
			'taxonomy' => '',
		),
		array(
			'key' => 'field_61d104e651338',
			'label' => 'Text description of the special interaction',
			'name' => 'specialInteractionText',
			'aria-label' => '',
			'type' => 'text',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => array(
				array(
					array(
						'field' => 'field_61d106f58202c',
						'operator' => '==',
						'value' => 'special',
					),
				),
			),
			'wrapper' => array(
				'width' => '50',
				'class' => '',
				'id' => '',
			),
			'acfe_save_meta' => 0,
			'default_value' => '',
			'maxlength' => '',
			'placeholder' => '',
			'prepend' => '',
			'append' => '',
		),
		array(
			'key' => 'field_61d1049b51336',
			'label' => 'Special interactions list',
			'name' => 'specialSiteInteractions',
			'aria-label' => '',
			'type' => 'repeater',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => array(
				array(
					array(
						'field' => 'field_61d106f58202c',
						'operator' => '==',
						'value' => 'special',
					),
				),
			),
			'wrapper' => array(
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'acfe_save_meta' => 0,
			'acfe_repeater_stylised_button' => 1,
			'layout' => 'block',
			'pagination' => 0,
			'min' => 0,
			'max' => 0,
			'collapsed' => '',
			'button_label' => 'Add interaction',
			'rows_per_page' => 20,
			'sub_fields' => array(
				array(
					'key' => 'field_61d105395133a',
					'label' => 'Special interaction type',
					'name' => 'actionType',
					'aria-label' => '',
					'type' => 'radio',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array(
						'width' => '50',
						'class' => '',
						'id' => '',
					),
					'acfe_save_meta' => 0,
					'choices' => array(
						'setText' => 'Autofill text',
						'setCheckbox' => 'Autocheck checkbox',
						'smoothScroll' => 'Smooth scroll',
					),
					'default_value' => 'setText',
					'return_format' => 'value',
					'allow_null' => 0,
					'other_choice' => 0,
					'layout' => 'horizontal',
					'save_other_choice' => 0,
					'parent_repeater' => 'field_61d1049b51336',
				),
				array(
					'key' => 'field_61d106025133b',
					'label' => 'Interaction selector (via value)',
					'name' => 'selectorValue',
					'aria-label' => '',
					'type' => 'text',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => array(
						array(
							array(
								'field' => 'field_61d105395133a',
								'operator' => '==',
								'value' => 'setCheckbox',
							),
						),
					),
					'wrapper' => array(
						'width' => '50',
						'class' => '',
						'id' => '',
					),
					'acfe_save_meta' => 0,
					'default_value' => '',
					'maxlength' => '',
					'placeholder' => '',
					'prepend' => '',
					'append' => '',
					'parent_repeater' => 'field_61d1049b51336',
				),
				array(
					'key' => 'field_61d1050651339',
					'label' => 'Interaction selector ( via name)',
					'name' => 'selectorName',
					'aria-label' => '',
					'type' => 'text',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => array(
						array(
							array(
								'field' => 'field_61d105395133a',
								'operator' => '==',
								'value' => 'setText',
							),
						),
					),
					'wrapper' => array(
						'width' => '50',
						'class' => '',
						'id' => '',
					),
					'acfe_save_meta' => 0,
					'default_value' => '',
					'maxlength' => '',
					'placeholder' => '',
					'prepend' => '',
					'append' => '',
					'parent_repeater' => 'field_61d1049b51336',
				),
				array(
					'key' => 'field_61fc70b5b2e62',
					'label' => 'Interaction selector (jQuery selector)',
					'name' => 'selectorJquery',
					'aria-label' => '',
					'type' => 'text',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => array(
						array(
							array(
								'field' => 'field_61d105395133a',
								'operator' => '==',
								'value' => 'smoothScroll',
							),
						),
					),
					'wrapper' => array(
						'width' => '50',
						'class' => '',
						'id' => '',
					),
					'acfe_save_meta' => 0,
					'default_value' => '',
					'maxlength' => '',
					'placeholder' => '',
					'prepend' => '',
					'append' => '',
					'parent_repeater' => 'field_61d1049b51336',
				),
				array(
					'key' => 'field_61d1065d5133c',
					'label' => 'Text content to fill',
					'name' => 'textToFill',
					'aria-label' => '',
					'type' => 'text',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => array(
						array(
							array(
								'field' => 'field_61d105395133a',
								'operator' => '==',
								'value' => 'setText',
							),
						),
					),
					'wrapper' => array(
						'width' => '100',
						'class' => '',
						'id' => '',
					),
					'acfe_save_meta' => 0,
					'default_value' => '',
					'maxlength' => '',
					'placeholder' => '',
					'prepend' => '',
					'append' => '',
					'parent_repeater' => 'field_61d1049b51336',
				),
			),
		),
	),
	'location' => array(
		array(
			array(
				'param' => 'current_user',
				'operator' => '==',
				'value' => 'viewing_front',
			),
		),
	),
	'menu_order' => 0,
	'position' => 'normal',
	'style' => 'default',
	'label_placement' => 'left',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
	'active' => true,
	'description' => '',
	'show_in_rest' => 0,
	'acfe_display_title' => 'Special interaction/Normal Link',
	'acfe_autosync' => array(
		0 => 'php',
	),
	'acfe_form' => 0,
	'acfe_meta' => '',
	'acfe_note' => '',
	'modified' => 1682625952,
));

endif;