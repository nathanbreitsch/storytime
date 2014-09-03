Router.configure({
        loadingTemplate: 'loading'
    });

Router.map(function() {

        this.route('login', {
                path: '/',
                layoutTemplate: 'landing'
            });

        this.route('signUp', {
                path: '/sign-up',
                layoutTemplate: 'landing'
            });

        this.route('forgotPassword', {
                path: '/forgot-password',
                layoutTemplate: 'landing'
            });

        this.route('emailSent', {
                path: '/email-sent',
                layoutTemplate: 'landing',
            });

        this.route('loading', {
                path: '/loading',
                layoutTemplate: 'landing',
            });

        this.route('home', {
                path: '/home',
                layoutTemplate: 'navigation',
            });
    
        this.route('library', {
                path: '/library',
                layoutTemplate: 'navigation',
            });

        this.route('bookshelf', {
                path: '/bookshelf',
                layoutTemplate: 'navigation',
                waitOn: function() {
                    return [Meteor.subscribe('publicStories')];
                }
            });

        this.route('profile', {
                path: '/profile',
                layoutTemplate: 'navigation',
            });

        this.route('create', {
                path: '/create',
        });

        this.route('desk', {
                path: '/desk/:_id',
                waitOn: function() {
                    console.log('param id: ' + this.params._id);
                    return [Meteor.subscribe('fragments', this.params._id),
                            Meteor.subscribe('publicStories')];
                    },
                data: function() { return Stories.findOne({_id: this.params._id}); }
            });


    });

