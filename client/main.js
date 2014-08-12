// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

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
    
    	
    	
    	
    	
    	
	
    
    
    });









