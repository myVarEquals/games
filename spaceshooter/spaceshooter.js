// get canvas and context
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// star array to be filled
var stars = [];
// track lasers
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
var bogieImg = new Image();
bogieImg.src = 'imgAssets/bogie1.png';
var bogieW = '103';
var bogieH = '84';


// score

// basic draw rect
function drawRect(x,y,w,h,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}
// template
function Star() {
    this.size = 0,
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.v = 1;
}

// draw space
function drawSpace() {
    drawRect(0,0,canvas.width,canvas.height, 'black');
}
// draw star
function drawStar(x,y,size) {
    drawRect(x,y, size, size, 'white');
}
// fill star array
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

}
// generate stars
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
// template
function Ship() {
    this.x = (canvas.width / 2) - (heroW / 2);
    this.y = (canvas.height - 50) - (heroH / 2);
    this.v = 250;
    this.weapon = 1;
    this.rate = 15;
    this.count = 0;
    this.missiles = 3;    
} 
// init ship
let ship = new Ship();

// template
function BogieOne() {
    this.x = (canvas.width / 2);
    this.y = 50;
    this.v = 250;
    this.weapon = 1;
    this.laserArray = [];
}
// track bogies on screen
var bogiesArray = [];

var level = 1;

function populateBogies() {

    for (i = 0; i < level; i++) {       
        bogiesArray[i] = new BogieOne();    
        console.log(bogiesArray[i]);
    }
}

populateBogies();
    

function drawBogies(bogies) {    
    for(i = 0; i < bogies.length; i++) {        
        ctx.drawImage(bogieImg, bogies[i].x, bogies[i].y, heroW, heroH);
    }
}

function moveBogies(bogies) {
    for(i = 0; i < bogies.length; i++) {
        if (ship.x < bogies[i].x) {
            bogies[i].x--;
        }
        if (ship.x > bogies[i].x) {
            bogies[i].x++;
        }
    }
}

var bogieLaserArray = [];

function generateBogieLasers(bogies) {
    for (i = 0; i < bogies.length; i++) {
        console.log(bogies[i]);   
        console.log(bogiesArray[i]);     
        setInterval(function() {
            console.log(bogiesArray[i]);
            bogieLaserArray.push(new Laser(bogiesArray[i].x, bogiesArray[i].y));         
            
        }, 2500);
    }
}

generateBogieLasers(bogiesArray);

function drawBogiesLasers(bogies) {
    for (i = 0; i < bogies.length; i++) {
        console.log(bogieLaserArray);
        ctx.drawImage(laserImg, bogies[i].x, bogies[i].y);
         
    }
}

function moveBogiesLasers(bogies) {
    for (i = 0; i < bogies.length; i++) {        
        bogiesLaserArray[i].y += 3;               
    }
}


Ship.prototype.drawShip = function() {
    ctx.drawImage(heroImg, this.x, this.y);
}

// CREATE NEW LASER
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
        if (laserArray[i] == undefined) {
            continue;
        }
        ctx.drawImage(laserImg, laserArray[i].x, laserArray[i].y);
    }
}

function moveLasers() {
    for (i = 0; i < laserArray.length; i++) {
        if (laserArray[i] == undefined) {
            continue;
        }
        laserArray[i].y -= 5;
        if (laserArray[i].y < -10) {
            delete laserArray[i];
        }
    }
}

Ship.prototype.controlShip = function(tick) {

    if(32 in keysPressed) {         
            this.count++;
        if(this.count == this.rate) {
            laserArray.push(new Laser(ship.x,ship.y));
            this.count = 0;
        }      
        
    }    
    if (37 in keysPressed) {
        if(this.x > 0) {
            this.x -= this.v * tick;
        }
    }
    if (38 in keysPressed) {
        if (this.y > canvas.height / 2) {        
            this.y -= this.v * tick;
        }
    }
    if (39 in keysPressed) {
        if (this.x < canvas.width - heroW) {        
            this.x += this.v * tick;
        }
    }
    if (40 in keysPressed) {
        if (this.y < canvas.height - heroH) {
            this.y += this.v * tick;
        }
    }
}



function draw() {
    drawSpace();   
    ship.drawShip();
    drawLasers();
    // drawStar(100, 100, 3);
    drawBogies(bogiesArray);
    drawBogiesLasers(bogiesLaserArray);
}

function move() {      
    moveStars();    
    moveLasers();
    moveBogies(bogiesArray);
    moveBogiesLasers(bogieLaserArray);
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


