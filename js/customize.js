var checkboxModels = {
	"dest-checkbox1": [".losangeles", ".sanfrancisco", ".lasvegas"],
	"dest-checkbox2": [".orlando", ".miami"],
	"dest-checkbox3": [".newyork", ".washingtondc"],
	"dest-checkbox4": [".seattle"],
	"dest-checkbox5": [".hawaii", ".caribbean", ".alaska"]
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
		tel: "",
		email: ""
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
var handleCommChange = function(curText, isTel) {
	var textVal = $(curText).val();
	if (textVal != null) {
		if (isTel) {
			answers["q8"].tel = textVal;
		}
		else {
			answers["q8"].email = textVal;
		}
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
		handleMapAnimation(curBox);
	}
};
var handleMapAnimation = function (curBox) {
	var placesForLabel = checkboxModels[$(curBox).attr("id")];
	if ($(curBox).prop("checked")) {
		placesForLabel.forEach( function(place) {
			playBounceEffect(place);
		});
	}
	else {
		placesForLabel.forEach( function(place) {
			stopBounceEffect(place);
		});
	}
};
var playBounceEffect = function (place) {
	$(place).effect('bounce', 2000);
};
var stopBounceEffect = function (place) {
	$(place).stop();
};
var sanityCheckAnswer = function (curQId) {
	if (curQId != "q1" && curQId != "q8") {
		return (answers[curQId].radioAnswer.length > 0 ||
				answers[curQId].textAnswer.length > 0 ||
				answers[curQId].checkAnswer.keyNum > 0);
	}
	else if (curQId == "q8") {
		return (answers[curQId].tel.length > 0 &&
				answers[curQId].email.length > 0);
	}
	return true;
};
var answerQuestion = function (curQId, nextQId, checkMarkId) {
	// sanity check to make sure current Q has been answered;
	// quit if check not passed
	if (!sanityCheckAnswer(curQId)) {
		$("#"+curQId+" .sanityCheck").css({ "display": "block"});
		$("#"+checkMarkId).css({ "visibility": "hidden" });
		return false;
	}
	else {
		$("#"+curQId+" .sanityCheck").css({ "display": "none"});
		$("#"+checkMarkId).css({ "visibility": "visible" });
	}
	// handle special Q1 logic
	if (curQId == "q1") {
		$("#q2").css({ "display": "none"});
	}
	if (nextQId != null) {
		// display next Q
		$("#"+nextQId).css({ "display": "block" });
		/* map-related scripts; uncomment if needed
		if (nextQId == "q2") {
			resizeMap();
		}
		*/
		// auto scroll to bottom of nextQ
		scrollView(nextQId);
	}
	return true;
};
var sanityCheckAndReport = function(curQId, checkMarkId) {
	if (answerQuestion(curQId, null, checkMarkId)) {
		report();
	}
};
var report = function() {
	var result = "";
	for (question in answers) {
		result += "Question: " + question + "; ";
		if (question != "q8") {
			result += "RadioAnswer: " + answers[question].radioAnswer + "; ";
			result += "TextAnswer: " + answers[question].textAnswer + "; ";
			result += "CheckAnswer: " + transformObjectToString(answers[question].checkAnswer) + ";";
			result += "    ";
		}
		else {
			result += "Telephone: " + answers[question].tel + "; ";
			result += "Email: " + answers[question].email + ";";
		}
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