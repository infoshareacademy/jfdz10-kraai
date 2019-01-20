const scoreTable = document.querySelector(".score");
const score = document.createElement("span");
scoreTable.appendChild(score);

score.innerHTML = 0;

function candyMaker() {
  const space = document.querySelector(".platform");
  let candy = document.createElement("div");
  candy.className = "candy";
  space.appendChild(candy);
  candy.style.bottom = Math.floor(Math.random() * 200 + 150) + "px";
  candy.style.right = Math.floor(Math.random() * 100 + 1) + "%";
}

setInterval(candyMaker, 1000);
