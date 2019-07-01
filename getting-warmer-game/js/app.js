var app = {
  handlers: {},
  settings: {
    gameWidth: game.offsetWidth,
    gameHeight: game.offsetHeight,
    px: document.getElementById("px"),
    py: document.getElementById("py"),
    ds: document.getElementById("ds"),
  },
  utils: {},
};

// EVENT HANDLERS
app.handlers.onResize = () => {
  app.settings.gameWidth = game.offsetWidth;
  app.settings.gameHeight = game.offsetHeight;
  app.utils.checkGoalLocation();
}

app.handlers.checkIfFound = event => {
  const distance = app.utils.calcDistance(event.pageX, event.pageY);
  app.settings.ds.value = distance;
  app.settings.px.value = event.pageX;
  app.settings.py.value = event.pageY;
  app.utils.setBgColor(distance);
}

app.handlers.winnerPrompt = () => {
  const restart = confirm("Congrats! Want to play again?");
  if (restart) app.utils.setGoal();
}

// UTILITIES
app.utils.checkGoalLocation = () => {
  const {gameWidth, gameHeight} = app.settings;
  const goalLeft = parseInt(goal.style.left) + 30;
  const goalTop = parseInt(goal.style.top) + 30;
  if (goalLeft > gameWidth || goalTop > gameHeight) app.utils.setGoal();
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
  document.getElementById('game').setAttribute('style', `background-color: rgba(255, 0, 0, ${14/distance})`);
}

// EVENT LISTENERS
window.addEventListener('resize', app.handlers.onResize, false);
document.addEventListener('mousemove', app.handlers.checkIfFound, false); // Move updates position
goal.onmouseover = app.handlers.winnerPrompt;

// ON LOAD INITIALIZATION
document.onload = (() => {
  goal.style.top = "0px";
  goal.style.left = "0px";
  app.utils.setGoal();
})();
