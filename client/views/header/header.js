Template.header.helpers({
    activeRouteClass: function(/* route names */) {
        var args = Array.prototype.slice.call(arguments, 0);
        args.pop();
    
        var active = _.any(args, function(name) {
            return Router.current() && Router.current().route.name === name
        });
    
        return active && 'active';
    }
});

Template.header.events({
    'click #login-button': function(e) {
        e.preventDefault();
        Router.go('login');
        return false;
    },
    'click #logout-button': function(e) {
        e.preventDefault();
        Meteor.logout();
        Router.go('home');
        return false;
    }
});
