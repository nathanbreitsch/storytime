Template.timer.helpers({
    timeToSubmit: function(){
        return Session.get("timeToSubmit");
    },
    
    timeToVote: function(){
        return Session.get("timeToVote");
    }

});
storyId = this._id;

Template.timer.created = function(){
    //set up async shit
    var timer = new ClientTimer();
    Tracker.autorun(function(){
        var milestones = Milestones.findOne({storyId:Session.get("storyId")});
        timer.setMilestones(milestones);
    });
};

var ClientTimer = function(serverMilestones){
    //assume no network delay or sever offset for now
    this.beginSubmitTimeoutHandle = null;
    this.endSubmitTimeoutHandle = null;
    this.beginVoteTimeoutHandle = null;
    this.endVoteTimeoutHandle = null;
    this.delay = null;
    this.oneSecondIntervalHandle = null; //increments timer
    this.secondsLeftUntilBeginVote = 0;
    this.secondsLeftUntilEndVote = 0;
    this.secondsLeftUntilBeginSubmit = 0;
    this.secondsLeftUntilEndSubmit = 0;
    
};
ClientTimer.prototype.cancelTimeouts = function(){
    Meteor.clearTimeout(this.beginSubmitTimeoutHandle);
    Meteor.clearTimeout(this.endSubmitTimeoutHandle);
    Meteor.clearTimeout(this.beginVoteTimeoutHandle);
    Meteor.clearTimeout(this.endVoteTimeoutHandle);
    Meteor.clearTimeout(this.delay);
    Meteor.clearInterval(this.oneSecondIntervalHandle);
};

ClientTimer.prototype.setMilestones = function(milestones){
    this.cancelTimeouts();//clear any existing timeouts
    this.milestones = milestones;
    var now = Date.now();
    //compute times
    this.secondsLeftUntilBeginVote = milestones.beginVote - now;
    this.secondsLeftUntilEndVote = milestones.endVote - now;
    this.secondsLeftUntilBeginSubmit = milestones.beginSubmit - now;
    this.secondsLeftUntilEndSubmit = milestones.endSubmit - now;
    //set timeouts
    this.beginSubmitTimeoutHandle = Meteor.setTimeout(this.beginSubmitTimeoutCallback.bind(this), 
                                                     this.secondsLeftuntilBeginSubmit);
    this.endSubmitTimeoutHandle = Meteor.setTimeout(this.endSubmitTimeoutCallback.bind(this), 
                                                     this.secondsLeftuntilEndSubmit);
    this.beginVoteTimeoutHandle = Meteor.setTimeout(this.beginVoteTimeoutCallback.bind(this), 
                                                     this.secondsLeftuntilBeginVote);
    this.endVoteTimeoutHandle = Meteor.setTimeout(this.endVoteTimeoutCallback.bind(this), 
                                                     this.secondsLeftuntilEndVote);
    //set interval
    var callback = this.oneSecondCallback.bind(this);
    //injected assumption that milestones all equal mod 1000 ms
    var residue = this.secondsLeftUntilBeginVote % 1000;
    this.delay = Meteor.setTimeout(function(){
        this.oneSecondIntervalHandle = Meteor.setInterval(callback, 1000);
    }.bind(this), residue);
    
    //set session variables
    var submitSeconds = Math.floor(this.secondsLeftUntilEndSubmit/1000);
    var voteSeconds = Math.floor(this.secondsLeftUntilEndVote/1000);
    Session.set("timeToSubmit", submitSeconds);
    Session.set("timeToVote", voteSeconds);
        
};

ClientTimer.prototype.beginSubmitTimeoutCallback = function(){
    
};

ClientTimer.prototype.endSubmitTimeoutCallback = function(){
    
};

ClientTimer.prototype.beginVoteTimeoutCallback = function(){
    
};

ClientTimer.prototype.endVoteTimeoutCallback = function(){
    
};

ClientTimer.prototype.oneSecondCallback = function(){
    var timeToSubmit = Session.get("timeToSubmit");
    if(timeToSubmit > 0){Session.set("timeToSubmit", timeToSubmit - 1);}
    var timeToVote = Session.get("timeToVote");
    if(timeToVote > 0){Session.set("timeToVote", timeToVote - 1);}
};