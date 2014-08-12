// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

VOTE_TIME = 120000;//120 seconds
SUBMIT_TIME = 60000;//60 seconds

Meteor.startup(function() {
    /* tells client to query server time every second */
	setInterval(//delete once evan finishes his assignment
	    function() {
            Meteor.call("getServerTime",
            function(error, result) {
                Session.set("time", result); 
            });
        },
        1000);
    /* set submit action to submit sentences */
    var submit = document.getElementById("submit");
    submit.addEventListener('click',
            function() {
                var textbox = document.getElementById("textbox");
                var sentence = textbox.value;
                Sentences.insert({"sentence": sentence, "score": 0});
                textbox.value = "";
            },
        false);
    
    
    //timer code
    	
    	
    	
    setServerOffset();

	setInterval(function updateDisplayTime(){
		setDisplayTime();
	}, 1000);
    	
	
    
    
    });



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
	var voteTimeRemaining = VOTE_TIME - adjustedLocal % VOTE_TIME;
	var submitTimeRemaining = voteTimeRemaining + SUBMIT_TIME - VOTE_TIME;
	var voteMinutes = Math.floor(voteTimeRemaining / (1000 * 60));
	var voteSeconds = Math.floor(voteTimeRemaining / (1000)) % 60;
	var submitMinutes = Math.floor(submitTimeRemaining / (1000*60));
	var submitSeconds = Math.floor(submitTimeRemaining / 1000 % 60)%60;
	if (submitMinutes < 0){
		submitMinutes = 0;
	}
	
	
	Session.set("voteSeconds", voteSeconds);
	Session.set("submitSeconds", submitSeconds);
	Session.set("voteMinutes", voteMinutes);
	Session.set("submitMinutes", submitMinutes);
}





