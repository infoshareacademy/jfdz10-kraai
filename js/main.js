var navigationBar = document.querySelector('.nav');
var logo1 = document.querySelector('.nav-logo__img1');
var logo2 = document.querySelector('.nav-logo__img2');
var navTrigger = document.querySelector('.nav__trigger');
var menu = document.querySelector('.nav-menu');
var triggerIcon = navTrigger.querySelector('i');
var scrollOffsetTop = window.scrollY;

function scrollPosition() {
    scrollOffsetTop = window.scrollY;
}

function navbarModifier() {
    scrollPosition();
    if (scrollOffsetTop > 20) {
        logo1.classList.add('nav-logo--hide');
        logo2.classList.remove('nav-logo--hide');
        navigationBar.classList.add('nav--bg');
    } else {
        logo2.classList.add('nav-logo--hide');
        logo1.classList.remove('nav-logo--hide');
        if (menu.classList.contains('nav-menu--hide')) {
            navigationBar.classList.remove('nav--bg');
        }
    }
}

function navbarShow() {
    if (menu.classList.contains('nav-menu--hide')) {
        if (scrollOffsetTop <= 20) {
            navigationBar.classList.add('nav--bg');
        }
        menu.classList.remove('nav-menu--hide');
        triggerIcon.classList.remove('fa-bars');
        triggerIcon.classList.add('fa-times');
    } else {
        menu.classList.add('nav-menu--hide');
        if (scrollOffsetTop < 20) {
            navigationBar.classList.remove('nav--bg');
        }
        triggerIcon.classList.add('fa-bars');
        triggerIcon.classList.remove('fa-times');
    }

}

document.addEventListener('scroll', navbarModifier);
navTrigger.addEventListener('click', navbarShow);
window.addEventListener('load', navbarModifier);