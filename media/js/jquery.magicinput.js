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
	update_size = function ()
	{
		len = username.val().length + options.offset;
		if (len > options.passwordSize)
		{
			len = options.passwordSize;
		}
		if (username.attr("size") !== len)
		{
			username.attr('size', len);
			passwordClear.attr('size', (options.passwordSize + options.usernameSize) - len);
			password.attr('size', (options.passwordSize + options.usernameSize) - len);
		}
	};

	options = jQuery.extend(defaults, options);
	jQuery(this).addClass(options.activeClass);
	username = jQuery(options.username);
	password = jQuery(options.password);

	passwordClear = jQuery('<input id="' + options.passwordClear + '" type="input" value="' + password.attr('value') + '">').insertAfter(password);

	len = username.val().length;
	username.attr('size', len);
	passwordClear.attr('size', (options.passwordSize + options.usernameSize) - len);
	password.attr('size', (options.passwordSize + options.usernameSize) - len);

	passwordClear.show();
	password.hide();

	username.keydown(function (event)
	{
		// Catch the first white-space and change focus
		if (event.keyCode === 32)
		{
			passwordClear.focus();
			return false;
		}
		update_size();
	});

	/*
	 * 
	 *
	 */
	passwordClear.focus(function ()
	{
		options.offset = 0;
		update_size();
		passwordClear.hide();
		password.show();
		password.focus();
		password.attr('value', '');	
		options.offset = 1;
	});
};
