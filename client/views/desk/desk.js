Template.desk.helpers({
    fragments: function() {
                   console.log(this.fragments);
                   return Fragments.find({_id: {$in: this.fragments}});
               }
});
