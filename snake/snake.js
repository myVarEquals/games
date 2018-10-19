const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const SNAKE_SIZE = 25;

window.onload = function() {
    drawBackground();
    draw();
}

function drawBackground() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cvs.width,cvs.height);
}

function drawSnake(x,y) {
    ctx.fillStyle = "lime";
    ctx.fillRect(x*SNAKE_SIZE, y*SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE);

    ctx.fillStyle = "white";
    ctx.strokeRect(x*SNAKE_SIZE, y*SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE);
}

// create snake
var len = 4;
var snake = [];

for (i = len - 1; i >= 0; i--) {
    snake.push(
        {
        x: i,
        y: 0
        }
    )
}

function draw() {
    for (i = 0; i < snake.length; i++) {
        var x = snake[i].x;
        var y = snake[i].y;
        drawSnake(x,y);
    }
}

draw();
