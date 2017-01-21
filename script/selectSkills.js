function selectSkills(selector, skillsModificationCallback, preselectedSkills) {
    var $container = $('#container');

    $.ajax({
        type: 'GET',
        url: '/skills',
        success: render,
        error: function () {
            alert('Error');
        },
        dataType: 'json'
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
        $container.find('.fa-times').click(function () {
            $(selector).empty();
        });
        listenForSkillSelection();
        preselect();
    }

    function preselect() {
        if (preselectedSkills) {
            var skillsTree = {};
            preselectedSkills.forEach(function (sphere) {
                var sphereTree = {};
                var sphereName = sphere.sphere;
                skillsTree[sphereName] = sphereTree;
                sphere.skills.forEach(function (skill) {
                    sphereTree[skill.name] = skill.level;
                })
            });
            console.log(skillsTree);
            $(selector).find('.sphere_knowledge').each(function (index, item) {
                var $item = $(item);
                var sphere = $item.data('skill-sphere');
                var skill = $item.data('skill-name');
                if (skillsTree[sphere]) {
                    var level = skillsTree[sphere][skill];
                    if (level) {
                        $item.find('[data-skill-level=' + level + ']').addClass('level_active');
                    }
                }
            })
        }
    }

    function listenForSkillSelection() {
        var skillsArray = [];
        $container.find('.new_skills .level').click(function () {
            $(this).parent().find('.level').removeClass('level_active');
            $(this).addClass('level_active');

            var selectedSkill = extractSelectedSkill(this);
            skillsArray = skillsArray.filter(function (item) {
                return item.sphere !== selectedSkill.sphere || item.name !== selectedSkill.name;
            });
            skillsArray.push(selectedSkill);
        });

        $container.find('.save_skills').click(function () {
            $(selector).empty();
            skillsModificationCallback(skillsArray);
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