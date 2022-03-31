$(document).ready(function () {
	var $WIN 			= $(window);
	var $Navbar 	= $('#Navbar');
	var $Navbtn		= $Navbar.find('button');
	var $NavLink	= $('#NavbarLinks');
	var $Intro 		= $('#Intro');
	var $Map 			= $('#Map');
	var $City 		= $('#City');
	var $Place 		= $('#Place');
	var $Create		= $('#Create');
	var $Food			= $('#Food');
	var $Wine 		= $('#Wine');

	const e 			= 'click';
	// CSS Attr
	const h 			= 'height';
	const bdb			= 'border-bottom';

	// Animate Const 
	const opValue = 0.3;
	const ptValue = "150%";

	var scene_obj = {};

	// init controller
	var sceneController = new ScrollMagic.Controller();

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

		animate();
	};

	// Animate Function 
	var animate = function () {
		introAnimate();
		mapAnimate();
		cultureAnimate();

		sceneController.addScene([
			scene_obj.IntroContnet,
			scene_obj.introImg,
			scene_obj.Map
		]);

		console.log(scene_obj);
	};

	// Intro Animate
	var introAnimate 	= function () {
		let introContent 	= $Intro.find('.intro')[0];
		let introImg 			= $Intro.find('.img-intro')[0];

		var introTween 		= TweenMax.from(introContent, 1.5, {
			css: { opacity: 0, paddingTop: ptValue },
			delay: 1,
			ease: Power2.out
		});
		var introImgTween = TweenMax.from(introImg, 1.5, {
			css: { opacity: opValue, transform: "translateY(-80px)"  },
			ease: Power2.out
		});

		var introScene 		= new ScrollMagic.Scene({
			triggerElement: $Intro[0],
			triggerHook: 0.5,
			offset: -100,
			duration: 250
		}).setTween(introTween);
		var introImgScene = new ScrollMagic.Scene({
			triggerElement: $Intro[0],
			triggerHook: 0.8,
			offset: 200,
			duration: 250
		}).setTween(introImgTween);

		scene_obj.IntroContnet 	= introScene;
		scene_obj.introImg 			= introImgScene; 
	};

	// map scale animation
	var mapAnimate 		= function () {
		var mapTween = TweenMax.from($Map[0], 2, {
			css: { backgroundSize: "300%" },
			ease: Power2.out
		});
		var mapScene = new ScrollMagic.Scene({
			triggerElement: $Map[0],
			triggerHook: 0.4,
			duration: 200
		}).setTween(mapTween);

		scene_obj.Map = mapScene;
	};

	// culture animation 
	var cultureAnimate = function () {
		var cultures = [];
		cultures.push(
			$City, $Place, $Create, $Food, $Wine
		);

		$.each(cultures, (index, item) => {
			var title = $(item).find('.title')[0];
			var img 	= item.find('.img')[0];
			var intro = item.find('.intro')[0];
			var btn 	= item.find('.btn')[0];

			console.log($(item)[0]);

			var opTween = TweenMax.from([title, img], 1.5, {
				css: { opacity: opValue },
				ease: Power2.out
			});

			var temp  = '';
			switch(index) {
				case 0:
				case 2:
				case 4:
					temp = "-20%";
					break;
				case 1:
				case 3:
					temp = "20%";
					break;
			}

			var introTween = TweenMax.from(intro, 1.5, {
				css: { opacity: opValue, left: temp },
				ease: Power2.out
			});

			var btnTween 	= TweenMax.from(btn, 2, {
				css: { opacity: opValue, left: temp },
				ease: Power2.out
			});

			new ScrollMagic.Scene({
				triggerElement: $(item)[0]
			}).setTween(opTween).addTo(sceneController);

			new ScrollMagic.Scene({
				triggerElement: $(item)[0]
			}).setTween(introTween).addTo(sceneController);

			new ScrollMagic.Scene({
				triggerElement: $(item)[0],
				offset: 50
			}).setTween(btnTween).addTo(sceneController);
		});
	};

	// init animation effect 
	var wow = new WOW();
	wow.init();

	$WIN.scroll(toggleNavbar);
	$WIN.on('load', preload);
});