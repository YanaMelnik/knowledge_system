function LoginComponent(loginCallback) {

    var form = $('#loginComponent');

    var container = $('#container');
    container.html(form.html());

    $('.slider').slick({
        autoplay: true,
        autoplaySpeed: 1500,
        speed: 1200,
        dots: true,
        arrows: false,
        pauseOnDotsHover: true

    });
    function doLogin() {
        var login = container.find('input[name="login"]').val();
        var password = container.find('input[name="password"]').val();
        var loginData = {
            login: login,
            password: password
        };

        $.ajax({
            type: 'POST',
            url: '/login',
            data: JSON.stringify(loginData),
            success: function (data) {
                loginCallback(data);
            },
            error: function () {
                alert('Error');
            },
            dataType: 'json',
            contentType: 'application/json'
        });


    }

    container.find('#enterSite').click(doLogin);

}


