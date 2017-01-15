function EmployeeComponent() {
    var container = $('#container');
    var employee = $('#employeeComponent');

    container.html(employee.html());

    var general= $('#generalEmployee');
    container.find('.container').html(general.html());

}