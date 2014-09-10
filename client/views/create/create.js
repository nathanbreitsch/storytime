Template.create.events({
  'click #create-story': function(e, t) {
    e.preventDefault();
    var title = t.find('#story-title').value,
        description = t.find('#story-description').value;
      console.log(title);

    Meteor.call('createStory',
      {title: title, description: description},
      function(error) {
        if(error) {
          console.log(error.details);
          //Router.go('create');
          $('#error-msg').append('<p>' + 'error creating story: ' + error.message + '; ' + error.details + '</p>');
          //t.find('#error-msg').text(error.details);
          // TODO better error handling
        } else {
          Router.go('bookshelf');
        }
      });
    $('#error-msg').append('<i class="fa fa-spinner fa-spin fa-4x"></i>');
  }
});

