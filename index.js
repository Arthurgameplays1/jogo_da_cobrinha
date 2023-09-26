const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const tileCount = 20;
const tileSize = 18;
let headX = 10;
let headY = 10;
let xVelocity = 0;
let yVelocity = 0;
let appleX = 5;
let appleY = 5;
let tailLength = 2;
const snakeParts = [];
const speed = 7; // Define the speed here
let score = 0; // Initialize the score

function clearScreen() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGame() {
  changeSnakePosition();
  clearScreen();
  drawSnake();
  checkCollision();
  drawApple();
  drawScore();
  setTimeout(drawGame, 1000 / speed);
}

function checkCollision() {
  if (appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }

  if (headX < 0 || headY < 0 || headX >= tileCount || headY >= tileCount) {
    // Game over logic
    location.reload(); // Reload the page when game over occurs
    return;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    const part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      // Game over logic
      location.reload(); // Reload the page when game over occurs
      return;
    }
  }
}

function drawSnake() {
  ctx.fillStyle = 'green';
  for (let i = 0; i < snakeParts.length; i++) {
    const part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }
  snakeParts.push(new snakePart(headX, headY));
  while (snakeParts.length > tailLength) {
    snakeParts.shift(); // Remove the tail if it's too long
  }
}

function drawApple() {
  ctx.fillStyle = 'red';
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  const newHeadX = headX + xVelocity;
  const newHeadY = headY + yVelocity;

  // Check for collision with walls (game over condition)
  if (newHeadX < 0 || newHeadX >= tileCount || newHeadY < 0 || newHeadY >= tileCount) {
    // Game over logic
    location.reload(); // Reload the page when game over occurs
    return;
  }

  headX = newHeadX;
  headY = newHeadY;
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
  switch (event.keyCode) {
    case 38: // Up arrow
      if (yVelocity !== 1) {
        yVelocity = -1;
        xVelocity = 0;
      }
      break;
    case 40: // Down arrow
      if (yVelocity !== -1) {
        yVelocity = 1;
        xVelocity = 0;
      }
      break;
    case 37: // Left arrow
      if (xVelocity !== 1) {
        yVelocity = 0;
        xVelocity = -1;
      }
      break;
    case 39: // Right arrow
      if (xVelocity !== -1) {
        yVelocity = 0;
        xVelocity = 1;
      }
      break;
  }
}

// Class for snake parts
class snakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '10px Verdana';
  ctx.fillText('Score: ' + score, canvas.clientWidth - 50, 10);
}

drawGame();
