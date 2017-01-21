function Filter(filterCallback) {
    var $container = $('#container');

    $container.find('.filter').click(function () {
        selectSkills('#container .add_filter', filterEmployees);
    });

    function filterEmployees(arrFilter) {
        $.ajax({
            type: 'POST',
            url: '/manager/filter',
            data: JSON.stringify(arrFilter),
            success: filterCallback,
            error: function () {
                alert('Error');
            },
            dataType: 'json',
            contentType: 'application/json'
        });
    }
}