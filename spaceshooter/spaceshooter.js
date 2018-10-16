// get canvas and context
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var stars = [];
// load img ship/bogie/laser/missile/bogieLaser
var laserImg = new Image();
laserImg.src = 'imgAssets/laser1.png'
var missileImg = new Image();
missileImg.src = 'imgAssets/missile.png'
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
    this.v = 250;
    this.weapon = 1;
    this.missiles = 3;    
} 

let ship = new Ship()

Ship.prototype.drawShip = function() {
    ctx.drawImage(heroImg, this.x, this.y);
}

var keysPressed = {};
addEventListener('keydown', function(e) {
    keysPressed[e.keyCode] = true;
});
addEventListener('keyup', function(e) {
    delete keysPressed[e.keyCode];
});

Ship.prototype.drawLaser = function() {
    console.log('laserss');
    ctx.drawImage(laserImg, ship.x, ship.y);

    let y = ship.y;

    setInterval(function() {
        y--;
        ctx.drawImage(laserImg, ship.x, y)
    }, 500);
}

addEventListener('keydown', function(e) {
    if (e.keyCode == 32) {
        ship.drawLaser();
    }
})





Ship.prototype.controlShip = function(tick) {

    if (37 in keysPressed) {
        this.x -= this.v * tick;
    }
    if (38 in keysPressed) {        
        this.y -= this.v * tick;
    }
    if (39 in keysPressed) {        
        this.x += this.v * tick;
    }
    if (40 in keysPressed) {
        this.y += this.v * tick;
        
    }
}



function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawSpace();
    moveStars();  
    ship.drawShip();
    // drawStar(100, 100, 3);
    requestAnimationFrame(draw);
}

 
var mainLoop = function() {

    

    let now = Date.now();
    let delta = now - then;
    
    ship.controlShip(delta / 1000);
   

    then = now;
    requestAnimationFrame(mainLoop)
}

draw();
then = Date.now();
mainLoop();




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


