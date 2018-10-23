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
var bogieLaserImg = new Image();
bogieLaserImg.src = 'imgAssets/bogielaser1.png';
var bogieLaserW = '7';
var bogieLaserH = '19';
var explosionSheet = new Image();
explosionSheet.src = 'imgAssets/explosion.png';
var expSheetW = 786;
var expSheetH = 128;
var expSpriteW = expSheetW / 6;

// tests for game over
var exploding = false;
var gameOver = false;

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
// use to fill star array
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
    this.hitpoints = 5;  
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
// game level
var level = 1;

// use to fill bogies array
function populateBogies() {

    for (i = 0; i < level; i++) {       
        bogiesArray[i] = new BogieOne();    
    }
}
// generate bogies
populateBogies();
    

function drawBogies(bogies) {    
    for(i = 0; i < bogies.length; i++) {     
        if(!bogies[i]) {
            continue;
        }   
        ctx.drawImage(bogieImg, bogies[i].x, bogies[i].y, heroW, heroH);
    }
}

function moveBogies(bogies) {
    for(i = 0; i < bogies.length; i++) {
        if(!bogies[i]) {
            continue;
        }  
        if (ship.x < bogies[i].x) {
            bogies[i].x--;
        }
        if (ship.x > bogies[i].x) {
            bogies[i].x++;
        }
    }
}

// array to push new lasers to
var bogieLaserArray = [];

//use to get all bogies shooting
function generateBogieLasers(bogies) {
    // for each bogie...
    for (i = 0; i < bogies.length; i++) {
        // shoot a new laser
        bogieLaserArray.push(new Laser(bogies[i].x, bogies[i].y));                     
    }
    // wait 2.5s, fire again...
    setTimeout(function(){
        generateBogieLasers(bogiesArray);
    },2500);
    
}
// start shooting
generateBogieLasers(bogiesArray);

// draw lasers from bogies
function drawBogiesLasers(bogies) {
    for (i = 0; i < bogies.length; i++) {
        if(!bogies[i]) { // if item in array was deleted, skip iteration
            continue;
        } 
        // console.log(bogieLaserArray);
        ctx.drawImage(bogieLaserImg, bogies[i].x, bogies[i].y, bogieLaserW, bogieLaserH);

         
    }
}

function moveBogiesLasers(bogies) {
    for (i = 0; i < bogies.length; i++) {
        if(!bogies[i]) { // if item in array was deleted, skip iteration
            continue;
        }      
        bogieLaserArray[i].y += 3;   
        if(testCollision(bogies[i])) { // delete laser on collision                    
            delete bogieLaserArray[i];
            if (ship.hitpoints > 0) {
                ship.hitpoints--; // lose 1 hp

            }
            if (ship.hitpoints == 0) { // 0 hp
                gameOver = true; 
                exploding = true;              
            }
            console.log(ship.hitpoints);
            continue;
        }
        if (bogieLaserArray[i].y > canvas.height) { // delete laser off screen
            delete bogieLaserArray[i];
        }            
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
    keysPressed[e.keyCode] = true; // when pressing key, add to array
});
addEventListener('keyup', function(e) {
    delete keysPressed[e.keyCode]; // delete on up
});

// hero laser
function drawLasers() {
    for (i = 0; i < laserArray.length; i++) {
        if (laserArray[i] == undefined) {
            continue;
        }
        ctx.drawImage(laserImg, laserArray[i].x, laserArray[i].y);
    }
}
// hero move laser
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

// explosion animation

let explosionFrame = 0;
let again = 0;
let elapsed = Date.now();
function drawExplosion() { 
    
    let now = Date.now();
    if (exploding) {
        ctx.drawImage(explosionSheet, explosionFrame * expSpriteW, 0, expSpriteW, expSheetH,
                        ship.x - (expSpriteW / 2) + (heroW / 2), ship.y - (expSheetH / 2) + (heroH / 2), expSpriteW, expSheetH);
    }

    if (now - 150 > elapsed && exploding) {        
        explosionFrame++;        
        elapsed = now;

        if (explosionFrame == 5) {
            exploding = false;
            console.log(exploding);
            explosionFrame = 0;
        }
    }
           
}

// test array for key being pressed
Ship.prototype.controlShip = function(tick) {

    if(32 in keysPressed) { // space, fire        
            this.count++; // shots fired inc
        if(this.count == this.rate) { // limit rate
            laserArray.push(new Laser(ship.x,ship.y));
            this.count = 0;
        }      
        
    }    
    if (37 in keysPressed) { // left
        if(this.x > 0) {
            this.x -= this.v * tick;
        }
    }
    if (38 in keysPressed) { // up
        if (this.y > canvas.height / 2) {        
            this.y -= this.v * tick;
        }
    }
    if (39 in keysPressed) { // right
        if (this.x < canvas.width - heroW) {        
            this.x += this.v * tick;
        }
    }
    if (40 in keysPressed) { // down
        if (this.y < canvas.height - heroH) {
            this.y += this.v * tick;
        }
    }
}

function testCollision(laser) {
    var collision = false;
    // if laser is within the size of the hero...
    if(laser.x > ship.x && 
        laser.x < ship.x + heroW &&
        laser.y > ship.y &&
        laser.y < ship.y + heroH) {            
            collision = true;
        }

    return collision;
 }



function draw() {
    drawSpace();
    if (exploding) {
        drawExplosion();
    }
    if(gameOver) {
        
    } else {    
    ship.drawShip();
    drawLasers();
    // drawStar(100, 100, 3);
    drawBogies(bogiesArray);
    drawBogiesLasers(bogieLaserArray);
    }
}

function move() {      
    moveStars();
    if(gameOver) {

    } else { 
    moveLasers();
    moveBogies(bogiesArray);
    moveBogiesLasers(bogieLaserArray);
    }
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



// missile
// score

// Hero 
    // hitpoints
    // shoot missile
    // activate item?

// bogie AI
    // difficulty
    // color
    // hitpoints


