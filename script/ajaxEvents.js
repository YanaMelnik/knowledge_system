$(document).ajaxStart(function () {
    $('.loader').html('<i id="loader" class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>');
});

$(document).ajaxSuccess(function () {
    $('.loader').empty();
});

$(document).ajaxError(function () {
    $('.loader').empty();
    $('#container').find('.container').html('<p class="server_error">Can\'t connect to the server. Try again later.</p>');
});