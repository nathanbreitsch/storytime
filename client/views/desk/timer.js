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
        return Session.get("milestones").endVote;
    },

});
storyId = this._id;

Template.timer.created = function(){
    //set up async shit
    var clientTimer = new ClientTimer();
    Tracker.autorun(function(){
        var milestones = Milestones.findOne({storyId:Session.get("storyId")});
        Session.set("milestones", milestones);
    });
}

var ClientTimer = function(serverMilestones){
    //assume no network delay or sever offset for now
    
    
};