const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 20;
const gridSize = canvas.width / tileSize;
const snake = [{ x: 5, y: 5 }];
const apple = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
let dx = 0;
let dy = 0;
let gameOver = false;

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });
}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);
}

function checkCollision() {
    if (snake[0].x < 0 || snake[0].x >= gridSize || snake[0].y < 0 || snake[0].y >= gridSize) {
        return true; // Game over if snake hits the wall
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true; // Game over if snake collides with itself
        }
    }

    return false;
}

function update() {
    if (gameOver) return; // Não atualize o jogo se estiver no modo Game Over

    const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(newHead);

    if (newHead.x === apple.x && newHead.y === apple.y) {
        // Snake ate the apple, generate a new apple
        apple.x = Math.floor(Math.random() * gridSize);
        apple.y = Math.floor(Math.random() * gridSize);
    } else {
        // Remove the tail segment if the snake didn't eat the apple
        snake.pop();
    }

    if (checkCollision()) {
        gameOver = true;
    }
}

function restartGame() {
    snake.length = 1; // Reset the snake to a single segment
    snake[0] = { x: 5, y: 5 }; // Reset the snake's position
    apple.x = Math.floor(Math.random() * gridSize); // Reset the apple's position
    apple.y = Math.floor(Math.random() * gridSize);
    dx = 0; // Reset the direction
    dy = 0;
    gameOver = false;
}

function gameLoop() {
    clearCanvas();
    drawSnake();
    drawApple();
    update();

    if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2);
        ctx.font = '20px Arial';
        ctx.fillText('Pressione a barra de espaço para reiniciar', canvas.width / 2 - 150, canvas.height / 2 + 30);
    } else {
        requestAnimationFrame(gameLoop); // Continue the game loop
    }
}

document.addEventListener('keydown', (event) => {
    if (gameOver && event.key === ' ') {
        restartGame();
        gameLoop(); // Start the game loop again
    } else if (!gameOver) {
        switch (event.key) {
            case 'ArrowUp':
                if (dy !== 1) {
                    dx = 0;
                    dy = -1;
                }
                break;
            case 'ArrowDown':
                if (dy !== -1) {
                    dx = 0;
                    dy = 1;
                }
                break;
            case 'ArrowLeft':
                if (dx !== 1) {
                    dx = -1;
                    dy = 0;
                }
                break;
            case 'ArrowRight':
                if (dx !== -1) {
                    dx = 1;
                    dy = 0;
                }
                break;
        }
    }
});

gameLoop();
