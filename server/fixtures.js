// Fixture data 
if (Stories.find().count() === 0) {
  var now = new Date().getTime();

  var brianProfile = Profiles.insert({name: 'Brian Breitsch', bookshelf: []});
  var nathanProfile = Profiles.insert({name: 'Nathan Breitsch', bookshelf: []});

  // create two users
  Accounts.createUser({
    profile: brianProfile,
    email: 'brocktane@gmail.com',
    username: 'brocktane',
    password: 'asdf',
  });
  var brian = Meteor.users.findOne({username: 'brocktane'});

  Accounts.createUser({
    profile: nathanProfile,
    email: 'nbreitsch@gmail.com',
    username: 'nb',
    password: 'asdf'
  });
  var nathan = Meteor.users.findOne({username: 'nb'});

  console.log('brian: ' + brian);
  console.log('nathan: ' + nathan);

  var storyId = Stories.insert({
    title: 'Animorph Queendom',
    description: 'A long time ago, in a queendom ruled by Lady McMorph, there lived an orangatang.',
    creatorId: brian._id,
    submitted: now - 7 * 3600 * 1000,
    front: 3
  });

  var frag1 = Fragments.insert({
    storyId: storyId,
    creatorId: brian._id,
    submitted: now - 5 * 3600 * 1000,
    text: 'Once upon a time, ',
    position: 1,
    visible: true,
    votes: 0
  });

  var frag2 = Fragments.insert({
    storyId: storyId,
    creatorId: nathan._id,
    submitted: now - 5 * 3600 * 1000,
    text: 'there was an animorph, ',
    position: 2,
    visible: true,
    votes: 0
  });

  storyId = Stories.insert({
    title: 'Demo Story Title',
    description: 'Just a dumb demo story',
    creatorId: nathan._id,
    submitted: now - 7 * 3600 * 1000,
    front: 2,
  });

  var frag3 = Fragments.insert({
    storyId: storyId,
    creatorId: nathan._id,
    submitted: now - 5 * 3600 * 1000,
    text: 'A long time ago... ',
    position: 1,
    visible: true,
    votes: 0
  });

  var frag4 = Fragments.insert({
    storyId: storyId,
    creatorId: nathan._id,
    submitted: now - 5 * 3600 * 1000,
    text: 'in a galaxy somewhere, ',
    position: 2,
    visible: false,
    votes: 0
  });
}
