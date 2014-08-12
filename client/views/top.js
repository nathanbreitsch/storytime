Template.top.sentences = function() {
    return SubmittedFragments.find({}, {sort: {score: -1}});
};

Template.top.events(
    {'click .upvote': function() {
            //upvote logic
            SubmittedFragments.update(this._id, {$inc: {score: 1}});
    },
        'click .downvote': function(){
        //downvote logic
        SubmittedFragments.update(this._id, {$inc:{score:-1}});
    }
});