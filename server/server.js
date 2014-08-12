Sentences.remove({});
Meteor.methods({
	getServerTime: function () {
		/*var _time = (new Date).getTime();  //leaving here for evan's project, to be erased
		var seconds = _time.getSeconds();
		var minutes = _time.getMinutes();
		minutes = minutes % 2;
		seconds = seconds % 60;
		if(minutes == 1 && seconds == 0 && false){//yes, 1 for some reason
			var topSentence = Sentences.findOne({},{sort:{score:-1}});
			console.log(topSentence.sentence);
			Sentences.remove({});
			Story.insert({"sentence":topSentence.sentence});
			return "0";
		}
		return _time;*/
	},
	getTime: function(){
		console.log("server call");
		return (new Date).getTime();
		
	}
});



