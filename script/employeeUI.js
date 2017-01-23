function EmployeeComponent(user) {
    var container = $('#container');
    var employee = $('#employeeComponent');
    var state = {currentPage: "general"};

    container.html(employee.html());

    render();
    new MenuComponent(function (menuItem) {
        state.currentPage = menuItem;
        render();
    });

    function render() {
        switch (state.currentPage) {
            case 'general':
                renderGeneral();
                break;
            case 'skills':
                new Skills(user.id);
                break;
            case 'projects':
                new Projects();
                break;
            case 'contacts':
                renderContact();
                break;

        }
    }

    function renderGeneral() {
        $.ajax({
            type: 'GET',
            url: '/employee/' + user.id,
            success: function (data) {
                var output = Mustache.render($('#generalEmployee').html(), data);
                container.find('.container').html(output);

                var downloadInfo = Mustache.render($('#downloadFile').html(), data);
                $('.download').click(function () {
                    download(downloadInfo, "my_cv.html", "text/html");
                });

                $('.profile_photo').attr('src', data.photo);
                $('.fbSharing').click(function () {
                    FB.ui({
                        method: 'feed',
                        link: 'http://apple.com',
                        caption: 'My site knowledge system',
                        picture: 'http://para.llel.us/themes/goexplore-html/assets/images/logo-symbol-complex-colors.png',
                        description: 'Description for knowledge system',
                        name: 'knowledge system'
                    }, function (response) {
                    });
                });
            },
            dataType: 'json'
        });
    }

    function download(data, filename, type) {
        var a = document.createElement("a"),
            file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

    function renderContact() {
        $.ajax({
            type: 'GET',
            url: '/employee/' + user.id,
            success: function (data) {
                var lat = data.office.lat;
                var lng = data.office.lng;

                container.find('.container').html($("#contact").html());

                new Map(lat, lng);
            },
            dataType: 'json'
        });
    }
}