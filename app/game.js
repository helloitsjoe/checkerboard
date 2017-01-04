const states = {
    OFF: 'off',
    LOOP: 'loop'
};

const STAGGER_TIME = 30;
const SQUARE_WIDTH = 380;
const BOARD_SCALE_PCT = 0.8;

let xOffset;
let yOffset;
let bg;

class Game {
    
    constructor() {
        // TODO: Set board size based on input
        this.BOARD_SIZE = /*document.getElementById('resize').value;*/ 6;

        this.directions = ['N', 'S', 'E', 'W'];
        this.boardArr = [];
        this.spot = {};
        this.visited = [];
        this.squares = [];
    
        this.create2dArr(this.boardArr, 'directions');
        this.state = '';
    }
    
    /*
     *
     *
     *
     */
    create2dArr(arr, item) {
        for (let x = 0; x < this.BOARD_SIZE; ++x) {
            arr[x] = [];
            for (let y = 0; y < this.BOARD_SIZE; ++y) {
                if (item === 'directions') {
                    // Fill board with random directions
                    arr[x][y] = this.getRandomFromArr(this.directions);
                } else {
                    // Fill array with items
                    arr[x][y] = item;
                }
            }
        }
    }
    
    getRandomFromArr(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    
    addSquare(x, y) {
        // TODO: Combine test.js, square.js, checker.js, reference library? How?
        PIXI.animate.load(lib.square, board, (square) => {

            xOffset = square.width / 2;
            yOffset = square.height / 2;
            square.x = ( x - y ) * xOffset;
            square.y = ( y + x ) * yOffset;
            square.hitArea = new PIXI.Polygon([-xOffset, 0, 0, yOffset, xOffset, 0, 0, -yOffset]);
            
            let state = square.state;
            let frame = 0;
            state.gotoAndStop(frame);
            
            square.directions.gotoAndStop(this.boardArr[x][y]);
            
            if (( x + y ) % 2 === 0) {
                square.color02.visible = false;
            } else {
                square.color01.visible = false;
            }
            
            square.interactive = true;
            
            // TODO: This is setting all squares to the last x, y coord. FIX!
            this.create2dArr(this.squares, square);

            square.on('click', ()=>{
                // TODO: remove click listener from other squares
                this.dropChecker(x, y);
            });
            
            PIXI.animate.Animator.play(square, 'fadeIn');
        }, 'assets');
    }

    dropChecker(x, y) {
        PIXI.animate.load(lib.checker, board, (checker)=>{
            this.placeChecker(checker, x, y);
            
            PIXI.animate.Animator.play(checker, 'dropIn', ()=>{
                this.moveChecker(checker, x, y);
            });
        }, 'assets');
    }

    
    /*
     * Starts player at a random square on the board
     */
    randomSpot() {
        this.visited.length = 0;
        x = Math.floor(Math.random() * this.BOARD_SIZE);
        y = Math.floor(Math.random() * this.BOARD_SIZE);
    }
    
    /*
     * Sets x/y position on stage
     */
    placeChecker(instance, x, y) {
        instance.x = ( x - y ) * xOffset;
        instance.y = ( y + x ) * yOffset;
    }

    moveChecker(instance, x, y) {
        let moveAnimLabel = 'move' + this.boardArr[x][y];
        PIXI.animate.Animator.play(instance, moveAnimLabel, ()=>{

            console.log("Spot:", {x, y});
            // Add prev position to array
            // TODO: Fix this so it's comparing an array instead of a string
            this.visited.push(`${x} ${y}`);
            
            // Move based on direction
            switch(this.boardArr[x][y]){
              case 'N':
                y -= 1;
                break;
              case 'S':
                y += 1;
                break;
              case 'W':
                x -= 1;
                break;
              case 'E':
                x += 1;
                break;
            }
            this.checkPosition(instance, x, y);
        });
    }
    
    checkPosition(instance, x, y) {
        
        // If the new position is on the board, compare it to previous spots
        if (x >=0 && x < this.BOARD_SIZE && y >= 0 && y < this.BOARD_SIZE) {
            
            // If spot has already been visited, we know we're in a loop
            if (this.visited.indexOf(`${x} ${y}`) >= 0) {
                // TODO: Set this up to turn visited squares green
                // TODO: Other loop animation?
                console.log('LOOP MOTHAFUCKAAAAA');
                bg.gotoAndStop(states.LOOP);
            }
            
            // Otherwise, we're not in a loop, keep walking
            this.placeChecker(instance, x, y);
            this.moveChecker(instance, x, y);
            
        // If it's not on the board, you fell off the edge!
        } else {
            // TODO: Set this up to turn visited squares red
            // TODO: Other fall-off-edge animation?
            console.log('YOU FELL OFF THE EDGEEEEE');
            bg.gotoAndStop(states.OFF);
            return;
        }
    }
}

module.exports = Game;

