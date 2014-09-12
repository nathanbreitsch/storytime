Stories = new Meteor.Collection("stories");

Meteor.methods({

  createStory: function(storyAttributes) {
    console.log('createStory');
    var user = Meteor.user();
    var story = _.extend(_.pick(storyAttributes, 'title', 'description'), {
      creatorId: user._id,
      created: new Date().getTime(),
      front: 1
    });
    var storyId = Stories.insert(story);
    return storyId;
  },

  advanceStory: function(storyId) {
    console.log('advanceStory');
    Stories.update(storyId, {$inc: {front: 1}});
  },

});
