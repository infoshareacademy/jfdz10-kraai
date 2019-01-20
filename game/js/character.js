function moveCharacter() {
  const character = document.createElement("div");
  character.className = "character";
  const space = document.querySelector(".viewport");
  space.appendChild(character);
  const keyJump = 32;

  document.addEventListener("keydown", jump);

  function jump(event) {
    if (event.keyCode === keyJump) {
      character.style.bottom = "200px";
    }
    setTimeout(function fall() {
      if (character.style.bottom === "200px") {
        character.style.bottom = "100px";
      }
    }, 500);
  }
}
