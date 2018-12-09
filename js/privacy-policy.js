window.addEventListener('mouseup', function(event){
	var formPopUp = document.getElementById('form__popup');
	if (event.target != formPopUp && event.target.parentNode != formPopUp){
        formPopUp.style.display = 'none';
    }
});