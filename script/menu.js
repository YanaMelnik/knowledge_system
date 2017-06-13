function MenuComponent(menuCallback) {
    var navMain = $('.main_nav');
    var navToggle = $('.main_nav__toggle');

    navToggle.click(function () {               //implementation for button in mobile version
        if (navMain.hasClass('main-nav--closed')) {
            navMain.removeClass('main-nav--closed');
            navMain.addClass('main-nav--opened');
        } else {
            closeMenu();
        }
    });

    var menu = navMain.find('.main_nav__items');        //implementation for click on menu items in mobile version
    menu.click(closeMenu);

    var exit = navMain.find('.exit');                   //implementation for click on exit in mobile version
    exit.click(closeMenu);

    function closeMenu() {
        navMain.addClass('main-nav--closed');
        navMain.removeClass('main-nav--opened');
    }

    menu.find('.menu_item').click(function () {         //sets active menu tab onClick
        menu.find('.menu_item').removeClass('main_nav_item-active');
        menu.find('.main_nav_item').removeClass('main_nav_item-active');

        if ($(this).hasClass('main_nav_item')) {
            $(this).addClass('main_nav_item-active');
        } else {
            $(this).parents('.main_nav_item').addClass('main_nav_item-active');
        }
        menuCallback($(this).data('menu-item-name')); //argument is data attribute active item
    });

    $('.profile_menu').click(function () {      //sets exit action
        window.location='/';
    });
}





