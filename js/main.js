var navigationBar = document.querySelector('.nav');
var navBackground = document.querySelector('.nav__background')
var logo1 = document.querySelector('.logo__img1');
var logo2 = document.querySelector('.logo__img2');
var scrollOffsetTop;

function scrollPosition(){
    scrollOffsetTop = window.scrollY;
}
function  navbarModifier(){
    scrollPosition();
    if(scrollOffsetTop > 20){
        logo1.classList.add('logo--hide');
        logo2.classList.remove('logo--hide');
        navBackground.classList.add('nav__background--show');
    }else{
        logo2.classList.add('logo--hide');
        logo1.classList.remove('logo--hide');
        navBackground.classList.remove('nav__background--show');
    }
}

document.addEventListener('scroll',navbarModifier);