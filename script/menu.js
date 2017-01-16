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
        menu.find('.menu_item').removeClass('main_nav_item-active');
        menu.find('.main_nav_item').removeClass('main_nav_item-active');

        if ($(this).hasClass('main_nav_item')) {
            $(this).addClass('main_nav_item-active');
        } else {
            $(this).parents('.main_nav_item').addClass('main_nav_item-active');
        }
        menuCallback($(this).data('menu-item-name'));
    });

    // menu.find('.subnav').click(function () {
    //     menu.find('.menu_item').removeClass('main_nav_item-active');
    //     $(this).parent('.menu_nav_item').addClass('main_nav_item-active'); //разобраться с проблемой активного пункта меню мобильная версия
    // })
}





