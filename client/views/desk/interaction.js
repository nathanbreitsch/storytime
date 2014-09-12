Template.interaction.helpers({
  fragments: function() {
    var activePosition = Session.get('activePosition');
    return Fragments.find({'storyId': this._id, 'position': activePosition}, {sort: {votes: -1}}).fetch();
  }
});

Template.interaction.events({

  'click #fragment-submit-btn': function(e, t) {
    e.preventDefault();
    var text = t.find('#fragment-submit-text').value;
    var story = this;
    var activePosition = Session.get('activePosition');
    console.log('active position: ' + activePosition);
    if (!activePosition) {
      activePosition = story.front;
      Session.set('activePosition', activePosition);
      console.log('active position 2: ' + activePosition);
    }
    Meteor.call('addFragment', {text: text, storyId: story._id, position: activePosition}, function(err, id) {
        if (err) {
          console.log('fragment submit error: ' + err.message);
          $('#submit-help').text('error submitting fragment: ' + err.message);
        } else {
          console.log('fragment submit: ' + id);
        }
      });
    },

  'click .upvote': function(e, t) {
      e.preventDefault();
      console.log('clicked');
      Fragments.update(e.target.id, {'$inc': {'votes': 1}});
    },

});

