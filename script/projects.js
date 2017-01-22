function Projects() {
    var state = {
        currentPageNumber: undefined,
        projects: [],
        pages: undefined
    };

    getProjects();

    function getProjects() {
        var url = '/projects';
        if (state.currentPageNumber) {
            url += '?page=' + state.currentPageNumber;
        }
        $.ajax({
            type: 'GET',
            url: url,
            success: function (data) {
                state.currentPageNumber = data.page;
                state.pages = data.pages;
                state.projects = data.projects;
                render();
            },
            dataType: 'json'
        });
    }

    function showProject(projectId) {
        var project = findProject(projectId);
        project.next_project_id = findNextProjectId(projectId);
        project.prev_project_id = findPreviousProjectId(projectId);

        var output = Mustache.render($('#galleryPreview').html(), project);
        var preview = $('#container').find('.preview');
        preview.html(output);
        $('#container').find('.change_img').click(function (e) {
            e.stopPropagation();
            showProject(+$(this).data('project-id'));
            return false;
        });


        $('#container').find('.img_big>div').click(function (evt) {
            evt.stopPropagation();
        });
        $('#container').find('.dark_background').click(function () {
            preview.empty();
        });
        $('#container').find('.fa-times').click(function () {
            preview.empty();
        });
        preventParentScroll('#container .preview')

    }

    function findProject(projectId) {
        return state.projects.filter(function (project) {
            return project.id === projectId;
        })[0];
    }

    function findPreviousProjectId(projectId) {
        if (findProject(projectId - 1))
            return projectId - 1;
        return state.projects[state.projects.length - 1].id;
    }

    function findNextProjectId(projectId) {
        if (findProject(projectId + 1))
            return projectId + 1;
        return state.projects[0].id;
    }

    function render() {
        state.allPages = [];
        for (var i = 1; i <= state.pages; i++) {
            state.allPages.push(i);
        }
        var output = Mustache.render($('#galleryEmployee').html(), state);
        $('#container .container').html(output);
        highlightCurrentPage();

        $('.gallery_page').click(function () {
            changePage(+$(this).data('page'));
        });

        $('.project').click(function () {
            showProject(+$(this).data('project-id'))
        })
    }

    function highlightCurrentPage() {
        $('.gallery_page').removeClass('page_active');
        $('.gallery_page[data-page="' + state.currentPageNumber + '"]').addClass('page_active');
    }

    function changePage(page) {
        if (page !== state.currentPageNumber) {
            state.currentPageNumber = page
        }
        getProjects();
    }
}