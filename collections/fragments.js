Fragments = new Meteor.Collection("fragments");

Meteor.methods({
  submitFragment: function(fragmentAttr) {
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user) {
        throw new Meteor.Error(401, 'You need to login to submit fragments!');
    }
    if (!fragmentAttr.text) {
        throw new Meteor.Error(422, 'Please write some content');
    }
    if (!fragmentAttr.storyId) {
      throw new Meteor.Error(422, 'You must add fragments to a story');
    }
    var story = Stories.findOne(fragmentAttr.storyId);
    if(!story) {
        throw new Meteor.Error(422, 'Could not find story with corresponding id');
    }
    fragment = _.extend(_.pick(fragmentAttr, 'storyId', 'text'), {
        userId: user._id,
        submitted: new Date().getTime()
    }); 
    
    // create the comment, save the id
    id = Fragments.insert(fragment);

    // update the story with the new fragment
    Stories.update(fragment.storyId, {'$addToSet': {'fragments': id}}, multi=true);

    // now create a notification, informing the users that there's a new fragment
    //createNewFragmentNotification(fragment);
    
    return id;
  },
});
