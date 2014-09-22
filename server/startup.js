var intervalDict = {};

var beginVoteCallback = function(storyId){
    //allow votes for given story
    console.log("beginVoting");
};

var endVoteCallback = function(storyId){
    //disallow votes for given story
    //move the story foreward
    //recalculate milestones
    console.log("endVoting");
    var milestones = calculateMilestones(storyId);
    bindTimeoutHandles(storyId, milestones);
    storeMilestones(storyId, milestones);
    
};

var beginSubmitCallback = function(storyId){
    //allow submissions for given story
    console.log("beginSubmission");
};

var endSubmitCallback = function(storyId){
    //disallow submissions for given story
    console.log("endSubmission");
};

var calculateMilestones = function(storyId){
    //calculate and return milestones
    var now = Date.now()
    var beginSubmit = 3000 + now;
    var endSubmit = 10000 + now;
    var beginVote = 6000 + now;
    var endVote = 15000 + now;
    return {
        beginSubmit: beginSubmit,
        endSubmit: endSubmit,
        beginVote: beginVote,
        endVote: endVote
    };
};

var storeMilestones = function(storyId, milestones){
    //store milestones in database
    //documents are initialized in fixtures.js
    milestones.storyId = storyId;
    Milestones.upsert({storyId:storyId}, {$set:{
        beginVote: milestones.beginVote,
        endVote: milestones.endVote,
        beginSubmit: milestones.beginSubmit,
        endSubmit: milestones.endSubmit
    }});
};

var bindTimeoutHandles = function(storyId, milestones){
    intervalDict[storyId] = {};
    intervalDict[storyId].beginVoteTimeoutHandle = Meteor.setTimeout(beginVoteCallback,milestones.beginVote - Date.now());
    intervalDict[storyId].endVoteTimeoutHandle = Meteor.setTimeout(endVoteCallback,milestones.endVote - Date.now());
    intervalDict[storyId].beginSubmitTimeoutHandle = Meteor.setTimeout(beginSubmitCallback,milestones.beginSubmit - Date.now());
    intervalDict[storyId].endSubmitTimeoutHandle = Meteor.setTimeout(endSubmitCallback,milestones.endSubmit - Date.now());
};


Meteor.startup(function() {
    //set up all the async shit for the stories 
    Stories.find({}).forEach(function(story){
        var id = story._id;
        var milestones = calculateMilestones(id);
        bindTimeoutHandles(id, milestones); //may want to switch order to account for network delay
        storeMilestones(id, milestones);
        
    });
    

    
    
    
});

