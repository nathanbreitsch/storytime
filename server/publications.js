Meteor.publish("stories", function() {
  console.log('subscribe stories');
  return Stories.find({});
});

Meteor.publish("fragments", function(storyId) {
  console.log('subscribe fragments');
  return Fragments.find({storyId: storyId});
});

Meteor.publish("userProfile", function() {
  console.log('subscribe user profile');
  var user = Meteor.user();
  if (user) {
    return Profiles.find(user.profileId);
  }
  return null;
});
