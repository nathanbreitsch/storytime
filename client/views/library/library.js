Template.library.helpers({
    'stories': function() {
        var stories = Stories.find({},{transform:function(story){
            story.inBookshelf = true;
            return story;
        }
        });
        
        return stories;
    }});


Template.storyItem.events({
    'click #btn-to-desk': function(e, t) {
        e.preventDefault();
        storyId = t.data._id;
        Router.go('desk', {_id: storyId});
    },
    'click .btn-add-to-bookshelf': function(e, t) {
        alert("hello");
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
