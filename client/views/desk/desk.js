Template.desk.helpers({
  fragments: function() {
    storyId = Session.get('currentStory');
    story = Stories.findOne(storyId);
    if (!story) {
      throw new Meteor.Error(423, 'could not find story with id: ' + storyId);
    }
    return Fragments.find({_id: {$in: story.fragments}});
  },
  title: function(){
           //return this.title;
    return Session.get("currentStory").title;
  }
});

Template.fragmentDialog.events({
  'click #fragment-submit-btn': function(e, t) {
    e.preventDefault();
    var text = t.find('#fragment-submit-text').value;
    var storyId = Session.get('currentStory')._id;
    Meteor.call('submitFragment', {text: text, storyId: storyId}, function(e, id) {
        if (e) {
          console.log('fragment submit error: ' + e.message);
          $('#submit-help').text('error submitting fragment: ' + e.message);
        } else {
          console.log('fragment submit: ' + id);
        }
      });
    },
});
