Template.login.events({
  'submit #login-form': function(e, t) {
    e.preventDefault();
    var email =  t.find('#email').value;
    var password = t.find('#password').value;
    $('#email-help').text('');
    $('#password-help').text('');
    if(email === '') {
      $('#email-help').text('invalid email');
    } else if(password === '') {
      $('#password-help').text('invalid password');
    } else {
      Meteor.loginWithPassword(email, password, function(error) {
        if(Meteor.user() !== null) {
            Router.go('library');
        } else {
            $('#error-msg').text('error logging in user: ' + error.message + '; ' + error.details);
        }
      });
      // add spin icon when loggin in
      $('#error-msg').append('<i class="fa fa-spinner fa-spin fa-4x"></i>');
    }
    return false;
  }
});
