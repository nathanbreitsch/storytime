Router.configure({
        loadingTemplate: 'loading'
    });

Router.map(function() {

        this.route('landing', {
                path: '/'
            });

        this.route('home', {
                path: '/home',
                layoutTemplate: 'layout',
            });
    
        this.route('navigation', {
            path: '/navigation'
        });

        this.route('desk', {
                path: '/desk/:_id',
                layoutTemplate: 'layout',
                waitOn: function() {
                    console.log('param id: ' + this.params._id);
                    return [Meteor.subscribe('fragments', this.params._id),
                            Meteor.subscribe('publicStories')];
                    },
                data: function() { return Stories.findOne({_id: this.params._id}); }
            });

        this.route('library', {
                path: '/library',
                layoutTemplate: 'layout',
            });

        this.route('profile', {
                path: '/profile',
                layoutTemplate: 'layout',
            });

        this.route('bookshelf', {
                path: '/bookshelf',
                layoutTemplate: 'layout',
                waitOn: function() {
                    return [Meteor.subscribe('publicStories')];
                }
            });
    });

