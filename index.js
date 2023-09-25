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
const speed = 7; // Define a velocidade aqui
let score = 0; // Inicialize a pontuação
let gameOverSquare = { x: -1, y: -1 }; // Inicialize com valores que não são válidos
let isGameRunning = true;

function clearScreen() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGame() {
  if (isGameRunning) {
    changeSnakePosition();
    clearScreen();
    drawSnake();
    checkCollision();
    drawApple();
    drawScore();
    setTimeout(drawGame, 1000 / speed);
  }
}

function isGameOver() {
  let gameOver = false;

  if (headX < 0 || headX >= tileCount || headY < 0 || headY >= tileCount) {
    gameOver = true; // Game over se a cobra sair dos limites do campo
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true; // Game over se a cobra colidir com ela mesma
      gameOverSquare.x = headX; // Armazene as coordenadas do quadrado onde ocorreu a colisão
      gameOverSquare.y = headY;
      break;
    }
  }

  if (gameOver) {
    isGameRunning = false; // Pausa o jogo
    ctx.fillStyle = 'orange'; // Defina a cor laranja
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Preencha a tela com a cor laranja
    ctx.fillStyle = 'white';
    ctx.font = '50px verdana';
    ctx.fillText('Game Over!', canvas.clientWidth / 6.5, canvas.clientHeight / 2);
  }

  return gameOver;
}

function checkCollision() {
  if (appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }
}

function drawSnake() {
  for (let i = 0; i < snakeParts.length; i++) {
    const part = snakeParts[i];
    if (gameOverSquare.x === part.x && gameOverSquare.y === part.y) {
      ctx.fillStyle = 'orange'; // Defina a cor laranja para o quadrado da colisão
    } else {
      ctx.fillStyle = 'green'; // Use a cor verde para os outros quadrados da cobra
    }
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }
}

function drawApple() {
  ctx.fillStyle = 'red';
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  const newHeadX = (headX + xVelocity + tileCount) % tileCount;
  const newHeadY = (headY + yVelocity + tileCount) % tileCount;

  headX = newHeadX;
  headY = newHeadY;

  snakeParts.unshift({ x: headX, y: headY });

  if (snakeParts.length > tailLength) {
    snakeParts.pop();
  }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
  if (isGameRunning) {
    switch (event.keyCode) {
      case 38: // Seta para cima
        if (yVelocity !== 1) {
          yVelocity = -1;
          xVelocity = 0;
        }
        break;
      case 40: // Seta para baixo
        if (yVelocity !== -1) {
          yVelocity = 1;
          xVelocity = 0;
        }
        break;
      case 37: // Seta para a esquerda
        if (xVelocity !== 1) {
          yVelocity = 0;
          xVelocity = -1;
        }
        break;
      case 39: // Seta para a direita
        if (xVelocity !== -1) {
          yVelocity = 0;
          xVelocity = 1;
        }
        break;
    }
  } else {
    // Se o jogo estiver parado e a tecla Enter for pressionada, reinicie o jogo
    if (event.keyCode === 13) {
      restartGame();
    }
  }
}

function restartGame() {
  isGameRunning = true;
  headX = 10;
  headY = 10;
  xVelocity = 0;
  yVelocity = 0;
  appleX = 5;
  appleY = 5;
  tailLength = 2;
  snakeParts.length = 0;
  score = 0;
  gameOverSquare = { x: -1, y: -1 };
  clearScreen();
  drawGame();
}

// Classe para partes da cobra
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

// Iniciar o jogo com uma direção inicial para a cobra
xVelocity = 1; // Começar indo para a direita

drawGame();
