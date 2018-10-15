// get canvas and context
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var stars = [];
// load img ship/bogie/laser/missile/bogieLaser
var heroImg = new Image();
heroImg.src = 'imgAssets/ship.png';
var heroW = 45;
var heroH = 31;
// score

//draw

function drawRect(x,y,w,h,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}

function Star() {
    this.size = 0,
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.v = 1;
}


function drawSpace() {
    drawRect(0,0,canvas.width,canvas.height, 'black');
}

function drawStar(x,y,size) {
    drawRect(x,y, size, size, 'white');
}

function populateStars() {

    for (i = 0; i < 20; i++) {
        stars[i] = new Star();
        let randSize = Math.floor(Math.random() * 2) + 1;
        stars[i] = {
            size: randSize,
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height),
            w: randSize,
            h: randSize,
        }
        drawStar(stars[i].x, stars[i].y, stars[i].w);
    }

    console.log(stars);
}

populateStars();

function moveStars() {
    for(i = 0; i < stars.length; i++) {
        if(stars[i].y > canvas.height) {
            stars[i].y = -2;
            stars[i].x = Math.floor(Math.random() * canvas.width);
        }              
        stars[i].y += stars[i].w;     
        drawStar(stars[i].x, stars[i].y, stars[i].w);
    }
}

function Ship() {
    this.x = (canvas.width / 2) - (heroW / 2);
    this.y = (canvas.height - 50) - (heroH / 2);
    this.weapon = 1;
    this.missiles = 3;    
} 

let ship = new Ship()

Ship.prototype.drawShip = function() {
    ctx.drawImage(heroImg, this.x, this.y);
}

Ship.prototype.moveLeft = function() {
    this.x -= 10;
}
Ship.prototype.moveUp = function() {
    if (this.y >= 300) {        
        this.y -= 10;
    }
}
Ship.prototype.moveRight = function() {
    this.x += 10;
}
Ship.prototype.moveDown = function() {
    this.y += 10;
}

Ship.prototype.shootLaser = function() {
    
}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawSpace();
    moveStars();  
    ship.drawShip();
    // drawStar(100, 100, 3);
    requestAnimationFrame(draw);
}

draw();

document.addEventListener('keydown', CONTROL); 

function CONTROL (event) {
    event.preventDefault();
    if(event.keyCode == 37) {
        ship.moveLeft();
    }
    if(event.keyCode == 38) {
        ship.moveUp();
    }
    if(event.keyCode == 39) {
        ship.moveRight();
    }
    if(event.keyCode == 40) {
        ship.moveDown();
    }
}


    // ship
    // bogie

    // laser
    // missile
    // bogieLaser
    //score

// Hero controls
    // hitpoints
    // move
    // shoot laser
    // shoot missile
    // activate item?

// bogie AI
    // difficulty
    // color
    // hitpoints
    // move
    // shoot laser


