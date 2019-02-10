let gameOnOrOff = 0;
let score;
let song = new Audio('sounds/happysong.mp3')
let localScoreKey = 'score';
let nickField = document.querySelector('#nick');
let localScoreValue = JSON.parse(localStorage.getItem(localScoreKey)) || [];
const createScoreTable = () => {
  let sortedScores = localScoreValue.sort((prev, next) => next.points - prev.points).filter((element, index) => {
    if (index < 5) {
      return element
    }
  });
  let scoreTable = document.querySelector('.topscore');
  let scoresAsOlTable = sortedScores.map(el => `${el.points}      :      ${el.nick}`);
  if (JSON.parse(localStorage.getItem(localScoreKey))) {
    scoreTable.innerHTML = `<h1> Najlepsze wyniki</h1>
    <ol>
    <li>${scoresAsOlTable[0] || 0}</li>
    <li>${scoresAsOlTable[1] || 0}</li>
    <li>${scoresAsOlTable[2] || 0}</li>
    <li>${scoresAsOlTable[3] || 0}</li>
    <li>${scoresAsOlTable[4] || 0}</li>
    </ol>`
  }
}
createScoreTable();

const gameStart = () => {
  song.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
  }, false);
 
  let speedLevel = 1;
  let level = 1;
  score = 0;
  time = 100;
  let carotSound = new Audio('sounds/carot.wav');
  let gameOverSound = new Audio('sounds/angry.wav');

  const htmlObjects = {
    viewport: document.querySelector(".viewport"),
    platform: document.querySelector(".platform"),
    platform1: document.querySelector(".platform1"),
    platform2: document.querySelector(".platform2"),
    platform3: document.querySelector(".platform3"),
    platform4: document.querySelector(".platform4"),
    levelCounter: document.querySelector(".level"),
    scoreCounter: document.querySelector(".score"),
    scoreDisplay: document.querySelector(".showScore"),
    musicBox: document.querySelector('#musicBox'),
    backgroundBox: document.querySelector('#backgroundBox'),
    menu: document.querySelector(".start-menu"),
    background: document.querySelector(".background"),
    backgroundLayer1: document.querySelector(".layer1"),
    backgroundLayer2: document.querySelector(".layer2"),
    backgroundLayer3: document.querySelector(".layer3"),
    submitScore: document.querySelector('.score-submit '),
    character: document.querySelector(".character"),
    getObstacleElements() {
      return document.querySelectorAll(".obstacle");
    },
    getObstaclePositions() {
      return Array.from(this.getObstacleElements()).map(element => ({
        width: element.offsetWidth,
        height: element.offsetHeight,
        left: element.offsetLeft,
        right: element.offsetLeft + element.offsetWidth,
        top: element.offsetTop,
        down: element.offsetTop + element.offsetHeight
      }));
    },
    getCandyElements() {
      return document.querySelectorAll(".candy");
    },
    getCandyPositions() {
      return Array.from(this.getCandyElements()).map((element, index) => ({
        width: element.offsetWidth,
        height: element.offsetHeight,
        left: element.offsetLeft,
        right: element.offsetLeft + element.offsetWidth,
        top: element.offsetTop,
        down: element.offsetTop + element.offsetHeight,
        index: index
      }));
    },
    getCharacterPosition() {
      return {
        width: this.character.offsetWidth - 10,
        height: this.character.offsetHeight,
        left: this.character.offsetLeft - this.platform.offsetLeft,
        right: this.character.offsetLeft +
          this.character.offsetWidth -
          this.platform.offsetLeft +
          30,
        top: this.character.offsetTop -
          this.background.offsetHeight +
          this.platform.offsetHeight,
        down: this.character.offsetTop + this.character.offsetHeight
      };
    }
  };
  if(htmlObjects.musicBox.checked){
    song.play();
    };
    if(!htmlObjects.backgroundBox.checked){
      htmlObjects.backgroundLayer3.classList.add('display-none');
      htmlObjects.backgroundLayer2.classList.add('display-none');
      htmlObjects.backgroundLayer1.classList.add('display-none');
      };
  
  htmlObjects.scoreCounter.textContent = score;

  const gameRestart = () => {
    gameOnOrOff = 1;
    htmlObjects.platform.style.left = 0;
    htmlObjects.getCandyElements().forEach(element => element.remove());
    htmlObjects.getObstacleElements().forEach(element => element.remove());
    htmlObjects.levelCounter.classList.remove("display-none");
    htmlObjects.scoreCounter.classList.remove("display-none");
    htmlObjects.menu.classList.add("display-none");
  };
  gameRestart();

  const levelDisplay = () =>
    (htmlObjects.levelCounter.innerHTML = `Level ${level}`);

  let gameConfiguration = {
    minDistanceBetweenObstacles: 800,
    maxDistanceBetweenObstacles: 1200,
    minDistanceBetweenCandy: 100,
    maxDistanceBetweenCandy: 100,
    maxCandySet: 6,
    maxCandyTop: -200,
    viewportWidth: htmlObjects.viewport.offsetWidth,
    platformWidth: htmlObjects.platform.offsetWidth,
    isPlatformEnd: false,
    gameSpeed() {
      return 5 * speedLevel;
    }
  };

  const obstacleCreator = () => {
    let minimalDistance = gameConfiguration.minDistanceBetweenObstacles;
    let maximalDistance = gameConfiguration.maxDistanceBetweenObstacles;
    let obstaclePositionOnPlatform = gameConfiguration.viewportWidth;

    while (obstaclePositionOnPlatform <= gameConfiguration.platformWidth) {
      let newObstacle = document.createElement("div");
      newObstacle.style.left = `${obstaclePositionOnPlatform}px`;
      newObstacle.classList.add("obstacle");
      htmlObjects.platform.appendChild(newObstacle);
      obstaclePositionOnPlatform =
        obstaclePositionOnPlatform +
        minimalDistance +
        Math.random() * (maximalDistance - minimalDistance);
    }
  };

  const candyCreator = time => {
    let candyTimeout = setTimeout(() => {
      if (gameOnOrOff === 0) {
        clearTimeout(candyTimeout);
      } else {
        let minimalDistance = gameConfiguration.minDistanceBetweenCandy;
        let elementLeft =
          htmlObjects.platform.offsetLeft * -1 +
          gameConfiguration.viewportWidth +
          minimalDistance;
        for (
          let i = 0; i < Math.random() * gameConfiguration.maxCandySet; i++
        ) {
          let newCandy = document.createElement("div");
          newCandy.style.left = `${elementLeft}px`;
          newCandy.classList.add("candy");
          htmlObjects.platform.appendChild(newCandy);
          let newCandyPosition = {
            width: newCandy.offsetWidth + 50,
            height: newCandy.offsetHeight,
            left: newCandy.offsetLeft,
            right: newCandy.offsetLeft + newCandy.offsetWidth,
            top: newCandy.offsetTop,
            down: newCandy.offsetTop + newCandy.offsetHeight
          };
          htmlObjects.getObstaclePositions().forEach(obstacle => {
            if (checkCollisionX(newCandyPosition, obstacle)) {
              newCandy.style.top = `${gameConfiguration.maxCandyTop}px`;
            }
          });
          elementLeft += minimalDistance;
        }
        candyCreator(Math.random() * 3000 + 1000);
      }
    }, time);
  };

  const gameMove = () => {
    const moveInterval = setInterval(() => {
      htmlObjects.platform.style.left = `${htmlObjects.platform.offsetLeft - gameConfiguration.gameSpeed()}px`;
      htmlObjects.backgroundLayer1.style.backgroundPositionX = `${parseFloat(window.getComputedStyle(htmlObjects.backgroundLayer1).backgroundPositionX) - gameConfiguration.gameSpeed() /8}px`;
      htmlObjects.backgroundLayer2.style.backgroundPositionX = `${parseFloat(window.getComputedStyle(htmlObjects.backgroundLayer2).backgroundPositionX) - gameConfiguration.gameSpeed() /6}px`;
      htmlObjects.backgroundLayer3.style.backgroundPositionX = `${parseFloat(window.getComputedStyle(htmlObjects.backgroundLayer3).backgroundPositionX) - gameConfiguration.gameSpeed() /4}px`;
      obstacleColision(moveInterval);
      levelUp();
    }, 10);
  };
  const obstacleColision = interval => {
    htmlObjects.getObstaclePositions().forEach(obstacle => {
      if (
        checkCollisionX(htmlObjects.getCharacterPosition(), obstacle) &&
        checkCollisionY(htmlObjects.getCharacterPosition(), obstacle)
      ) {
        clearInterval(interval);
        gameOver();
      }
    });
  };

  const candyColision = () => {
    htmlObjects.getCandyPositions().forEach(candy => {
      if (
        checkCollisionX(htmlObjects.getCharacterPosition(), candy) &&
        checkCollisionY(htmlObjects.getCharacterPosition(), candy)
      ) {
        carotSound.play();
        score += 1;
        htmlObjects.scoreCounter.textContent = score;
        htmlObjects.getCandyElements()[candy.index].remove();
      }
    });
  };

  const candyPointsCounter = () => {
    setInterval(candyColision, 100);
  };

  const gameOver = () => {
    htmlObjects.scoreDisplay.textContent = score
    song.pause();
    song.currentTime = 0;
    gameOverSound.play();
    gameOnOrOff = 0;
    time = 1000;
    htmlObjects.levelCounter.classList.add("display-none");
    htmlObjects.scoreCounter.classList.add("display-none");
    htmlObjects.submitScore.classList.remove('display-none');

  };

  const checkCollisionX = (objectX, objectY) => {
    return (
      (objectY.left - objectX.left >= 0 &&
        objectY.left - objectX.left <= objectX.width) ||
      (objectX.right - objectY.right >= 0 &&
        objectX.right - objectY.right <= objectX.width)
    );
  };

  const checkCollisionY = (objectX, objectY) => {
    return (
      (objectY.top - objectX.top >= 0 &&
        objectY.top - objectX.top <= objectX.height) ||
      (objectX.down - objectY.down >= 0 &&
        objectX.down - objectY.down <= objectX.height)
    );
  };

  const levelUp = () => {
    if (
      htmlObjects.platform2.offsetLeft + htmlObjects.platform.offsetLeft <
      0
    ) {
      speedLevel = 1.5;
      level = 2;
    }
    if (
      htmlObjects.platform3.offsetLeft + htmlObjects.platform.offsetLeft <
      0
    ) {
      speedLevel = 2;
      level = 3;
    }
    if (
      htmlObjects.platform4.offsetLeft + htmlObjects.platform.offsetLeft <
      0
    ) {
      speedLevel = 2.5;
      level = 4;
    }
    levelDisplay();
  };

  obstacleCreator();
  candyCreator(0);
  gameMove();
  levelDisplay();
  candyPointsCounter();
};
const scoreSubmit = () => {
  localScoreValue.push({
    nick: nickField.value,
    points: score
  });
  localStorage.setItem(localScoreKey, JSON.stringify(localScoreValue));
}