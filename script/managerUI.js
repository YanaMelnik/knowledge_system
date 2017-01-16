function ManagerComponent(user) {
    var container = $('#container');
    var manager = $('#managerComponent');
    var state = {currentPage: "general"};

    container.html(manager.html());

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
            case 'team':
                console.log('hello contacts!');
                renderTeam();
                break;
            case 'contacts':
                console.log('hello contacts!');
                renderContact();
                break;

        }
    }

    function renderGeneral() {
        $.ajax({
            type: 'GET',
            url: '/employee/' + user.id,
            success: function (data) {
                var output = Mustache.render($('#generalManager').html(), data);
                container.find('.container').html(output);
            },
            error: function () {
                alert('Error');
            },
            dataType: 'json',
            contentType: 'application/json'
        });
    }

    function renderTeam() {
        $.ajax({
            type: 'GET',
            url: '/employee/3',
            success: function (data) {
                console.log('hello!');
                var output = Mustache.render($('#myTeam').html(), data);
                container.find('.container').html(output);
            },
            error: function () {
                alert('Error');
            },
            dataType: 'json',
            contentType: 'application/json'
        });
    }

    function renderContact() {
        $.ajax({
            type: 'GET',
            url: '/employee/3',
            success: function (data) {
                console.log('hello contacts!');

                var lat = data.office.lat;
                var lng = data.office.lng;

                container.find('.container').html($("#contact").html());

                var map = new Map(lat, lng);

                data.team.forEach(function (elem) {
                    map.addMarker(elem.name, +elem.office.lat, +elem.office.lng);
                })
            },
            error: function () {
                alert('Error');
            },
            dataType: 'json',
            contentType: 'application/json'
        });
    }
}