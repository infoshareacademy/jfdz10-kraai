function moveCharacter() {
  const character = document.createElement("div");
  character.className = "character";
  const space = document.querySelector(".viewport");
  space.appendChild(character);
  const keyJump = 32;
  let isFalling = false;

  document.addEventListener("keydown", jump);

  function jump(event) {
    if (event.keyCode === keyJump && !isFalling) {
      character.style.bottom = "250px";
    }
    setTimeout(function fall() {
      if (character.style.bottom === "250px") {
        character.style.bottom = "100px";
        isFalling = true;
        setTimeout(()=> {isFalling = false;},300)
      }
    }, 500);
  }
}
moveCharacter();


animateScript() 

function animateScript() {
  document.querySelector(".character").style.backgroundPosition = 
  `-171px 0px`;
  }

  var tID; 
  function animateScript() {
  var    position = 0; 
  const  interval = 100; 
  tID = setInterval ( () => {
  document.querySelector(".character").style.backgroundPosition = 
  `-${position}px 0px`; 
  
  if (position < 1026)
  { position = position + 171;}
  
  else
  { position = 171; }
  
  }
  , interval );
  } 