Profiles = new Meteor.Collection("profiles");

Meteor.methods({

  createProfile: function(profileAttributes) {
    console.log('createProfile');
    var user = Meteor.user();
    var profile = _.extend(_.pick(profileAttributes, 'name'), {
      bookshelf: [],
    });
    var profileId = Profiles.insert(profile);
    return profileId;
  },

  addToBookshelf: function(storyId) {
    console.log('addToBookshelf');
    var user = Meteor.user();
    if(!user) {
      throw new Meteor.Error(401, "You need to login to add to your bookshelf");
    }
    Profiles.update({_id: user.profile}, {$push: {bookshelf: storyId}});
  }, 
    


});
