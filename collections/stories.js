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
        }
});
