
storyTimers = []

function StoryTimer(storyId){
    this.storyId = storyId;
    this.beginSubmitTimeoutHandle = null;
    this.endSubmitTimeoutHandle = null;
    this.beginVoteTimeoutHandle = null;
    this.endVoteTimeoutHandle = null;
    this.milestones = {};
    //let her rip
    this.calculateMilestones();
    this.storeMilestones();
    this.bindTimeoutHandles();

}


StoryTimer.prototype.beginVoteCallback = function(){
    
    //allow votes for given story
    //console.log("beginVoting");
};

StoryTimer.prototype.endVoteCallback = function(){
    //disallow votes for given story
    //move the story foreward
    //recalculate milestones
    //console.log("endVoting");
    console.log(this.storyId);
    this.calculateMilestones();
    this.bindTimeoutHandles();
    this.storeMilestones();

};

StoryTimer.prototype.beginSubmitCallback = function(){
    //allow submissions for given story
    //console.log("beginSubmission");
};

StoryTimer.prototype.endSubmitCallback = function(){
    //disallow submissions for given story
    //console.log("endSubmission");
};

StoryTimer.prototype.calculateMilestones = function(){
    //calculate and set milestones
    var now = Date.now()
    this.milestones.beginSubmit = 3000 + now;
    this.milestones.endSubmit = 10000 + now;
    this.milestones.beginVote = 6000 + now;
    this.milestones.endVote = 15000 + now;
};

StoryTimer.prototype.storeMilestones = function(){
    //store milestones in database
    //documents are initialized in fixtures.js
    milestoneDoc = this.milestones;
    milestoneDoc.storyId = this.storyId;
    oldMilestones = Milestones.findOne({storyId:this.storyId});
    Milestones.update({storyId:this.storyId}, {$set:{
        beginVote: this.milestones.beginVote,
        endVote: this.milestones.endVote,
        beginSubmit: this.milestones.beginSubmit,
        endSubmit: this.milestones.endSubmit
    }},function(err){
        newMilestones = Milestones.findOne({storyId:this.storyId});
    });
};

StoryTimer.prototype.bindTimeoutHandles = function(){
    this.beginVoteTimoutHandle = Meteor.setTimeout(this.beginVoteCallback.bind(this),
                                this.milestones.beginVote - Date.now());
    this.endVoteTimeoutHandle = Meteor.setTimeout(this.endVoteCallback.bind(this),
                                this.milestones.endVote - Date.now());
    this.beginSubmitTimeoutHandle = Meteor.setTimeout(this.beginSubmitCallback.bind(this),
                                this.milestones.beginSubmit - Date.now());
    this.endSubmitTimeoutHandle = Meteor.setTimeout(this.endSubmitCallback.bind(this),
                                this.milestones.endSubmit - Date.now());
    //instead of subtracting date.now() we may want to calculate the median  network lag by asking clients to ping back
};

//set up all the async shit for the stories 
Stories.find({}).forEach(function(story){
    var storyTimer = new StoryTimer(story._id);
    storyTimers.push(storyTimer);
    //don't let it go out of scope


});
    