var htmlObjects = {
  viewport: document.querySelector(".viewport"),
  platform: document.querySelector(".platform"),
  obstacleElement: document.querySelectorAll(".obstacle")
};

const obstacle = htmlObjects.obstacleElement;
const platform = htmlObjects.platform;
const maxObstacles = 4;
var obstacleCount = 0;

function obstacleCreator() {
  if (obstacle.length <= maxObstacles) {
    let newObstacle = document.createElement("div");
    newObstacle.classList.add("obstacle");
    platform.appendChild(newObstacle);
    countObstacle(1);
  }
}

function countObstacle(amount) {
  obstacleCount = obstacleCount + amount;
}




