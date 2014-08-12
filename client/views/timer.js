//function clientTime(){
//	return (new Date).getTime();
//}


function getClientTime(){
	return (new Date).getTime();
}

function setServerOffset(){
	Meteor.call("getTime", function(error, result){
		//milliseconds
		Session.set("serverTimeOffset", result - getClientTime());
	});
}

function setDisplayTime(){
	var offset = Session.get("serverTimeOffset");
	var adjustedLocal = getClientTime() + offset;
	var voteMinutes = Math.floor(adjustedLocal / (1000 * 60))%2;
	var submitMinutes = voteMinutes - 1;
	if (submitMinutes < 0){
		submitMinutes = 0;
	}
	var seconds = 59 - Math.floor(adjustedLocal / 1000)%60;
	
	Session.set("seconds", seconds);
	Session.set("voteMinutes", voteMinutes);
	Session.set("submitMinutes", submitMinutes);
}

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

setServerOffset();

setInterval(function updateDisplayTime(){
	setDisplayTime();
}, 1000);

/*
Template.timer.time = function() {
    var serverTime = Session.get("time");

    //var serverTime = clientTime() + Session.get("offset");

    var minutes = serverTime.getMinutes();
    var seconds = (60 - serverTime.getSeconds());
    if(seconds == 60) {
        seconds = 0;
        minutes +=1;
    }
		
    var voteMin = minutes % 2;
    var submitMin = voteMin - 1;
		
    if(voteMin == 0 && seconds == 0) {}
		
    if(seconds < 10) {
        seconds = "0" + seconds;
    }
    submitSec = seconds;
    if(submitMin < 0){
        submitMin = 0;
        submitSec = 0;
    }
    var str = voteMin + ":" + seconds + " to vote \t" + submitMin + ":" + submitSec + " to submit.";
    return str;
};*/