// Fixture data 
if (Stories.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  Accounts.createUser({
      profile: {name: 'Brian Breitsch'},
        email: 'brocktane@gmail.com',
        username: 'brocktane',
        password: 'asdf'
  });
  var brian = Meteor.users.findOne({username: 'brocktane'});

  Accounts.createUser({
      profile: {name: 'Nathan Breitsch'},
        email: 'nbreitsch@gmail.com',
        username: 'nb',
        password: 'asdf'
  });
  var nathan = Meteor.users.findOne({username: 'nb'});

  console.log('brian: ' + brian);
  console.log('nathan: ' + nathan);

  var storyId = Stories.insert({
    title: 'Demo Story Title',
    userId: brian._id,
    creator: brian.name,
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
