Template.desk.helpers({

  /*title: function() {
    return Session.get('currentStory').title;
  }*/

});

Template.desk.created = function() {
  console.log('desk created: this is: ' + this.data);
  Session.set('activePosition', this.front); 
};
