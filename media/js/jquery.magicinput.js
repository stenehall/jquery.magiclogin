/*
 * Magic login - jQuery plugin
 * written by Johan Stenehall
 * http://stenehall.github.com/jQuery.magiclogin/
 *
 * Licensed under something...
 *
 *
 * Usage:
 *
 * Initialize the script with some options.
 ***********************************

 jQuery(document).ready(function() {
	jQuery('#container').magicLogin({

	});
 });

 <div id="container">
	<input id="username" type="text" value="" placeholder="Username">
	<input id="password" type="password" value="" placeholder="Password">
	<input class="submit" type="submit" value="Sign In">
 </div>

 *
 * No idea if it works on any browser except FF3.6 on OS X 10.6
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */

/*global jQuery */
/*jslint sloppy: true, vars: true */

jQuery.fn.magicLogin = function (options) {

	// default configuration properties
	var defaults = {
		password: '#password',
		username: '#username',
		activeClass: 'magic-logic',
		maxLength: 15,
		offset: 1,
		that: this
	}, username, password, len;

	var update_size = function (offset) {
		offset = offset === undefined ? options.offset : offset;
		len = username.val().length + offset;
		if (len === 0) {
			len = jQuery('#username').attr('placeholder').length;
		} else if (len > options.maxLength) {
			len = options.maxLength;
		}
		if (username.attr("size") !== len) {
			username.attr('size', len);
			var pw_len = (options.maxLength * 2) - len;
			password.attr('size', pw_len);
		}
	};

	options = jQuery.extend(defaults, options);
	// Makes it easier to style with/without javascript enabled
	jQuery(this).addClass(options.activeClass);
	// For easier access
	username = jQuery(options.username);
	password = jQuery(options.password);

	// Init the lens
	update_size(8);

	username.keydown(function (event) {
		// Catch the first white-space or tab and change focus.
		if (event.keyCode === 32 || event.keyCode === 9) {
			password.focus().select();
			return false;
		} else {
			update_size(1);
		}
	});

	/*
	 * Feels nasty to update the sizes twice but this is the only way I can think of.
	 * Without it the username size will not update when cleared
	 */
	username.keyup(function (event) {
		update_size(0);
	});

	password.keyup(function (event) {
		update_size(0);
	});

};