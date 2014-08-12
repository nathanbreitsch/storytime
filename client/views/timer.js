Template.timer.seconds = function(){
	var seconds = Session.get("seconds");
	if(seconds < 10){
		seconds = "0" + seconds;
	}
	return seconds;
}

Template.timer.voteMinutes = function(){
	return Session.get("voteMinutes");
}

Template.timer.submitMinutes = function(){
	return Session.get("submitMinutes");
}

Template.timer.voteSeconds = function(){
	var seconds = Session.get("voteSeconds");
	if(seconds < 10){
		seconds = "0" + seconds;
	}
	return seconds;
}

Template.timer.submitSeconds = function(){
	var seconds = Session.get("submitSeconds");
	if(seconds < 0){
		seconds = 0;
	}
	if(seconds < 10){
		seconds = "0" + seconds;
	}
	return seconds;
}