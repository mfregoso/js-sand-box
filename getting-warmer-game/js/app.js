var app = {
  handlers: {},
  settings: {
    gameWidth: game.offsetWidth,
    gameHeight: game.offsetHeight,
    paused: true,
  },
  utils: {},
  el: {
    px: document.getElementById("px"),
    py: document.getElementById("py"),
    ds: document.getElementById("ds"),
    modal: document.getElementById("modal-container"),
    gameBox: document.getElementById("game"),
  },
  startUp: () => {
    goal.style.top = "0px";
    goal.style.left = "0px";
    app.settings.bgColor = getComputedStyle(document.body).backgroundColor;
  }
};

// EVENT HANDLERS
app.handlers.onResize = () => {
  app.settings.gameWidth = game.offsetWidth;
  app.settings.gameHeight = game.offsetHeight;
  app.utils.checkGoalLocation();
}

app.handlers.checkIfFound = event => {
  if (!app.settings.paused) {
    const distance = app.utils.calcDistance(event.pageX, event.pageY);
    app.el.ds.value = distance;
    app.el.px.value = event.pageX;
    app.el.py.value = event.pageY;
    app.utils.setBgColor(distance);
  }
}

app.handlers.winnerPrompt = () => {
  if (!app.settings.paused) {
    app.el.gameBox.setAttribute("style", "background-color: rgb(116, 34, 34)");
    app.el.modal.style.display = "flex";
    app.settings.paused = true;
  }
}

app.handlers.startGame = () => {
  app.el.gameBox.setAttribute("style", `background-color: ${app.settings.bgColor}`);
  app.utils.setGoal();
  app.settings.paused = false;
  app.el.modal.style.display = "none";
  document.querySelector("#modal > p").innerHTML = "<h3>Congrats, you found it! Want to play again?</h3>";
}

// UTILITIES
app.utils.checkGoalLocation = () => {
  const {gameWidth, gameHeight} = app.settings;
  const leftOffset = parseInt(goal.style.left) + 30;
  const topOffset = parseInt(goal.style.top) + 30;
  if (leftOffset > gameWidth || topOffset > gameHeight) app.utils.setGoal();
}

app.utils.setGoal = () => {
  const {gameWidth, gameHeight} = app.settings;
  const leftOffset = Math.floor(Math.random() * (gameWidth - 30));
  const topOffset = Math.floor(Math.random() * (gameHeight - 30));
  goal.style.left = leftOffset + "px";
  goal.style.top = topOffset + "px";
}

app.utils.calcDistance = (mouseX, mouseY) => {
  const goalX = parseInt(goal.style.left) + 10;
  const goalY = parseInt(goal.style.top) + game.offsetTop + 10;
  const sqrdHypot = Math.abs(goalX - mouseX) ** 2 + Math.abs(goalY - mouseY) ** 2;
  return Math.sqrt(sqrdHypot);
};

app.utils.setBgColor = distance => {
  app.el.gameBox.setAttribute("style", `background-color: rgba(255, 0, 0, ${14/distance})`);
}

// EVENT LISTENERS
window.addEventListener("resize", app.handlers.onResize, false);
document.addEventListener("mousemove", app.handlers.checkIfFound, false);
document.addEventListener("ontouchmove", app.handlers.checkIfFound, false);
goal.onmouseover = app.handlers.winnerPrompt;
start.onclick = app.handlers.startGame;

// ON LOAD INITIALIZATION
document.onload = app.startUp();
