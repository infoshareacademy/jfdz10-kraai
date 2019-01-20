const htmlObjects = {
  viewport: document.querySelector(".viewport"),
  platform: document.querySelector(".platform"),
  getObstacleElements(){return document.querySelectorAll(".obstacle")},
  getCandyElements(){return document.querySelectorAll(".candy")},
};
const gameConfiguration = {
  minDistanceBetweenObstacles: 150,
  maxDistanceBetweenObstacles: 600,
  minDistanceBetweenCandy: 100,
  maxDistanceBetweenCandy: 300,
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
 },10 /gameConfiguration.gameSpeed)

}


function candyCreator(){
  let obstacleArr = Array.from(htmlObjects.getObstacleElements());
 
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
let candyArr = Array.from(htmlObjects.getCandyElements())
  let allObstaclePositions = obstacleArr.map(obstacle => {
    return {
      left: obstacle.offsetLeft,
      right: obstacle.offsetLeft + obstacle.offsetWidth,
    }
  });
  let allCandyPosition = candyArr.map(candy => {
    return {
      left: candy.offsetLeft,
      right: candy.offsetLeft + candy.offsetWidth,
    }
  });

  let filteredCandy = allCandyPosition.filter(candy => {
    allObstaclePositions.forEach(obstacle => {
      return candy.left >= obstacle.left;
    })
  });
 
  console.log(filteredCandy);
}

obstacleCreator();
candyCreator();
gameMove();
