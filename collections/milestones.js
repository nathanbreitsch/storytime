Milestones = new Meteor.Collection("milestones");

 createDefaultMilestoneDoc = function(storyId){
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
};

 updateMilestones = function(storyId, milestoneDoc){
    //first take care of local events

    //then update database
    Milestones.update({storyId:storyId},
    {$set: {
        beginVote: milestoneDoc.beginVote,
        endVote: milestoneDoc.endVote,
        beginSubmit: milestoneDoc.beginSubmit,
        endSubmit: milestoneDoc.endSubmit
    }});
};
