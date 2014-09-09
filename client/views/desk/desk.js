Template.desk.helpers({
  fragments: function() {
    console.log(this.fragments);
    return Fragments.find({_id: {$in: this.fragments}});
  },
  title: function(){
           //return this.title;
    return Session.get("currentStory").title;
  }
});

Template.fragmentDialog.events({
  'click #fragment-submit': function(e, t) {
    e.preventDefault();
    var text = t.find('#fragment-submit-text').value;
    var storyId = this._id;
    Meteor.call('submitFragment', {text: text, storyId: storyId}, function(e, id) {
        if (e !== null) {
          console.log('fragment submit error: ' + e.message);
          $('#submit-help').text('error submitting fragment: ' + e.message);
        } else {
          console.log('fragment submit: ' + id);
        }
      });
    },
});
