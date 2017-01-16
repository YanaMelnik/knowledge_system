function skills(selector) {
    $.ajax({
        type: 'GET',
        url: '/skills',
        success: function (data) {
            var output = Mustache.render($("#skills").html(), data);
            $(selector).html(output);
            $('.new_skills').click(function (evt) {
                evt.stopPropagation();
            });
            $('#container').find('.dark_background').click(function () {
                $(selector).empty();
            })
        },
        error: function () {
            alert('Error');
        },
        dataType: 'json',
        contentType: 'application/json'
    });
}