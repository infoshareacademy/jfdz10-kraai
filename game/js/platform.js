const htmlObjects = {
  viewport: document.querySelector(".viewport"),
  platform: document.querySelector(".platform"),
  obstacleElement: document.querySelectorAll(".obstacle")
};
const gameConfiguration = {
  gameSpeed : 1,
  obstacleSpeed(){ return Math.random() * 1500 },
  viewportWidth : htmlObjects.viewport.offsetWidth,
}

let obstacle = htmlObjects.obstacleElement;
let platform = htmlObjects.platform;
let obstacleCount = 0;

function obstacleCreator() {

    let newObstacle = document.createElement("div");
    newObstacle.style.left = `${gameConfiguration.viewportWidth + 50 - platform.offsetLeft}px`;
    newObstacle.classList.add("obstacle");
    platform.appendChild(newObstacle);
    gameConfiguration.obstacleSpeed = 
    countObstacle(1);
 
}

function countObstacle(amount) {
  obstacleCount = obstacleCount + amount;
  htmlObjects.obstacleElement = document.querySelectorAll('.obstacle');
  obstacle = htmlObjects.obstacleElement;
}

function gameMove(){
  const moveInterval = setInterval(() => {
   platform.style.left = `${platform.offsetLeft - 2}px`;
 },10)

}

gameMove();

setInterval(() => {
  obstacleCreator();
  
  
}, gameConfiguration.obstacleSpeed());


