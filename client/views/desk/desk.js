Template.desk.helpers({
    fragments: function() {
                   return Fragments.find({_id: {$in: data.fragments}});
               }
});
