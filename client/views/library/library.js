Template.library.helpers({

  'stories': function() {
    var stories = Stories.find({});
    return stories;
  },

});

Template.storyItem.helpers({

  'canAddToBookshelf': function() {
      
    var profile = Profiles.findOne({_id: Meteor.user().profile});
    var storyId = this._id;
    if (profile) {
      if (_.contains(profile.bookshelf, storyId)) {
        return false;
      }
      return true;
    }
    return false;
  },

});

Template.storyItem.events({

  'click .btn-to-desk': function(evt, tmp) {
    evt.preventDefault();
    storyId = tmp.data._id;
    Router.go('desk', {_id: storyId});
  },

  'click .btn-add-to-bookshelf': function(evt, tmp) {
    evt.preventDefault();
    storyId = tmp.data._id;
    Meteor.call('addToBookshelf', storyId, function(err) {
      if(err) {
        console.log('error');
      }
    });
  }
});
