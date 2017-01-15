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
            case 'skills':
                renderSkills();
                break;
        }
        new MenuComponent(function (menuItem) {
            state.currentPage = menuItem;
            render();
        });
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
                var output = Mustache.render($('#skillsEmployee').html(), data);
                container.find('.container').html(output);
                container.find('.sphere_levels').each(function(index, item){
                    var userLevel = $(item).data('user-level');
                    console.log(userLevel);
                    $(item).find('.level[data-level="' + userLevel + '"]').addClass('level_active');
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