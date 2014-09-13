Template.interaction.helpers({

  fragments: function() {
      var currentStory = Session.get("currentStory");
    return Fragments.find({'storyId': this._id, 'position': currentStory.front}, {sort: {votes: -1}}).fetch();
  },

});

Template.interaction.events({
    
    
  'click #fragment-submit-btn': function(e, t) {
    e.preventDefault();
      var currentStory = Session.get("currentStory");
      //alert(currentStory);
    var text = t.find('#fragment-submit-text').value;
    var story = this;
    //alert(this.front);
     
    Meteor.call('addFragment', {text: text, storyId: story._id, position: currentStory.front}, 
    function(err, id) {
        if (err) {
          console.log('fragment submit error: ' + err.message);
          $('#submit-help').text('error submitting fragment: ' + err.message);
        } else {
          console.log('fragment submit: ' + id);
        }
      });
    },

  'click #story-advance-btn': function(e, t) {
    e.preventDefault();
      var currentStory = Session.get("currentStory");
    Meteor.call('advanceStory', {story: this, position: currentStory.front}, 
    function(err, res) {
      console.log('advance return');
    });
    
  },
  
  'click .upvote': function(e, t) {
      e.preventDefault();
      console.log('clicked');
      Fragments.update(e.target.id, {'$inc': {'votes': 1}});
    },

});


/*
Template.interaction.created = function(){
    alert(this._id);
    var cursor = Stories.find({_id: this._id});
    Session.set('currentStory',this);
    cursor.observe({
        changed: function(newDoc, oldDoc){
            alert(newDoc);
            Session.set('currentStory', newDoc);
        }
    });
};
*/


