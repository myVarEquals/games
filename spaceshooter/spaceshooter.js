// get canvas and context
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var stars = [];
var laserCount = 0;
var laserArray = [];
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
    this.rate = 15;
    this.count = 0;
    this.missiles = 3;    
} 

let ship = new Ship()

Ship.prototype.drawShip = function() {
    ctx.drawImage(heroImg, this.x, this.y);
}

function Laser(x,y) {
    this.x = x;
    this.y = y;
}

var keysPressed = {};
addEventListener('keydown', function(e) {
    keysPressed[e.keyCode] = true;

    
});
addEventListener('keyup', function(e) {
    delete keysPressed[e.keyCode];
});

function drawLasers() {
    for (i = 0; i < laserArray.length; i++) {
        ctx.drawImage(laserImg, laserArray[i].x, laserArray[i].y);
    }
}

function moveLasers() {
    for (i = 0; i < laserArray.length; i++) {
        laserArray[i].y -= 5;
    }
}

Ship.prototype.controlShip = function(tick) {

    if(32 in keysPressed) {         
            this.count++;
            console.log(this.count);
        if(this.count == this.rate) {
            laserArray.push(new Laser(ship.x,ship.y));
            this.count = 0;
        }      
        
    }    
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
    drawSpace();   
    ship.drawShip();
    drawLasers();
    // drawStar(100, 100, 3);
}

function move() {      
    moveStars();    
    moveLasers();
}
 
var mainLoop = function() {    

    let now = Date.now();
    let delta = now - then;
    
    ship.controlShip(delta / 1000);
    
    draw();
    move();
    then = now;
    requestAnimationFrame(mainLoop);
}

draw();
var then = Date.now();
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


