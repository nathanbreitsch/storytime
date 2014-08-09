// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Meteor.startup(function () {
	setInterval(function () {
	Meteor.call("getServerTime", function (error, result) {
	Session.set("time", result);
});
}, 1000);
});

Template.timer.time = function(){
var _time = Session.get("time");
var minutes = _time.getMinutes();
		var seconds = (60-_time.getSeconds());
		if(seconds == 60){
			seconds = 0;
			minutes +=1;
		}
		
		var voteMin = minutes % 2;
		var submitMin = voteMin-1;
		
		if(voteMin == 0 && seconds == 0){}
		
		if(seconds < 10){seconds = "0" + seconds;}
		submitSec = seconds;
		if(submitMin < 0){
			submitMin = 0;
			submitSec = 0;
		}
		var str = voteMin + ":" + seconds + " to vote \t" + submitMin + ":" + submitSec + " to submit.";
		return str;
};



Template.story.story = function(){
return Story.find({});
};

Template.top.sentences = function(){
return Sentences.find({},{sort:{score:-1}});
};

Template.top.events({
'click .upvote': function(){
//upvote logic
Sentences.update(this._id, {$inc:{score:1}});
},

'click .downvote': function(){
//downvote logic
Sentences.update(this._id, {$inc:{score:-1}});
}});



