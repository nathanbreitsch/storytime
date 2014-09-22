Milestones = new Meteor.Collection("milestones");


var createDefaultMilestoneDoc = function(storyId){
 /*Milestones.upsert({storyId:storyId},
    {$set: {
        beginVote: 'never',
        endVote: 'never',
        beginSubmit: 'never',
        endSubmit: 'never'
    }});*/
    
    Milestones.insert({
        storyId: storyId,
        beginVote: 'never',
        endVote: 'never',
        beginSubmit: 'never',
        endSubmit: 'never'
    });
}

var updateMilestones = function(storyId, milestoneDoc){
    Milestones.update({storyId:storyId},
    {$set: {
        beginVote: milestoneDoc.beginVote,
        endVote: milestoneDoc.endVote,
        beginSubmit: milestoneDoc.beginSubmit,
        endSubmit: milestoneDoc.endSubmit
    }});   
}

var beginVoteCallback = function(storyId){
    //allow votes for given story
}

var endVoteCallback = function(storyId){
    //disallow votes for given story
}

var beginSubmitCallback = function(storyId){
    //allow submissions for given story
}

var endSubmitCallback = function(storyId){
    //disallow submissions for given story
}

var refreshCallback = function(storyId){
    
}