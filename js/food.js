$(function() {
    $('.kc-wrap').KillerCarousel({
        // Width of carousel.
        width: 800, 
        // Item spacing in 3D (modern browsers) modes.
        spacing3d: 120,    
        // Item spacing in 2D (old browsers) modes. 
        spacing2d: 120,
        showShadow:true,
        showReflection: true,
        infiniteLoop: true
    });
});
$(function() {
	$('.fancybox').fancybox();
});
var licBannerRemoved = false;
var removeLicBanner = function() {
	if ($("#food-photo-carousel > div").filter(":odd")) {
		$("#food-photo-carousel > div").filter(":odd").remove();
	}
};
$(window).load( function() {
	$(window).mousemove(removeLicBanner);
});
