var state = {
    currentComponent: 'loginComponent',
    userRole: null,
    user: null
};

function render() {                                     //render component on the page, based on role
    if (state.currentComponent === 'loginComponent') {
        new LoginComponent(function (user) {            //loginCallback
            state.role = user.role;
            state.user = user;
            if(state.role==="employee"){
                new EmployeeComponent(user);
            }
            if(state.role==="manager"){
                new ManagerComponent(user);
            }
        });
    }
}

function preventParentScroll(selector) {
    $(selector).on('mousewheel', function (e) {
        var event = e.originalEvent,
            d = event.wheelDelta || -event.detail;

        this.scrollTop += ( d < 0 ? 1 : -1 ) * 30;
        e.preventDefault();
    });
}


render();

