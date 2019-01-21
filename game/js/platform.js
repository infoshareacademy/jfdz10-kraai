const htmlObjects = {
  viewport: document.querySelector(".viewport"),
  platform: document.querySelector(".platform"),
  getObstacleElements(){return document.querySelectorAll(".obstacle")},
  obstacleElement: document.querySelectorAll(".obstacle"),
};
const gameConfiguration = {
  minDistanceBetweenObstacles: 150,
  maxDistanceBetweenObstacles: 600,
  gameSpeed : 1,
  viewportWidth : htmlObjects.viewport.offsetWidth,
  platformWidth: htmlObjects.platform.offsetWidth,
}

function obstacleCreator() {
  let minimalDistance = gameConfiguration.minDistanceBetweenObstacles;
  let maximalDistance = gameConfiguration.maxDistanceBetweenObstacles;
  let actualPositionOnPlatform = gameConfiguration.viewportWidth;
  
  while(actualPositionOnPlatform <= gameConfiguration.platformWidth - gameConfiguration.viewportWidth ){
    let newObstacle = document.createElement("div");
    let obstaclePosition = actualPositionOnPlatform;
    newObstacle.style.left = `${obstaclePosition}px`;
    newObstacle.classList.add("obstacle");
    htmlObjects.platform.appendChild(newObstacle);
    obstaclePosition = actualPositionOnPlatform + minimalDistance + Math.random() * (maximalDistance-minimalDistance);
    actualPositionOnPlatform = obstaclePosition;
   
  };
  };

function gameMove(){
  const moveInterval = setInterval(() => {
    let platformOffset = htmlObjects.platform.offsetLeft;
    if(platformOffset + gameConfiguration.platformWidth  > gameConfiguration.viewportWidth){
   htmlObjects.platform.style.left = `${htmlObjects.platform.offsetLeft - 2}px`;
    }else{clearInterval(moveInterval);}
    console.log(platformOffset + gameConfiguration.platformWidth)
 },10 /gameConfiguration.gameSpeed)

}

obstacleCreator();
gameMove();




