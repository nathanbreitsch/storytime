Meteor.publish("stories", function() {
  console.log('subscribe stories');
  return Stories.find({});
});

Meteor.publish("fragments", function(storyId) {
  console.log('subscribe fragments');
  return Fragments.find({storyId: storyId});
});

Meteor.publish("profiles", function() {
  return Profiles.find({});
});

Meteor.publish("milestones", function(){
    return Milestones.find({});   
});