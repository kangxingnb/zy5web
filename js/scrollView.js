var scrollView = function (id) {
	if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {
		$("body").stop().animate({
			scrollTop: $("#"+id).offset().top
		}, 800);
	}
	else {
		$('html,body').stop().animate({
			scrollTop: $("#"+id).offset().top
		}, 800);
	}
};