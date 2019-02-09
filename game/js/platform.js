let speedLevel = 1;
let level = 1;
 
const htmlObjects = {
  viewport: document.querySelector(".viewport"),
  platform: document.querySelector('.platform'),
  platform1: document.querySelector(".platform1"),
  platform2: document.querySelector(".platform2"),
  platform3: document.querySelector(".platform3"),
  platform4: document.querySelector(".platform4"),
  levelCounter: document.querySelector(".level"),
  background: document.querySelector(".background"),
  backgroundLayer1: document.querySelector(".layer1"),
  backgroundLayer2: document.querySelector(".layer2"),
  backgroundLayer3: document.querySelector(".layer3"),
  character: document.querySelector(".character"),
  getObstacleElements() {
    return document.querySelectorAll(".obstacle")
  },
  getObstaclePositions() {
    return Array.from(this.getObstacleElements())
      .map(element => ({
        width: element.offsetWidth,
        height: element.offsetHeight,
        left: element.offsetLeft,
        right: element.offsetLeft + element.offsetWidth,
        top: element.offsetTop,
        down: element.offsetTop + element.offsetHeight,
      }))
  },
  getCandyElements() {
    return document.querySelectorAll(".candy")
  },
  getCharacterPosition() {
    return {
      width: this.character.offsetWidth -10,
        height: this.character.offsetHeight,
        left: this.character.offsetLeft - this.platform.offsetLeft ,
        right: this.character.offsetLeft + this.character.offsetWidth - this.platform.offsetLeft  +30,
        top: this.character.offsetTop - this.background.offsetHeight + this.platform.offsetHeight,
        down: this.character.offsetTop + this.character.offsetHeight,
    }
  },
};
const levelDisplay = () => htmlObjects.levelCounter.innerHTML = `Level ${level}`;

let gameConfiguration = {
  minDistanceBetweenObstacles: 800 ,
  maxDistanceBetweenObstacles: 1200 ,
  minDistanceBetweenCandy: 100,
  maxDistanceBetweenCandy: 100,
  maxCandySet: 6,
  maxCandyTop: -200,
  gameSpeed: 5 * speedLevel,
  viewportWidth: htmlObjects.viewport.offsetWidth,
  platformWidth: htmlObjects.platform.offsetWidth,
  isPlatformEnd: false,
  gameSpeed(){return 5 * speedLevel}
}

const obstacleCreator = () => {
  let minimalDistance = gameConfiguration.minDistanceBetweenObstacles;
  let maximalDistance = gameConfiguration.maxDistanceBetweenObstacles;
  let obstaclePositionOnPlatform = gameConfiguration.viewportWidth;

  while (obstaclePositionOnPlatform <= gameConfiguration.platformWidth ) {
    let newObstacle = document.createElement("div");
    newObstacle.style.left = `${obstaclePositionOnPlatform}px`;
    newObstacle.classList.add("obstacle");
    htmlObjects.platform.appendChild(newObstacle);
    obstaclePositionOnPlatform = obstaclePositionOnPlatform + minimalDistance + Math.random() * (maximalDistance - minimalDistance);
  };
};

const candyCreator = (time) => {
  let candyInterval = setTimeout(() => {
    let minimalDistance = gameConfiguration.minDistanceBetweenCandy;
    let elementLeft = htmlObjects.platform.offsetLeft * -1 + gameConfiguration.viewportWidth + minimalDistance;
    for (let i = 0; i < Math.random() * gameConfiguration.maxCandySet; i++) {
      let newCandy = document.createElement("div");
      newCandy.style.left = `${elementLeft}px`;
      newCandy.classList.add("candy");
      htmlObjects.platform.appendChild(newCandy);
      let newCandyPosition = {
        width: newCandy.offsetWidth + 50,
        height: newCandy.offsetHeight,
        left: newCandy.offsetLeft ,
        right: newCandy.offsetLeft + newCandy.offsetWidth,
        top: newCandy.offsetTop,
        down: newCandy.offsetTop + newCandy.offsetHeight,
      };
      htmlObjects.getObstaclePositions().forEach(obstacle => {
        if (checkCollisionX(newCandyPosition, obstacle)) {
          newCandy.style.top = `${gameConfiguration.maxCandyTop}px`;
        }
      });
      elementLeft += minimalDistance;
    };
    candyCreator(Math.random() * 3000 + 1000);
  }, time);
};


const checkingPlatformEnd = () => {
  let platformOffset = htmlObjects.platform.offsetLeft;
  return platformOffset + gameConfiguration.platformWidth > gameConfiguration.viewportWidth;
};
const gameMove = () => {
  const moveInterval = setInterval(() => {
      htmlObjects.platform.style.left = `${htmlObjects.platform.offsetLeft - gameConfiguration.gameSpeed()}px`;
      htmlObjects.backgroundLayer1.style.backgroundPositionX = `${parseFloat(window.getComputedStyle(htmlObjects.backgroundLayer1).backgroundPositionX) - gameConfiguration.gameSpeed() /8}px`;
      htmlObjects.backgroundLayer2.style.backgroundPositionX = `${parseFloat(window.getComputedStyle(htmlObjects.backgroundLayer2).backgroundPositionX) - gameConfiguration.gameSpeed() /6}px`;
      htmlObjects.backgroundLayer3.style.backgroundPositionX = `${parseFloat(window.getComputedStyle(htmlObjects.backgroundLayer3).backgroundPositionX) - gameConfiguration.gameSpeed() /4}px`;
      obstacleColision(moveInterval);
      levelUp();
  }, 10)

}
const obstacleColision = (interval) => {
  htmlObjects.getObstaclePositions().forEach(obstacle => {
    if (checkCollisionX(htmlObjects.getCharacterPosition(), obstacle) && checkCollisionY(htmlObjects.getCharacterPosition(), obstacle)) {
      console.log('collision!');
      clearInterval(interval);
    }
  });
}


const checkCollisionX = (objectX, objectY) => {
  return (objectY.left - objectX.left >= 0 && objectY.left - objectX.left <= objectX.width) || (objectX.right - objectY.right >= 0 && objectX.right - objectY.right <= objectX.width)
}

const checkCollisionY = (objectX, objectY) => {
  return (objectY.top - objectX.top >= 0 && objectY.top - objectX.top <= objectX.height) || (objectX.down - objectY.down >= 0 && objectX.down - objectY.down <= objectX.height)
}

const levelUp = () => {
 if(htmlObjects.platform2.offsetLeft + htmlObjects.platform.offsetLeft < 0){
    speedLevel = 1.5;
    level = 2
 };
 if(htmlObjects.platform3.offsetLeft + htmlObjects.platform.offsetLeft < 0){
  speedLevel = 2;
  level = 3;
};
if(htmlObjects.platform4.offsetLeft + htmlObjects.platform.offsetLeft < 0){
  speedLevel = 2.5;
  level = 4;
};
levelDisplay();
};

obstacleCreator();
candyCreator(0);
gameMove();
levelDisplay();