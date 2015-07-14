$(function() {

    // Populate the comments section!
    $.ajax({
        url: '/api/comments',
        type: 'GET',
        success: function(data) {
            // Quick and dirty custom jQuery templating
            var template = $('template').html();
            $.each(data, function(index, value) {
                var HBlock = template.replace(/{cB}/g, value.commentBody);
                $('.comments-section').prepend(HBlock);
               
            });

        }
    });

});

$('#commentSubmit').click(function() {

    var commBy = $('#commentByID').val();
    var commBody = $('#commentBodyID').val();

    console.log(commBy);
    console.log(commBody);

    $.ajax({
            url: '/api/comments',
            type: 'POST',
            data: {
                commentBody: commBody,
                commentBy: commBy
            },
            success: function(data) {

                // Add it to the comments section
                var template = $('template').html();
                var HBlock = template.replace(/{cB}/g, commBody);
                $('.comments-section').prepend(HBlock);


            }
        });


});