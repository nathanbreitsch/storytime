Template.page.helpers({
  fragments: function() {
    return Fragments.find({'storyId': this._id, 'visible': true}, {sort: {position: 1}});
  }
});

Template.page.events({

  'click span': function(evt) {
    var activePosition = Session.get('activePosition');
    $('#page span').removeClass('active');
    $(evt.target).addClass('active');
    if (evt.target.id === 'front-cursor') {
      activePosition = this.front;
      // TODO huge reactivity problem here
    } else {
      activePosition = Fragments.findOne(evt.target.id, {position: true}).position;
    }
    console.log('active position: ' + activePosition);
    Session.set('activePosition', activePosition);
  },

});
