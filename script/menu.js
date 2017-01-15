function MenuComponent(menuCallback) {
    var navMain = $('.main_nav');
    var navToggle = $('.main_nav__toggle');

    navToggle.click(function () {
        if (navMain.hasClass('main-nav--closed')) {
            navMain.removeClass('main-nav--closed');
            navMain.addClass('main-nav--opened');
        } else {
            closeMenu();
        }
    });

    var menu = navMain.find('.main_nav__items');
    menu.click(closeMenu);

    var exit = navMain.find('.exit');
    exit.click(closeMenu);

    function closeMenu() {
        navMain.addClass('main-nav--closed');
        navMain.removeClass('main-nav--opened');
    }

    menu.find('.menu_item').click(function () {
        menuCallback($(this).data('menu-item-name'));
    });



}



