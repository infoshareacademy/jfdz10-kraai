const htmlObjects = {
  viewport: document.querySelector(".viewport"),
  platform: document.querySelector(".platform"),
  getObstacleElements() {return document.querySelectorAll(".obstacle")},
  getObstaclePositions() { return Array.from(this.getObstacleElements())
    .map(element =>({
      width: element.offsetWidth,
      height: element.offsetHeight,
      left: element.offsetLeft,
      right: element.offsetLeft + element.offsetWidth,
      top: element.offsetTop,
      down: element.offsetTop + element.offsetHeight,
    })
    )
  },
  getCandyElements() {return document.querySelectorAll(".candy")},
};
const gameConfiguration = {
  minDistanceBetweenObstacles: 600,
  maxDistanceBetweenObstacles: 1200,
  minDistanceBetweenCandy: 100,
  maxDistanceBetweenCandy: 300,
  gameSpeed : 5,
  viewportWidth : htmlObjects.viewport.offsetWidth,
  platformWidth: htmlObjects.platform.offsetWidth,
  isPlatformEnd: false,
}

const obstacleCreator = () => {
  let minimalDistance = gameConfiguration.minDistanceBetweenObstacles;
  let maximalDistance = gameConfiguration.maxDistanceBetweenObstacles;
  let obstaclePositionOnPlatform = gameConfiguration.viewportWidth;
  
  while(obstaclePositionOnPlatform <= gameConfiguration.platformWidth - gameConfiguration.viewportWidth ){
    let newObstacle = document.createElement("div");
    let obstaclePosition = obstaclePositionOnPlatform;
    newObstacle.style.left = `${obstaclePosition}px`;
    newObstacle.classList.add("obstacle");
    htmlObjects.platform.appendChild(newObstacle);
    obstaclePosition = obstaclePositionOnPlatform + minimalDistance + Math.random() * (maximalDistance-minimalDistance);
    obstaclePositionOnPlatform = obstaclePosition;
  };
  };
const checkingPlatformEnd = () => {
  let platformOffset = htmlObjects.platform.offsetLeft;
  return platformOffset + gameConfiguration.platformWidth  > gameConfiguration.viewportWidth;
};
const gameMove = () => {
  const moveInterval = setInterval(() => {
    if(checkingPlatformEnd()){
   htmlObjects.platform.style.left = `${htmlObjects.platform.offsetLeft - gameConfiguration.gameSpeed}px`;
    }else{clearInterval(moveInterval);}
 },10)

}

function candyCreator(){ 
  let minimalDistance = gameConfiguration.minDistanceBetweenCandy;
  let maximalDistance = gameConfiguration.maxDistanceBetweenCandy;
  let actualPositionOnPlatform = gameConfiguration.viewportWidth;
  
  while(actualPositionOnPlatform <= gameConfiguration.platformWidth - gameConfiguration.viewportWidth ){
    let newCandy = document.createElement("div");
    let candyPosition = actualPositionOnPlatform;
    newCandy.style.left = `${candyPosition}px`;
    newCandy.classList.add("candy");
    htmlObjects.platform.appendChild(newCandy);
    candyPosition = actualPositionOnPlatform + minimalDistance + Math.random() * (maximalDistance-minimalDistance);
    actualPositionOnPlatform = candyPosition;
}
}

const checkCollisionX = (objectX, objectY) => {

  if ((objectY.left - objectX.left >= 0 && objectY.left - objectX.left <= objectX.width) || (objectX.right - objectY.right >= 0 && objectX.right - objectY.right <= objectX.width)) {
      return true;
  } else {
      return false;
  };
}

const checkCollisionY = (objectX, objectY) => {
  if ((objectY.top - objectX.top >= 0 && objectY.top - objectX.top <= objectX.height) || (objectX.down - objectY.down >= 0 && objectX.down - objectY.down <= objectX.height)) {
      return true
  } else {
      return false
  }
}

obstacleCreator();
candyCreator();
gameMove();
