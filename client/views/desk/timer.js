Template.timer.helpers({
    beginSubmit: function(){
        //alert(Session.get("milestones"));
        return Session.get("milestones").beginSubmit;    
    },
    
    beginVote: function(){
        return Session.get("milestones").beginVote;  
    },
    
    endSubmit: function(){
        return Session.get("milestones").endSubmit;  
    },
        
    endVote: function(){
        //return Session.get("milestones").endVote;
    },

});

Template.timer.created = function(){
    
}

var timer = function(){
    //assume neglegable network delay for now.
    var timeDifferential = 0;
    var submitTimeRemaining = 0;
    var voteTimeRemaining = 0;
};