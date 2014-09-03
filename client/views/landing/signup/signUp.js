Template.signUp.events({
    'submit form': function(e) {
        e.preventDefault();

        username = $(e.target).find('[name=username]').val();
        email = $(e.target).find('[name=email]').val();
        password = $(e.target).find('[name=password]').val();
        verify = $(e.target).find('[name=verify]').val();

        if(password !== verify) {
            console.log('passwords do not match');
        } else if(email === '') {
            console.log('email not valid');
        } else if(username === '') {
            console.log('username not valid');
        } else {
            userProps = {
                username: username,
                email: email,
                password: password
            }
            Accounts.createUser(userProps, function(error) {
                if(error) {
                    // tell user there's an error
                    console.log('error making user');
                } else {
                    Router.go('emailSent');
                }
            });
        }
    }
});


