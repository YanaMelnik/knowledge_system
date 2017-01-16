function skills(selector) {
    $.ajax({
        type: 'GET',
        url: '/skills',
        success: function (data) {
            var output = Mustache.render($("#skills").html(), data);

            $(selector).html(output);
        },
        error: function () {
            alert('Error');
        },
        dataType: 'json',
        contentType: 'application/json'
    });
}