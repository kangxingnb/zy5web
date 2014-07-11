var mouseHoverInSliderFunc = function() {
	$(this).flexslider("play");
};
var mouseHoverOutSliderFunc = function() {
	$(this).flexslider("stop");
};

$(window).load(function() {
	$('.flexslider').flexslider({
		animation: "fade",
		controlNav: false,
		slideshowSpeed: 6000,
		animationSpeed: 800
	});
	$('#hwy1-flexslider').flexslider("stop");
	$('#route-66-flexslider').flexslider("stop");
	$('#hana-flexslider').flexslider("stop");
	$('#monument-valley-flexslider').flexslider("stop");
});

$('.flexslider').hover(mouseHoverInSliderFunc, mouseHoverOutSliderFunc);