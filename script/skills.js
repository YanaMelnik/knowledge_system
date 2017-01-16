function Skills(userId) {
    var container = $('#container');

    $.ajax({
        type: 'GET',
        url: '/employee/' + userId + "/skills",
        success: function (data) {
            var output = Mustache.render($('#skillsEmployee').html(), data);
            container.find('.container').html(output);
            container.find('.sphere_levels').each(function (index, item) {
                var userLevel = $(item).data('user-level');
                $(item).find('.level[data-level="' + userLevel + '"]').addClass('level_active');
            });
            container.find('.add_skills').click(function () {
                selectSkills('#container .add_new_skills');
            });
        },
        error: function () {
            alert('Error');
        },
        dataType: 'json',
        contentType: 'application/json'
    });
}