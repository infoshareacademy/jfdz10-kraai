
var cssSelectors = {
    NAV: '.nav',
    NAV_MENU: '.nav-menu',
    NAV_TRIGGER: '.nav_trigger',
    GO_UP: '.goUp',
}
var navigationBar = document.querySelector(cssSelectors.NAV);
var verticalLogo = document.querySelector('.nav-logo__img1');
var horizontalLogo = document.querySelector('.nav-logo__img2');
var navTrigger = document.querySelector('.nav__trigger');
var menu = document.querySelector('.nav-menu');
var triggerIcon = navTrigger.querySelector('.nav i');
var allSections = document.querySelectorAll('section');
var goUpButton = document.querySelector(cssSelectors.GO_UP);
var scrollOffsetTop = window.scrollY;
var scrollThreshold = 20;
var goUpButtonThreshold = 300;
var scrollOffsetTopMarginTop = 200;


function setScrollPosition() {
    scrollOffsetTop = window.scrollY;
}

function toggleNavbarClasses() {
    if (scrollOffsetTop > scrollThreshold) {
        verticalLogo.classList.add('nav-logo--hide');
        horizontalLogo.classList.remove('nav-logo--hide');
        navigationBar.classList.add('nav--bg');
    } else {
        horizontalLogo.classList.add('nav-logo--hide');
        verticalLogo.classList.remove('nav-logo--hide');
        if (menu.classList.contains('nav-menu--hide')) {
            navigationBar.classList.remove('nav--bg');
        }
    }
}

function toggleNavbarVisibility() {
    if (menu.classList.contains('nav-menu--hide')) {
        if (scrollOffsetTop <= scrollThreshold) {
            navigationBar.classList.add('nav--bg');
        }
        menu.classList.remove('nav-menu--hide');
        triggerIcon.classList.remove('fa-bars');
        triggerIcon.classList.add('fa-times');
    } else {
        menu.classList.add('nav-menu--hide');
        if (scrollOffsetTop < scrollThreshold) {
            navigationBar.classList.remove('nav--bg');
        }
        triggerIcon.classList.add('fa-bars');
        triggerIcon.classList.remove('fa-times');
    }
}

function checkActiveSection() {
    for (var i = 0; i < allSections.length; i++) {
        var sectionTop = allSections[i].offsetTop;
        var allLinks = document.querySelectorAll('.nav-menu__link');
        var activeLink = document.querySelector('.nav-menu__link--active');
       
        if (sectionTop <= scrollOffsetTop +scrollOffsetTopMarginTop) {
            activeLink.classList.remove('nav-menu__link--active');
            allLinks[i].classList.add('nav-menu__link--active');
        }
    }

}

function toggleGoUpButtonVisibility(){
    if (scrollOffsetTop > goUpButtonThreshold) {
        goUpButton.classList.add('goUp--show');
    } else {
        goUpButton.classList.remove('goUp--show');
        }
    }

document.addEventListener('scroll', toggleGoUpButtonVisibility);
document.addEventListener('scroll', setScrollPosition);
document.addEventListener('scroll', toggleNavbarClasses);
document.addEventListener('scroll', checkActiveSection);
navTrigger.addEventListener('click', toggleNavbarVisibility);
window.addEventListener('load', toggleNavbarClasses);