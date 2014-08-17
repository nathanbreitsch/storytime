SubmittedFragments = new Meteor.Collection("SubmittedFragments");
Votes = new Meteor.Collection("Votes");
SelectedFragments = new Meteor.Collection("SelectedFragments");

SubmittedFragments.deny({
	insert: function(userId, doc){
		var time = (new Date).getTime() % VOTE_TIME;
		return (time > SUBMIT_TIME);
	}
});

SubmittedFragments.allow({
	insert: function(userId, doc){
		var time = (new Date).getTime() % VOTE_TIME;
		return (time <= SUBMIT_TIME);
	}
});
