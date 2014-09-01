Fragments = new Meteor.Collection("fragments");

Meteor.methods({
    submitFragment: function(fragmentAttributes) {
        var user = Meteor.user();
        var story = Stories.findOne(fragmentAttributes.storyId);
        // ensure the user is logged in
        throw new Meteor.Error(401, 'user: ' + Meteor.user());
        if(!user) {
            throw new Meteor.Error(401, 'You need to login to submit fragments!');
        }
        if(!fragmentAttributes.body) {
            throw new Meteor.Error(422, 'Please write some content');
        }
        if(!story) {
            throw new Meteor.Error(422, 'You must add fragments to a story');
        }
        fragment = _.extend(_.pick(fragmentAttributes, 'storyId', 'body'), {
            userId: user._id,
            author: user.username,
            submitted: new Date().getTime()
        }); 
        
        // update the story with the new fragment
        //Stories.update(fragment.storyId, {$inc: {commentsCount: 1}});
        
        // create the comment, save the id
        fragment._id = Fragments.insert(fragment);
        
        // now create a notification, informing the users that there's a new fragment
        //createNewFragmentNotification(fragment);
        
        return fragment._id;
    }
});
