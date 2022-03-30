$(document).ready(function () {
	var $WIN 			= $(window);
	var $Navbar 	= $('#Navbar');
	var $Navbtn		= $Navbar.find('button');
	var $NavLink	= $('#NavbarLinks');

	const e 		= 'click';
	const h 		= 'height';
	const bdb		= 'border-bottom';

	const INTRO 		= '#Intro';
	const INTROIMG	= '#Img-Intro';
	const MAP				= '#Map';	

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

	// Page load 
	var preload = function () {
		var titleStyle = 
			'top: 50%; transform: translateY(-50%); font-size: 3rem; letter-spacing: 10px;';
  		var title = '獻給所有為自由<br/>和平奮鬥的每一個你';
  		var blockTitle = `<h1 style='${titleStyle}'>${title}</h1>`;

		$.blockUI({
			css: {
			    border: 'none',
			    padding: '2rem',
			    backgroundColor: '#000000',
			    color: '#FFFFFF',
			    fontSize: '2rem',
			    letterSpacing: '5px',
			    width: '100%',
			    height: '100%',
			    left: '0%',
			    top: '0%',
			    margin: 0,
			    padding: 0
			},
			message: blockTitle,
			onBlock: () => $('body').css('overflow', 'hidden')
		});

		setTimeout(function () {
			$.unblockUI({
				onUnblock: () => $('body').css('overflow', '')
			});
		}, 4000);
	};


	var introTween = TweenMax.to(INTROIMG, 1, {
		css: {opacity: 1},
		ease: "none"
	});

	var mapTween = TweenMax.to(MAP, 1, {
		css: {backgroundSize: "200%"},
		ease: Power1.out
	});

	// init controller
	var scrollController = new ScrollMagic.Controller();
	// Intro image Effect
	var IntroScene = new ScrollMagic.Scene({
		triggerElement: INTRO,
		triggerHoot: "onEnter"
	}).setTween(introTween);
	// Map Effect
	var MapScene = new ScrollMagic.Scene({
		triggerElement: MAP,
		triggerHoot: "onEnter"
	}).setTween(mapTween);

	scrollController.addScene([IntroScene, MapScene]);

	// init animation effect 
	var wow = new WOW();
	wow.init();

	$WIN.scroll(toggleNavbar);
	$WIN.on('load', preload);
});