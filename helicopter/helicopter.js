//define globals
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


// load img assets
var heliImg = new Image();
var backgroundImg = new Image();
var wallImg = new Image();

heliImg.src = "imgAssets/helicopter.png";
backgroundImg.src = "imgAssets/background.png";
wallImg.src = "imgAssets/bricks.png";
const gap = wallImg.height + 300;

// draw images

function loop() {

    ctx.drawImage(backgroundImg, 0, 0);
    ctx.drawImage(wallImg, 150, -250);
    ctx.drawImage(wallImg, 150, 0 + gap);

    requestAnimationFrame(loop);

    
}

loop();

