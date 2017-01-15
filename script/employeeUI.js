function EmployeeComponent() {
    var container = $('#container');
    var employee = $('#employeeComponent');

    container.html(employee.html());

    $.ajax({
        type: 'GET',
        url: '/employee/1',
        success: function (data) {
            render(data);
        },
        error: function () {
            alert('Error');
        },
        dataType: 'json',
        contentType: 'application/json'
    });

    function render(data) {
        var output = Mustache.render($('#generalEmployee').html(), data);
        container.find('.container').html(output);
    }

}