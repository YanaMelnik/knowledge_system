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
                new RenderTeam();
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
                var output = Mustache.render($('#generalManager').html(), data);
                container.find('.container').html(output);
            },
            dataType: 'json'
        });
    }



    function renderContact() {
        $.ajax({
            type: 'GET',
            url: '/employee/3',
            success: function (data) {
                var lat = data.office.lat;
                var lng = data.office.lng;

                container.find('.container').html($("#contact").html());

                var map = new Map(lat, lng);

                data.team.forEach(function (elem) {
                    map.addMarker(elem.name, +elem.office.lat, +elem.office.lng);
                })
            },
            dataType: 'json'
        });
    }
}