Sentences.remove({});
Meteor.methods({
	getServerTime: function () {
		var _time = (new Date);
		var seconds = _time.getSeconds();
		var minutes = _time.getMinutes();
		minutes = minutes % 2;
		seconds = seconds % 60;
		if(minutes == 1 && seconds == 0){//yes, 1 for some reason
			var topSentence = Sentences.findOne({},{sort:{score:-1}});
			console.log(topSentence.sentence);
			Sentences.remove({});
			Story.insert({"sentence":topSentence.sentence});
			return "0";
		}
		return _time;
	}
});



