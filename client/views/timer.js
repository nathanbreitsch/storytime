Template.timer.time = function() {
    var _time = Session.get("time");
    var minutes = _time.getMinutes();
    var seconds = (60 - _time.getSeconds());
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
};