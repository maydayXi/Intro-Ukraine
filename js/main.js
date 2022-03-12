$(document).ready(function () {
	var $WIN 		= $(window);
	var $Navbar 	= $('#Navbar');
	var $Navbtn		= $Navbar.find('button');
	var $NavLink	= $('#NavbarLinks');

	const e 		= 'click';
	const h 		= 'height';
	const bdb		= 'border-bottom';

	// Change the navbar theme
	var toggleNavbar = function () {
		var top 	= $WIN.scrollTop();
		var height 	= $Navbar.css(h).replace('px', '');

		top > parseInt(height) ? 
			$Navbar.removeClass('bg-transparent')
				.addClass('bg-dark')
				.css(bdb, 'none') :
			$Navbar.removeClass('bg-dark')
				.addClass('bg-transparent')
				.css(bdb, '');

	};

	$WIN.scroll(toggleNavbar);
});