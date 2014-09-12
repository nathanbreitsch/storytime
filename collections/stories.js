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

  advanceStory: function(params) {
    console.log('advanceStory');
    var storyId = params.storyId;
    var position = params.position;
    console.log('storyId: ' + storyId);
    console.log('position: ' + position);
    var cursor = Fragments.find({storyId: storyId, position: position}, {sort: {votes: -1}});
    if (cursor.count() > 0) {
      var fragments = cursor.fetch();
      console.log('fragments: ' + fragments);
      console.log('max fragment votes: ' + fragments[0].votes);
      var ids = _.pluck(fragments, "_id");
      Fragments.update({_id: {$in: ids}}, {$set: {visible: true}});
      Fragments.update(fragments[0]._id, {$set: {visible: true}});
      Stories.update(storyId, {$inc: {front: 1}});
    } else {
      console.log('no available fragments');
    }
  },

});
