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
            render();
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

        team.sort(function (a, b) {
            return ((b.name < a.name) - (a.name < b.name)) * sortOrder;
        });

        var output = Mustache.render($('#myTeam').html(), team);
        $('#container').find('.container').html(output);

        if (team.length==0){
            $('#container').find('.container').append($('#filterError').html());
        }


        $('#container').find('.sort').click(function () {
            sortOrder *= -1;

            render();

            var sortLabel = sortOrder === 1 ? 'ASC' : 'DESC';
            $('#container').find('.sort').val('Sort by name ' + sortLabel);
        });

        new Filter(function (data) {
            filter = data;
            render();
        });
    }

}