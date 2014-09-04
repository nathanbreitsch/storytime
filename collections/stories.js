Stories = new Meteor.Collection("stories");

Meteor.methods({
    createStory: function(storyAttributes) {
            console.log('createStory');
            var user = Meteor.user();
            var story = _.extend(_.pick(storyAttributes, 'title', 'description'), {
                creatorId: user._id,
                fragments: [],
                created: new Date().getTime()
            });

            var storyId = Stories.insert(story);

            return storyId;
        },
    addToBookshelf: function(storyId) {
            console.log('addToBookshelf');
            var user = Meteor.user();
            if(!user) {
                throw new Meteor.Error(401, "You need to login to add to your bookshelf");
            }
            Users.update({
                _id: user._id,
            }, {$addToSet: {onShelf: storyId}});
        }
});
