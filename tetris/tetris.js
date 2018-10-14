// init canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// globals for making and drawing board
const ROW = 20;
const COL = COLUMN = 10;
const SQ = squareSize = 20;
const VACANT = 'white';
const scoreElement = document.getElementById('score');

// call to draw a square
function drawSquare(x,y,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}

// create board
let board = [];
// for each row...
for(r = 0; r < ROW; r++) {
    // create empty array
    board[r] = [];
    // and then each col...
    for(c = 0; c < COL; c++) {
        // define color for each board square
        board[r][c] = VACANT
    }
}
// draw board
function drawBoard() {
    // for each row ...
    for(r = 0; r < ROW; r++) {
        // and each col...
        for(c = 0; c < COL; c++) {
            // draw square at row and col with color from board creation
            drawSquare(c,r,board[r][c]);
        }
    }
}

drawBoard();

// gen random piece
function randomPiece() {
    let r = randomN = Math.floor(Math.random() * PIECES.length);
    return new Piece(PIECES[r][0], PIECES[r][1]);
}

// init pieces from other script
const PIECES = [
    [Z, 'lime'],
    [S, 'blue'],
    [T, 'yellow'],
    [O, 'orange'],
    [L, 'purple'],
    [I, 'red'],
    [J, 'cyan'],
];

// create new piece
let p = randomPiece();



function Piece(tetromino, color) {
    // define its piece from array
    this.tetromino = tetromino;
    // define its color
    this.color = color;
    // for cycling through array of positions in rotating piece
    this.tetrominoN = 0;
    // init at first array index of this piece's rotation cycle ie Z[0]
    this.activeTetromino = this.tetromino[this.tetrominoN];
    // default pos when Piece is created
    this.x = 3;
    this.y = -2;

}

// draw squares, pass in color
Piece.prototype.fill = function(color) {
    // for each row of the piece's array...
    for(r = 0; r < this.activeTetromino.length; r++) {
        // for each col of the piece's array...
        for(c = 0; c < this.activeTetromino.length; c++) {
            // if the number is 1 ie true...
            if(this.activeTetromino[r][c]) {
                // draw the square at its current x and y pos with its respective color
                // adding the x and y allows control of piece
                drawSquare(this.x + c,this.y + r, color);
            }
        }
    }
}


// draw tetromino
Piece.prototype.draw = function() {
    // draw square with given color
    this.fill(this.color);
}
// remove tetromino
Piece.prototype.unDraw = function() {
    this.fill(VACANT);
}

Piece.prototype.moveRight = function() {
    // test collision
    if(!this.collision(1,0,this.activeTetromino)) {
    // remove piece from frame
    this.unDraw();
    // increment pos on x axis
    this.x++;
    // draw new piece
    this.draw();
    } else {

    }
}

Piece.prototype.moveLeft = function() {
    if(!this.collision(-1,0,this.activeTetromino)) {
    // remove piece from frame
    this.unDraw();
    // decrement pos on x axis
    this.x--;
    // draw new piece
    this.draw();
    } else {

    }
}

Piece.prototype.rotate = function() {
    // get next pattern in array
    let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
    let kick = 0;
    // if collision on rotation
    if(this.collision(0,0,nextPattern)) {
        // is collision on right?
        if (this.x > COL / 2) {
            // decrement
            kick = -1;
        // or left?
        } else {
            // increment
            kick = 1;
        }
    }
    // if no collision...
    if(!this.collision(kick,0,nextPattern)) {    
    this.unDraw();
    // kick piece left or right if collision was detected
    this.x += kick;
    // increment N , divide by length of possible rotations, use remainder
    this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
    // update to correct tetromino
    this.activeTetromino = this.tetromino[this.tetrominoN];
    // draw new tetromino
    this.draw();
    } else {

    }
}

// move piece down
Piece.prototype.moveDown = function() {
    // no collision
    if(!this.collision(0,1,this.activeTetromino)) {
    // remove piece from frame
    this.unDraw();
    // increment pos on y axis
    this.y++;
    // draw new piece
    this.draw();
    } else { // collision
        this.lock(); // lock to board
        p = randomPiece(); // generate new piece
    }
}

// lock pieces to board

let score = 0;
Piece.prototype.lock = function() {
    for(r = 0; r < this.activeTetromino.length; r++) {
        for(c = 0; c < this.activeTetromino.length; c++) {
            // if there is no square drawn by the tetromino array ie 0
            if(!this.activeTetromino[r][c]) {
                continue;
            }
            // if given square is locked at -y pos, pieces stacked too high, game over
            if(this.y + r < 0) {
                alert('Game Over');
                // used to stop request anim frame
                gameOver = true;
                break;
            }
            // lock the board square with tetromino's color
            board[this.y + r][this.x + c] = this.color;
        }
    }
    // check every row to see if full
    for( r = 0; r < ROW; r++) {
        let isRowFull = true; // init comparison
        for( c = 0; c < COL; c++) {
            // will become false if vacant square
            isRowFull = isRowFull && (board[r][c] != VACANT)
        }
        // row is full
        if (isRowFull) {
            // move above rows down (this essentially moves the entire board down)
            // set y to current row that is full
            for(y = r; y > 1; y--) {
                // get col
                for(c = 0; c < COL; c++) {
                    // set curr block to block above it
                    board[y][c] = board[y-1][c];
                }
            }
            // create new empty row at top since board shifted down
            for(c = 0; c < COL; c++) {
                board[0][c] = VACANT;
            }
            score += 10;
        }
    }
    // draw new board to reflect changes
    drawBoard();
    // update score on page
    scoreElement.innerHTML = score;
}

// collision detection
Piece.prototype.collision = function(x,y,piece) {
    
    // for each row of the piece...
    for(r = 0; r < piece.length; r++) {
        // for each col in this row...
        for(c = 0; c < piece.length; c++) {
            // if there is no square drawn by the tetromino array ie 0
            if(!piece[r][c]) {
                continue;
            }
            // find where the tetromino is trying to move to
            // current x pos + current pos in tetromino array + direction request ie left/right/down/up(if rotating)
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            // check boundaries of sides and bottom
            if (newX < 0 || newX > COL || newY >= ROW) {
                return true;
            }
            // allow to skip over -y positions for new pieces
            if (newY < 0) {
                continue;
            }
            // if no piece is already locked there on board
            if (board[newY][newX] != VACANT) {
                return true;
            }
        }
    }
    return false;
}

// listen for arrow keys
document.addEventListener('keydown', CONTROL);

function CONTROL(event) {
    if (event.keyCode == 37) {//left
        p.moveLeft();
    } else if (event.keyCode == 38) {// up
        p.rotate();
    } else if (event.keyCode == 39) { // right
        p.moveRight();
    } else if (event.keyCode == 40) { // down
        p.moveDown();
    }
}

// get current time, for second interval
let dropStart = Date.now();
let gameOver = false;

function drop() {
    // get current second
    let now = Date.now();
    // get prev second
    let delta = now - dropStart;
    // if full second passed ../
    if (delta > 1000) {
        p.moveDown();
        // reset second
        dropStart = Date.now();
    }
    if (!gameOver) {
        requestAnimationFrame(drop);
    }
}

drop();