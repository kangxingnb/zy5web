$(window).load(function() {
	$('.flexslider').flexslider({
		animation: "slide",
		controlNav: false,
		slideshowSpeed: 6000,
		animationSpeed: 800
	});
	
	// load fancybox
	$('.fancybox').fancybox();
});