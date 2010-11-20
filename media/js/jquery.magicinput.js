/*
 * Magic login - jQuery plugin
 * written by eighty4	
 * http://stenehall.github.com/jQuery.magiclogin/
 *
 * Licensed under something...
 *
 *
 * Usage:
 *
 * Initialize the script with some options.
 ***********************************

 jQuery(document).ready(function() 
 {
	jQuery('#container').magicLogin({

	});
 });

 <div id="container">
	<input id="username" type="text" value="Username">
	<input id="password" type="password" value="Password">
	<input class="submit" type="submit" value="Sign In">
 </div>

 *
 * No idea if it works on any browser except FF3.6 on OS X 10.6
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */

/*global document, jQuery */

jQuery.fn.magicLogin = function (options) {

	// default configuration properties
	var defaults = {
		password: '#password',
		passwordClear: 'password-clear',
		username: '#username',
		activeClass: 'magic-logic',
		passwordSize: 30,
		usernameSize: 30,
		offset: 1,
		that: this
	},
	username, password, passwordClear, len,
	update_size = function (offset)
	{
		offset = typeof(offset) !== 'undefined' ? offset : options.offset;
		len = username.val().length + offset;
		if (len === 0)
		{
			len = 1;
		}
		else if (len > options.passwordSize)
		{
			len = options.passwordSize;
		}
		if (username.attr("size") !== len)
		{
			username.attr('size', len);
			var pw_len = (options.passwordSize + options.usernameSize) - len;
			passwordClear.attr('size', pw_len);
			password.attr('size', pw_len);
		}
	};

	options = jQuery.extend(defaults, options);
	// Makes it easier to style with/without javascript enabled
	jQuery(this).addClass(options.activeClass);
	// For easier access
	username = jQuery(options.username);
	password = jQuery(options.password);
	options.defaultUsername = username.attr('value');

	// Our extra input field that displays our password copy from the start
	passwordClear = jQuery('<input id="' + options.passwordClear + '" type="input" value="' + password.attr('value') + '">').insertAfter(password);
	password.hide();

	update_size(0);

	username.keydown(function (event)
	{
		// Catch the first white-space or tab and change focus.
		if (event.keyCode === 32 || event.keyCode === 9)
		{
			passwordClear.focus();
			return false;
		}
		else
		{
			update_size(1);
		}
	});

	/*
	 * Feels nasty to update the sizes twice but this is the only way I could think of.
	 * Without it the username size will not update when cleared
	 */
	username.keyup(function (event)
	{
		update_size(0);
	});

	username.focus(function ()
	{
		if (username.attr('value') === options.defaultUsername)
		{
			username.attr('value', '');
			update_size();
		}
	});

	username.blur(function ()
	{
		if (username.attr('value') === '')
		{
			username.attr('value', options.defaultUsername);
			update_size(0);
		}
	});

	passwordClear.focus(function ()
	{
		update_size(0);
		passwordClear.hide();
		password.show();
		password.focus().select();
	});
};