let isFalling = false;
let isJumping = false;
let keyDownCount = 0;

function moveCharacter() {
  const character = document.createElement("div");
  character.className = "character";
  const space = document.querySelector(".platform");
  space.appendChild(character);
  const keyJump = 32;


  document.addEventListener("keydown", jump);

  function jump(event) {
    if (event.keyCode === keyJump) {
      keyDownCount++;
      
      if (keyDownCount === 1) {
        console.log(keyDownCount);
        character.style.bottom = "250px";

      
      setTimeout(function fall() {
        if (character.style.bottom === "250px") {
          character.style.bottom = "100px";
          
          land();
        }
      }, 500);}
    }

  }

  function land() {

   let landInterval =  setInterval(function landCounter(){if (window.getComputedStyle(character).bottom === "100px" ) {
      keyDownCount = 0;
      console.log(keyDownCount);
      clearInterval(landInterval)

    }},0);
    
  }
}


moveCharacter()
animateScript()
var time = 1000;



var tID;

function animateScript() {
  document.querySelector(".character").style.backgroundPosition =
    `-171px 0px`;
  var position = 0;
  
  function setNewTimeout(){
  tID = setTimeout(() => {
    document.querySelector(".character").style.backgroundPosition =
      `-${position}px 0px`;
    if (keyDownCount === 0) {
      if (position < 1026) {
        position = position + 171;
      } else {
        position = 171;
      }
      
    };setNewTimeout();
  }, time);
}
setNewTimeout()
}

