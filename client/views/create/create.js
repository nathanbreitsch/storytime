Template.create.events({
    'submit': function(event){
        storyData = {};
        //add each field and value in the form to storyData
        $.each($('#new-story').serializeArray(), function() {
            storyData[this.name] = this.value;
        });


        Stories.insert(storyData, function(err) {
            if(!err) {
                alert("Submitted!");
                $('#new-story')[0].reset();
            }
            else
            {
                alert("Something is wrong");
                console.log(err);
            }
        });
        //prevent the page from refreshing
        event.preventDefault();
    }
});