<?php
/**
 * Plugin Name:       RM Testimonials
 * Description:       RM Testimonials Block
 * Version:           0.1.0
 * Requires at least: 6.2
 * Requires PHP:      7.0
 * Author:            Ramon Magallon
 * Author URI:        https://www.ramonmagallon.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       rm-testimonials-block
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function rm_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'rm_block_init' );
