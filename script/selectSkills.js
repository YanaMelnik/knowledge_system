function selectSkills(selector, skillsModificationCallback) {
    var $container = $('#container');

    $.ajax({
        type: 'GET',
        url: '/skills',
        success: function (data) {
            render(data);
        },
        error: function () {
            alert('Error');
        },
        dataType: 'json',
        contentType: 'application/json'
    });

    function render(allSkills) {
        var output = Mustache.render($("#skills").html(), allSkills);
        $(selector).html(output);
        $('.new_skills').click(function (evt) {
            evt.stopPropagation();
        });
        $container.find('.dark_background').click(function () {
            $(selector).empty();
        });
        listenForSkillSelection();

    }

    function listenForSkillSelection() {
        var selectedSkills = [];
        $container.find('.new_skills .level').click(function () {
            $(this).parent().find('.level').removeClass('level_active');
            $(this).addClass('level_active');

            var selectedSkill = extractSelectedSkill(this);
            selectedSkills = selectedSkills.filter(function (item) {
                return !(item.sphere === selectedSkill.sphere && item.name === selectedSkill.name);
            });
            selectedSkills.push(selectedSkill);
        });

        $container.find('.save_skills').click(function () {
            $(selector).empty();
            skillsModificationCallback(selectedSkills);
        });

    }

    function extractSelectedSkill(selectedSkill) {
        var dataContainer = $(selectedSkill).parents('.sphere_knowledge');
        var sphereName = dataContainer.data('skill-sphere');
        var skillName = dataContainer.data('skill-name');
        var clickedLevel = $(selectedSkill).data('skill-level');
        return {
            sphere: sphereName,
            name: skillName,
            level: clickedLevel
        };
    }
}