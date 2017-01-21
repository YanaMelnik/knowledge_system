function RenderTeam() {
    var myTeam = [];
    var team = [];
    var sortOrder = 1;
    var filter = null;

    $.ajax({
        type: 'GET',
        url: '/employee/3',
        success: function (data) {
            myTeam = data;
            console.log(data);
            render();
        },
        error: function () {
            alert('Error');
        },
        dataType: 'json'
    });

    function render() {
        if (filter){
            team = myTeam.team.filter(function (elem) {
                return filter.indexOf(elem.id)!==-1;
            });
        } else {
            team = myTeam.team;
        }
        var output = Mustache.render($('#myTeam').html(), team);
        $('#container').find('.container').html(output);

        if (team.length==0){
            $('#container').find('.container').append($('#filterError').html());
        }

        $('#container').find('.sort').click(function () {
            team.sort(function (a, b) {
                return ((b.name < a.name) - (a.name < b.name)) * sortOrder;
            });

            render();

            var sortLabel = sortOrder === 1 ? 'ASC' : 'DESC';
            $('#container').find('.sort').val('Sort by name ' + sortLabel);
            sortOrder *= -1;
        });

        new Filter(function (data) {
            filter = data;
            render();
        });
    }

}