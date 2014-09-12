Router.configure({
  loadingTemplate: 'loading'
});

Router.onBeforeAction("loading");

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

  this.route('create', {
    path: '/create',
    layoutTemplate: 'layout',
  });

  this.route('account', {
    path: '/account',
    layoutTemplate: 'layout',
    waitOn: function() {
      return Meteor.subscribe('profiles');
    }
  });

  this.route('loading', {
    path: '/loading',
    layoutTemplate: 'layout',
  });

  this.route('library', {
    path: '/library',
    layoutTemplate: 'layout',
    waitOn: function() {
      return [
          Meteor.subscribe('stories'),
          Meteor.subscribe('profiles'),
        ]
      },
  });

  this.route('bookshelf', {
    path: '/bookshelf',
    layoutTemplate: 'layout',
    waitOn: function() {
      return [
          Meteor.subscribe('stories'),
          Meteor.subscribe('profiles'),
        ]
    },
    data: function() {
      var user = Meteor.user();
      return Profiles.findOne(user.profile);
    }
  });

  this.route('profile', {
    path: '/profile',
    layoutTemplate: 'layout',
    waitOn: function() {
      return [
          Meteor.subscribe('profiles'),
        ]
    },
    data: function() {
      var user = Meteor.user();
      return Profiles.find(user.profile);
    }
  });

  this.route('desk', {
    path: '/desk/:_id',
    layoutTemplate: 'layout',
    waitOn: function() {
        //console.log('param id: ' + this.params._id);
        return [
          Meteor.subscribe('stories'),
          Meteor.subscribe('fragments', {'storyId': this.params._id}),
        ];
      },
    data: function() {
        return Stories.findOne(this.params._id);
      },
    }
  );
});
