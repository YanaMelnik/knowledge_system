var navMain= document.querySelector('.main_nav');
var navToggle=document.querySelector('.main_nav__toggle');

navToggle.addEventListener('click', function () {
    if (navMain.classList.contains('main-nav--closed')){
        navMain.classList.remove('main-nav--closed');
        navMain.classList.add('main-nav--opened');
    }else{
        navMain.classList.add('main-nav--closed');
        navMain.classList.remove('main-nav--opened');
    }
})

var navMainItem=document.querySelectorAll('.main_nav_item');
var sunavItem = document.querySelector('.subnav_item');

navMainItem.addEventListener('click', function () {

})