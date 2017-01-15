var state = {
    currentComponent: 'loginComponent',
    userRole: undefined
};

function render() {
    if (state.currentComponent === 'loginComponent') {
        new LoginComponent(function (user) {
            state.role = user.role;
            if(state.role==="employee"){
                new EmployeeComponent();
            }
        });
    }
}

render();
