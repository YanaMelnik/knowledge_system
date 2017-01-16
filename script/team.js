function RenderTeam() {
    var myTeam = [];
    var sortOrder = 1;

    $.ajax({
        type: 'GET',
        url: '/employee/3',
        success: function (data) {
            myTeam = data;

            render();
        },
        error: function () {
            alert('Error');
        },
        dataType: 'json'
    });

    function render() {
        var output = Mustache.render($('#myTeam').html(), myTeam);
        $('#container').find('.container').html(output);

        $('#container').find('.sort').click(function () {
            myTeam.team.sort(function (a, b) {
                return ((b.name < a.name) - (a.name < b.name)) * sortOrder;
            });

            render();

            var sortLabel = sortOrder === 1 ? 'ASC' : 'DESC';
            $('#container').find('.sort').val('Sort by name ' + sortLabel);
            sortOrder *= -1;
        })

    }

}