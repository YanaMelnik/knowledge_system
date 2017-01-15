function EmployeeComponent(user) {
    var container = $('#container');
    var employee = $('#employeeComponent');
    var state = {currentPage: "general"};

    container.html(employee.html());

    render();

    function render() {
        switch (state.currentPage) {
            case 'general':
                renderGeneral();
                break;


        }

        new MenuComponent();
    }

    function renderGeneral() {
        $.ajax({
            type: 'GET',
            url: '/employee/'+ user.id,
            success: function (data) {
                var output = Mustache.render($('#generalEmployee').html(), data);
                container.find('.container').html(output);
            },
            error: function () {
                alert('Error');
            },
            dataType: 'json',
            contentType: 'application/json'
        });
    }

    function renderSkills() {
        $.ajax({
            type: 'GET',
            url: '/employee/'+ user.id+"/skills",
            success: function (data) {
                var output = Mustache.render($('#generalEmployee').html(), data);
                container.find('.container').html(output);
            },
            error: function () {
                alert('Error');
            },
            dataType: 'json',
            contentType: 'application/json'
        });
    }

}