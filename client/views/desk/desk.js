Template.desk.helpers({
    fragments: function() {
                   console.log(this.fragments);
                   return Fragments.find({_id: {$in: this.fragments}});
               },
    title: function(){
        return Session.get("currentStory").title;
    }
});
