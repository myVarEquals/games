const cvs = document.getElementById("canvas"); // get canv
const ctx = cvs.getContext("2d"); // set ctx 2d

const SNAKE_SIZE = 25; // 25px by 25px squares

// initialize snake direction
var direction = 'right';
var gameOver = false;

window.onload = function() { // when window loads...
    drawBackground();
    draw();
}

function drawBackground() { // simple rect
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cvs.width,cvs.height);
}

function drawSnake(x,y) { // draw snake square
    ctx.fillStyle = "lime"; 
    ctx.fillRect(x*SNAKE_SIZE, y*SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE);
                // dx, dy, w, h
    ctx.fillStyle = "white";
    ctx.strokeRect(x*SNAKE_SIZE, y*SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE);
}

// create snake
var len = 4; // snake length
var snake = []; // snake array

for (i = len - 1; i >= 0; i--) { // for length of snake...
    snake.push(
        { // push new obj to snake array to be drawn
        x: i, // x pos is piece
        y: 0  // y pos default
        }
    )
}

document.addEventListener('keydown', function(e) {
    if (e.keyCode == 37 && direction != 'right') { // left        
        direction = 'left';
    }
    if (e.keyCode == 38 && direction != 'down') { // up
        direction = 'up';
    }
    if (e.keyCode == 39 && direction != 'left') { // right
        direction = 'right';
    }
    if (e.keyCode == 40 && direction != 'up') { // down
        direction = 'down';
    }
})
console.log(cvs.width);
food = {
    x: Math.floor(Math.random() * (cvs.width/SNAKE_SIZE)), // rand x pos
    y: Math.floor(Math.random() * (cvs.height/SNAKE_SIZE)) // rand y pos
}
// console.log(food);

function drawFood(x,y) { // draw apple
    ctx.fillStyle = "red"; 
    ctx.fillRect(x*SNAKE_SIZE, y*SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE);
                // dx, dy, w, h
    ctx.fillStyle = "white";
    ctx.strokeRect(x*SNAKE_SIZE, y*SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE);
}

function draw() { // main draw
    ctx.clearRect(0,0,cvs.width,cvs.height); // clear canv
    drawBackground(); // black
    for (i = 0; i < snake.length; i++) { // for length of snake array
        var x = snake[i].x; // get args
        var y = snake[i].y; // ^ ^ ^ 
        drawSnake(x,y); // draw piece
    }

    
    drawFood(food.x, food.y); // food
    // snake head pos
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    if (snakeX >= cvs.width / SNAKE_SIZE || // snake hits right
        snakeX < 0 ||                       // snake hits left
        snakeY >= cvs.height / SNAKE_SIZE ||// snake hits bottom
        snakeY < 0) {                       // snake hits top
            location.reload(); // reload page to reset game
    }

    if (snakeX == food.x && snakeY == food.y) { // snake head hits food
        food = { // new food;
            x: Math.floor(Math.random() * (cvs.width/SNAKE_SIZE)),
            y: Math.floor(Math.random() * (cvs.height/SNAKE_SIZE))
        }
        // console.log(food);
        // console.log(len);
    } else {        
        snake.pop(); // remove tail
    }


    // check current direct of snake
    if (direction == 'left') {
        snakeX--;
    } else if (direction == 'up') {
        snakeY--;
    } else if (direction == 'right') {
        snakeX++;
    } else if (direction == 'down') {
        snakeY++;
    }


    // new head ahead of old head
    var newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); // add new head to front of array
}

setInterval(draw, 100);