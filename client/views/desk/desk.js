Template.desk.helpers({

  /*title: function() {
    return Session.get('currentStory').title;
  }*/

});

Template.desk.created = function() {
  console.log('desk created: this is: ' + this.data);
  Session.set('activePosition', this.front); 
    Tracker.autorun(function(){
        var currentStory = Stories.findOne({_id: Session.get("storyId")});
        Session.set('currentStory', currentStory);
    });

    Tracker.autorun(function(){
        var milestones = Milestones.findOne({storyId:Session.get("storyId")});
        Session.set('milestones', milestones);
    });
};

