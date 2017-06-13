function LoginComponent(loginCallback) {            //constructor for login

    var form = $('#loginComponent');

    var container = $('#container');
    container.html(form.html());

    $('.slider').slick({            //slider for start page, plugin
        autoplay: true,
        autoplaySpeed: 1500,
        speed: 1200,
        dots: true,
        arrows: false,
        pauseOnDotsHover: true
    });

    function doLogin() {                    //login in, ajax on the server, and validation login password
        container.find('.enter-form').hide();

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
                container.find('.enter_form__error').show();
            },
            dataType: 'json',
            contentType: 'application/json'
        });
    }

    container.find('#enterSite').click(doLogin);  //what to do when i click or press "enter"
    $('input[class="js_login"]').keypress(function (e) {
        var code = e.keyCode || e.which;
        console.log(e);
        if(code == 13) {
            doLogin();
        }
    });
}


