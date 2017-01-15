function EmployeeComponent() {
    var container = $('#container');
    var employee = $('#employeeComponent');

    container.html(employee.html());

    var general= $('#generalEmployee');
    container.find('.container').html(general.html());

    $.ajax({
        type: 'GET',
        url: '/employee/1',
        data: JSON.stringify(loginData),
        success: function (data) {
            ;
        },
        error: function () {
            alert('Error');
        },
        dataType: 'json',
        contentType: 'application/json'
    });

    function render(data) {
        var photo = container.find();
    }

}