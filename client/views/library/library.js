Template.library.helpers({
    'stories': function() {
        return Stories.find({});
    }
});

Template.storyItem.events({
    'click #btn-to-desk': function(e, t) {
        e.preventDefault();
        storyId = t.data._id;
        Router.go('desk', {_id: storyId});
    },
    'click #btn-add-to-bookshelf': function(e, t) {
        e.preventDefault();
        storyId = t.data._id;
        Meteor.addToBookshelf(storyId, function(error) {
            if(error) {
                // TODO handle better
                console.log('error');
            }
        });
    }
});
