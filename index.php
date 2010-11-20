<!DOCTYPE HTML>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>Combined username and password</title>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<script src="media/js/jquery.magicinput.js"></script>
	<link rel="stylesheet" href="media/css/style.css" />
	<script>
		jQuery(document).ready(function() 
		{
			jQuery('#container').magicLogin({
				passwordSize: 15,
				usernameSize: 15
			});

			jQuery('#container2').magicLogin({
				passwordSize: 15,
				usernameSize: 15,
				password: '#password2',
				passwordClear: 'passwordclear2',
				username: '#username2'
			});
		});
	</script>
</head>
<body>
		<article>
			<section>
				<div id="container">
					<input id="username" type="text" value="Username">
					<input id="password" type="password" value="Password">
					<input class="submit" type="submit" value="Sign In">
				</div>
			</section>
		</article>
</body>
</html>
