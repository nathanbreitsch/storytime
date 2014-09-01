// Fixture data 
if (Stories.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var brianId = Meteor.users.insert({
    profile: { name: 'Brian Breitsch' }
  });
  var brian = Meteor.users.findOne(brianId);
  var nathanId = Meteor.users.insert({
    profile: { name: 'Nathan Wilson' }
  });
  var nathan = Meteor.users.findOne(nathanId);

  var storyId = Stories.insert({
    title: 'Demo Story Title',
    userId: brian._id,
    creator: brian.profile.name,
    nonPrivate: true,
    fragments: [''],
    submitted: now - 7 * 3600 * 1000
  });

  Fragments.insert({
    storyId: storyId,
    userId: brian._id,
    author: brian.profile.name,
    submitted: now - 5 * 3600 * 1000,
    body: 'Once upon a time, '
  });

  Fragments.insert({
    storyId: null,
    userId: nathan._id,
    author: nathan.profile.name,
    submitted: now - 5 * 3600 * 1000,
    body: 'there was an animorph, '
  });

  var storyId = Stories.insert({
    title: 'Demo Story Title',
    userId: nathan._id,
    creator: nathan.profile.name,
    nonPrivate: true,
    fragments: [''],
    submitted: now - 7 * 3600 * 1000
  });

  Fragments.insert({
    storyId: storyId,
    userId: nathan._id,
    author: nathan.profile.name,
    submitted: now - 5 * 3600 * 1000,
    body: 'A long time ago... '
  });

  Fragments.insert({
    storyId: null,
    userId: nathan._id,
    author: nathan.profile.name,
    submitted: now - 5 * 3600 * 1000,
    body: 'in a galaxy somewhere, '
  });


}
