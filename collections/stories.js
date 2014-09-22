Stories = new Meteor.Collection("stories");

Meteor.methods({

  createStory: function(storyAttributes) {
    var user = Meteor.user();
    var story = _.extend(_.pick(storyAttributes, 'title', 'description'), {
      creatorId: user._id,
      created: new Date().getTime(),
      front: 1
    });
    var storyId = Stories.insert(story);
    createDefaultMilestoneDoc(storyId);
    return storyId;
  },

  advanceStory: function(params) {
    var storyId = params.story._id;//current story
    var front = params.story.front;
    var position = params.position;//current position
    //all frags at position, decending by vote
    var cursor = Fragments.find({storyId: storyId, position: position}, {sort: {votes: -1}});
    if (cursor.count() > 0) {
        var fragments = cursor.fetch();
        var ids = _.pluck(fragments, "_id");
        //make visible fragment invisible
        Fragments.update({position:position, visible:true}, {$set: {visible: false}});
        //make top visible
        Fragments.update(fragments[0]._id, {$set: {visible: true}});
        if(position == front){
            Stories.update({_id: storyId}, {$inc:{front:1}});//increment round number
        }
    } else {
    }
  },
    


});
