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
            error: function () {
                alert('Error');
            },
            dataType: 'json',
            contentType: 'application/json'
        });
    }

    function showProject(projectId) {
        var project = findProject(projectId);
        var output = Mustache.render($('#galleryPreview').html(), project);
        var preview = $('#container').find('.preview');
        preview.html(output);
        $('.dark_background').click(function () {
            preview.empty();
        })
    };

    function findProject(projectId) {
        return state.projects.filter(function (project) {
            return project.id === projectId;
        })[0];
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