Fragments = new Meteor.Collection("fragments");

Meteor.methods({

  addFragment: function(fragmentAttr) {
    if (!fragmentAttr.text) {
      throw new Meteor.Error(422, 'Please write some content');
    }
    if (!fragmentAttr.storyId) {
      throw new Meteor.Error(422, 'You must add fragments to a story');
    }
    if (!fragmentAttr.position) {
      throw new Meteor.Error(422, 'Need the position');
    }
    var user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(401, 'You need to login to submit fragments!');
    }
    fragment = _.extend(_.pick(fragmentAttr, 'storyId', 'text', 'position'), {
      creatorId: user._id,
      submitted: new Date().getTime(),
      visible: false,
      votes: 0,
    }); 
    id = Fragments.insert(fragment);
    return id;
  },

});
