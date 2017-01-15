var state = {
    currentComponent: 'loginComponent',
    userRole: undefined,
    user: undefined
};

function render() {
    if (state.currentComponent === 'loginComponent') {
        new LoginComponent(function (user) {
            state.role = user.role;
            state.user = user;
            if(state.role==="employee"){
                new EmployeeComponent(user);
            }
        });
    }
}

render();
