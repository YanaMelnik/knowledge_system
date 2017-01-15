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

    function render() {
        var output = Mustache.render($('#galleryEmployee').html(), state);
        $('#container .container').html(output);
    }
}