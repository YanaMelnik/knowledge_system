function skills(selector) {
    $.ajax({
        type: 'GET',
        url: '/skills',
        success: function (data) {
            console.log("do it");
            var output = Mustache.render($("#skills").html(), data);

            console.log($(selector));
            $(selector).prepend(output);
        },
        error: function () {
            alert('Error');
        },
        dataType: 'json',
        contentType: 'application/json'
    });
}