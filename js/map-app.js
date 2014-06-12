function initialize() {
	var mapOptions = {
	          center: new google.maps.LatLng(39.229, -95.034),
	          zoom: 4
	        };
	var map = new google.maps.Map($("#map-canvas").get(0),
            mapOptions);
}

$(document).ready(initialize);