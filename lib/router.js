Router.configure({
  loadingTemplate: 'loading'
});

Router.map(function() {

  this.route('home', {
    path: '/',
    layoutTemplate: 'layout'
  });

  this.route('login', {
    path: '/login',
    layoutTemplate: 'layout'
  });

  this.route('signUp', {
    path: '/sign-up',
    layoutTemplate: 'layout'
  });

  this.route('forgotPassword', {
    path: '/forgot-password',
    layoutTemplate: 'layout'
  });

  this.route('emailSent', {
    path: '/email-sent',
    layoutTemplate: 'layout',
  });

  this.route('loading', {
    path: '/loading',
    layoutTemplate: 'layout',
  });

  this.route('library', {
    path: '/library',
    layoutTemplate: 'layout',
    waitOn: function() {
        Meteor.subscribe('stories');
    },
  });

  this.route('bookshelf', {
    path: '/bookshelf',
    layoutTemplate: 'layout',
    waitOn: function() {
        return [Meteor.subscribe('publicStories')];
    }
  });

  this.route('profile', {
    path: '/profile',
    layoutTemplate: 'layout',
  });

  this.route('create', {
    path: '/create',
    layoutTemplate: 'layout',
  });

  this.route('desk', {
    path: '/desk/:_id',
    layoutTemplate: 'layout',
    waitOn: function() {
        console.log('param id: ' + this.params._id);
        // TODO this subscription is incorrect
        return [Meteor.subscribe('fragments', this.params._id)];
        },
    data: function() { 
        var currentStory = Stories.findOne({_id: this.params._id});
        Session.set('currentStory', currentStory);
      }
  });

});

