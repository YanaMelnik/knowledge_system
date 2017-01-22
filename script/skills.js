function Skills(userId) {
    var container = $('#container');

    $.ajax({
        type: 'GET',
        url: '/employee/' + userId + "/skills",
        success: render,
        dataType: 'json'
    });

    function render(userSkills) {
        var output = Mustache.render($('#skillsEmployee').html(), userSkills);
        container.find('.container').html(output);

        container.find('.sphere_levels').each(function (index, item) {
            var userLevel = $(item).data('user-level');
            $(item).find('.level[data-level="' + userLevel + '"]').addClass('level_active');
        });
        container.find('.add_skills').click(function () {
            selectSkills('#container .add_new_skills', updateSkills, userSkills);
        });
    }

    function updateSkills(skills) {
        $.ajax({
            type: 'POST',
            url: '/skills/update/' + userId,
            success: function (updatedSkills) {
                render(updatedSkills);
            },
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(skills)
        });
    }
}