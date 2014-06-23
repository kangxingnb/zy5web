var places = [
    "Seattle",
    "SanFrancisco",
    "LosAngeles",
    "LasVegas",
    "Orlando",
    "Miami",
    "NewYork",
    "WashingtonDC",
    "Hawaii",
    "Alaska",
    "Caribbean"
];
var coords = {
	"Seattle": [47.620, -122.349, 3],
	"SanFrancisco": [37.820, -122.479, 4],
	"LosAngeles": [34.103, -118.340, 5],
	"LasVegas": [36.112, -115.177, 6],
	"Orlando": [28.418, -81.581, 9],
	"Miami": [25.779, -80.178, 8],
	"NewYork": [40.689, -74.044, 10],
	"WashingtonDC": [38.898, -77.037, 7],
	"Hawaii": [21.277, -157.829, 2],
	"Alaska": [63.070, -151.007, 1],
	"Caribbean": [21.798, -71.742, 11]
};
var images = {
	"Seattle": "./resources/img/seattle.png",
	"SanFrancisco": "./resources/img/sanfrancisco.png",
	"LosAngeles": "./resources/img/losangeles.png",
	"LasVegas": "./resources/img/lasvegas1.png",
	"Orlando": "./resources/img/orlando.png",
	"Miami": "./resources/img/miami.png",
	"NewYork": "./resources/img/newyork1.png",
	"WashingtonDC": "./resources/img/washingtondc.png",
	"Hawaii": "./resources/img/hawaii.png",
	"Alaska": "./resources/img/alaska.png",
	"Caribbean": "./resources/img/caribbean.png"
};
var cityNames = {
	"Seattle": "西雅图",
	"SanFrancisco": "旧金山",
	"LosAngeles": "洛杉矶",
	"LasVegas": "拉斯维加斯",
	"Orlando": "奥兰多",
	"Miami": "迈阿密",
	"NewYork": "纽约",
	"WashingtonDC": "华盛顿特区",
	"Hawaii": "夏威夷",
	"Alaska": "阿拉斯加",
	"Caribbean": "加勒比"
};
var checkboxModels = {
	"dest-checkbox1": ["LosAngeles", "SanFrancisco", "LasVegas"],
	"dest-checkbox2": ["Orlando", "Miami"],
	"dest-checkbox3": ["NewYork", "WashingtonDC"],
	"dest-checkbox4": ["Seattle"],
	"dest-checkbox5": ["Hawaii", "Caribbean", "Alaska"]
};
var answers = {
	"q2": {
		radioAnswer: "",
		checkAnswer: {keyNum:0},
		textAnswer: ""
	},
	"q3": {
		radioAnswer: "",
		checkAnswer: {keyNum:0},
		textAnswer: ""
	},
	"q4": {
		radioAnswer: "",
		checkAnswer: {keyNum:0},
		textAnswer: ""
	},
	"q5": {
		radioAnswer: "",
		checkAnswer: {keyNum:0},
		textAnswer: ""
	},
	"q6": {
		radioAnswer: "",
		checkAnswer: {keyNum:0},
		textAnswer: ""
	},
	"q7": {
		radioAnswer: "",
		checkAnswer: {keyNum:0},
		textAnswer: ""
	},
	"q8": {
		radioAnswer: "",
		checkAnswer: {keyNum:0},
		textAnswer: ""
	},
};
var markers = {};
var map = null;
var initMapCenter = new google.maps.LatLng(46.504, -116.209);
var initializeMap = function() {
	var mapOptions = {
	          center: initMapCenter,
	          zoom: 3,
	          mapTypeId: google.maps.MapTypeId.ROADMAP
	        };
	map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
	map.setTilt(45);
	addMarkers(map);
};
var resizeMap = function() {
	google.maps.event.trigger(map, 'resize');
	map.setCenter(initMapCenter);
};
var addMarkers = function(mapObj) {
	places.forEach( function(place) {
		 var placeMarker = new google.maps.Marker({
		     position: new google.maps.LatLng(coords[place][0], coords[place][1]),
		     map: mapObj,
		     icon: images[place],
		     title: cityNames[place],
		     zIndex: coords[place][2]
		 });
		 markers[place] = placeMarker;
	});
};
// func call to stop Google Maps Marker animation
var stopAnimation = function(marker) {
	marker.setAnimation(null);
};
// stop animation after 3000 ms
var stopAnimationWithTimeout = function(marker) {
	setTimeout( function() {
		stopAnimation(marker);
	}, 3000);
};
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
// handle radio-button/textbox/checkbox state changes
var handleRadioChange = function(curQId, essential) {
	$("#"+curQId+" label.style-radio").each( function(index) {
		var curRadio = $(this).find("input[type='radio']");
		if (curRadio.prop("checked")) {
			$(this).addClass("checked-radio");
			if (essential) {
				answers[curQId].radioAnswer = curRadio.val();
			}
		}
		else {
			$(this).removeClass("checked-radio");
		}
	});
};
var handleTextChange = function(curText, curQId, essential) {
	var textVal = $(curText).val();
	if (essential &&
			(textVal != null)) {
			answers[curQId].textAnswer = textVal;
	}
};
var handleCheckboxChange = function(curBox, curQId, essential) {
	if ($(curBox).prop("checked")) {
		$(curBox).parent("label.style-checkbox").addClass("checked-box");
		if (essential) {
			answers[curQId].checkAnswer[$(curBox).val()] = true;
			answers[curQId].checkAnswer.keyNum++;
		}
	}
	else {
		$(curBox).parent("label.style-checkbox").removeClass("checked-box");
		if (essential) {
			var textVal = $(curBox).val();
			if (textVal in answers[curQId].checkAnswer) {
				delete answers[curQId].checkAnswer[textVal];
				answers[curQId].checkAnswer.keyNum--;
			}
		}
	}
	if ($(curBox).attr("name") == "dest-option") {
		var placesForLabel = checkboxModels[$(curBox).attr("id")];
		if ($(curBox).prop("checked")) {
			placesForLabel.forEach( function(place) {
				markers[place].setAnimation(google.maps.Animation.BOUNCE);
				stopAnimationWithTimeout(markers[place]);
			});
		}
		else {
			placesForLabel.forEach( function(place) {
				stopAnimation(markers[place]);
			});
		}
	}
};
var sanityCheckAnswer = function (curQId) {
	if (curQId != "q1") {
		return (answers[curQId].radioAnswer.length > 0 ||
				answers[curQId].textAnswer.length > 0 ||
				answers[curQId].checkAnswer.keyNum > 0);
	}
	return true;
};
var answerQuestion = function (curQId, nextQId, checkMarkId) {
	// sanity check to make sure current Q has been answered;
	// quit if check not passed
	if (!sanityCheckAnswer(curQId)) {
		$("#"+curQId+" .sanityCheck").css({ "display": "block"});
		$("#"+checkMarkId).css({ "visibility": "hidden" });
		return;
	}
	else {
		$("#"+curQId+" .sanityCheck").css({ "display": "none"});
		$("#"+checkMarkId).css({ "visibility": "visible" });
	}
	// handle special Q1 logic
	if (curQId == "q1") {
		$("#q2").css({ "display": "none"});
	}
	// display next Q
	$("#"+nextQId).css({ "display": "block" });
	if (nextQId == "q2") {
		resizeMap();
	}
	// auto scroll to bottom of nextQ
	scrollView(nextQId);
};
var report = function() {
	var result = "";
	for (question in answers) {
		result += "Question: " + question + "; ";
		result += "RadioAnswer: " + answers[question].radioAnswer + "; ";
		result += "TextAnswer: " + answers[question].textAnswer + "; ";
		result += "CheckAnswer: " + transformObjectToString(answers[question].checkAnswer) + ";";
		result += "    ";
	}
	alert(result);
};
var transformObjectToString = function (obj) {
	var result = "";
	for (key in obj) {
		result += "Key: " + key + ", Value: " + obj[key] + "; ";
	}
	return result;
};