Template.top.sentences = function() {
    return Sentences.find({}, {sort: {score: -1}});
};

Template.top.events(
    {'click .upvote': function() {
            //upvote logic
            Sentences.update(this._id, {$inc: {score: 1}});
        },
        'click .downvote': function(){
        //downvote logic
        Sentences.update(this._id, {$inc:{score:-1}});
        }
    });