var state = {
    currentComponent: 'loginComponent'
};

function render() {
    if (state.currentComponent === 'loginComponent') {
        new LoginComponent();
    }
}

render();
