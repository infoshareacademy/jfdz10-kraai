
var cssSelectors = {
    NAV: '.nav',
    NAV_MENU: '.nav-menu',
    NAV_TRIGGER: '.nav_trigger',
}
var navigationBar = document.querySelector(cssSelectors.NAV);
var verticalLogo = document.querySelector('.nav-logo__img1');
var horizontalLogo = document.querySelector('.nav-logo__img2');
var navTrigger = document.querySelector('.nav__trigger');
var menu = document.querySelector('.nav-menu');
var triggerIcon = navTrigger.querySelector('.nav i');
var scrollOffsetTop = window.scrollY;
var actualScroll;
var initScroll = window.scrollY;
var allSections = document.querySelectorAll('section');
var scrollThreshold = 20;

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
        var sectionHeight = allSections[i].offsetHeight;
        var sectionTop = allSections[i].offsetTop;
        var sectionBottom = sectionTop + sectionHeight;
        var viewportTop = scrollOffsetTop;
        var windowHeight = window.innerHeight;
        var viewportBottom = scrollOffsetTop + windowHeight;
        var allLinks = document.querySelectorAll('.nav-menu__link');
        var activeLink = document.querySelector('.nav-menu__link--active');
       
        if (sectionTop <= scrollOffsetTop) {
            activeLink.classList.remove('nav-menu__link--active');
            allLinks[i].classList.add('nav-menu__link--active');
        }
    }

}

function scrollDirection() {
    actualScroll = window.scrollY;
    if (actualScroll >= initScroll) {
        initScroll = actualScroll;
        console.log('down');
        return 'down';

    } else if (actualScroll <= initScroll) {
        initScroll = actualScroll;
        console.log('up');
        return 'up';
    }
}

document.addEventListener('scroll', setScrollPosition);
document.addEventListener('scroll', toggleNavbarClasses);
document.addEventListener('scroll', checkActiveSection);
navTrigger.addEventListener('click', toggleNavbarVisibility);
window.addEventListener('load', toggleNavbarClasses);