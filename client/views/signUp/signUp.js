Template.signUp.events({
  'submit #sign-up-form': function(e, t) {
    e.preventDefault();

    var username = t.find('#username').value,
      email = t.find('#email').value,
      password = t.find('#password').value,
      verify = t.find('#verify').value;

    $('#password-help').text('');
    $('#email-help').text('');
    $('#username-help').text('');
    $('#error-msg').text('');

    if (password !== verify) {
      console.log('passwords do not match');
      $('#password-help').text('passwords do not match: ' + password + ' ' + verify);
    } else if (email === '') {
      console.log('email not valid');
      $('#email-help').text('email not valid');
    } else if (username === '') {
      console.log('username not valid');
      $('#username-help').text('username not valid');
    } else {
      Meteor.call('createProfile', {
          name: '',
          bookshelf: []
        },
        function(err, res) {
          var profileId = res;
          if (err) {
            console.log('error making profile');
            $('#error-msg').text('error creating user: ' + err.message + '; ' + err.details);
            return;
          }
          console.log('made profile');
          Accounts.createUser({
              username: username,
              email: email,
              password: password,
              profile: profileId
            }, function(err, res) {
              if (err) {
                console.log('error making user');
                $('#error-msg').text('error creating user: ' + err.message + '; ' + err.details);
              } else {
                Router.go('emailSent');
              }
            }
          );
        }
      );
    }
    return false;
  }
});

