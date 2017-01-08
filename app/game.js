const frameLabels = {
    OFF: 'off',
    LOOP: 'loop'
};

const STAGGER_TIME = 30;
const SQUARE_WIDTH = 380;
const SQUARE_HEIGHT = 120;
const BOARD_SCALE_PCT = 0.85;

let xOffset;
let yOffset;
let bg;
let stop;
let checker;
let clickedX;
let clickedY;
let tableSetInProgress;
let visitedEnd;
let currSquare;

class Game {
    
    constructor() {
        // TODO: Set board size based on input
        this.BOARD_SIZE = /*document.getElementById('resize').value;*/ 6;

        this.directions = ['N', 'S', 'E', 'W'];
        this.visited = [];
        this.squares = [];
        this.pauseClicked = false;
        this.looping = 0;
        
        // initializes empty array
        this.create2dArr(this.squares);
    }
    
    /*
     * Create an array to fill with squares/directions
     */
    create2dArr(arr) {
        for (let x = 0; x < this.BOARD_SIZE; ++x) {
            arr[x] = [];
            for (let y = 0; y < this.BOARD_SIZE; ++y) {
                arr[x][y] = [];
            }
        }
    }
    
    /*
     * Add each square and its direction to the array and screen
     * Set up click listener
     */
    addSquare(x, y) {
        this.tableSetInProgress = true;
        // TODO: Combine test.js, square.js, checker.js, reference library? How?
        PIXI.animate.load(lib.square, board, (square) => {

            xOffset = square.width / 2;
            yOffset = SQUARE_HEIGHT / 2;
            square.x = ( x - y ) * xOffset;
            square.y = ( y + x ) * yOffset;
            square.hitArea = new PIXI.Polygon([-xOffset, 0, 0, yOffset, xOffset, 0, 0, -yOffset]);
            
            let state = square.state;
            let frame = 0;
            state.gotoAndStop(frame);
            
            // Set direction arrow on square
            square.direction = this.directions[Math.floor(Math.random() * this.directions.length)];;
            square.arrows.gotoAndStop(square.direction);
            
            // Checkerboard pattern
            if (( x + y ) % 2 === 0) {
                square.base.gotoAndStop(0);
            } else {
                square.base.gotoAndStop(1);
            }
            
            square.interactive = true;
            
            // Put square into array to reference it later
            this.squares[x][y] = square;

            square.on('click', ()=>{
                // Remove click listener from other squares
                this.eachSquare((square) => {
                    square.interactive = false;
                })
                
                // Save reference to clicked position in case 'Restart' button is clicked
                this.clickedX = x;
                this.clickedY = y;
                this.dropChecker(x, y);
            });

            PIXI.animate.Animator.play(square, 'fadeIn', ()=>{
                // This is to avoid interrupting the board reset
                // when 'Shuffle Arrows' is clicked. It works most
                // of the time but I'm not sure how to make it more robust.
                this.tableSetInProgress = false;
            });
        }, 'assets');
    }
    
    /*
     * Generic function for when I need to do something to every square
     */
    eachSquare(cb) {
        this.squares.forEach((row)=>{
            row.forEach((square)=>{
                cb(square);
            });
        });
    }
    
    /*
     * Remove board before resetting - called by 'Shuffle Arrows'
     */
    removeBoard() {
        this.tableSetInProgress = true;
        
        if (this.visited.length && this.checker) {
            PIXI.animate.Animator.play(this.checker, 'dropOut', () => {
                this.checker.destroy();
                this.checker = null;
            });
        }
        this.eachSquare((square)=>{
            // Turn off all squares lit state
            square.state.gotoAndStop(0);
            PIXI.animate.Animator.play(square, 'fadeOut');
        })
        
        this.squares.length = 0;
        this.visited.length = 0;
        
        setTimeout(()=>{
            PIXI.animate.load(lib.test, stage, setTheTable, 'assets');
        }, 500)
    }
    
    /*
     * Reset states of elements, call dropChecker with same start coords
     * Called by 'Restart' button
     */
    restartSetup() {
        this.eachSquare((square)=>{
            square.interactive = false;
            square.state.gotoAndStop(0);
        });
        bg.gotoAndStop(0);
        this.visited.length = 0;
    }

    /*
     * Initial placement of checker on board
     */
    dropChecker(x, y) {
        this.restartSetup();
        PIXI.animate.load(lib.checker, board, (checker)=>{
            this.checker = checker;
            this.placeChecker(checker, x, y);
            
            PIXI.animate.Animator.play(checker, 'dropIn', ()=>{
                this.moveChecker(checker, x, y);
            });
        }, 'assets');
    }
        
    /*
     * Sets x/y position on stage
     */
    placeChecker(instance, x, y) {
        instance.gotoAndStop('pause');
        
        // Add first position to array
        this.visited.push({x, y});

        instance.x = ( x - y ) * xOffset;
        instance.y = ( y + x ) * yOffset;
    }
    
    play(instance, x, y) {
        this.pauseClicked = false;
        let lastVisited = this.visited[this.visited.length - 1];
        this.placeChecker(this.checker, lastVisited.x, lastVisited.y);
        this.moveChecker(this.checker, lastVisited.x, lastVisited.y);
    }
        
    /*
     * Move the checker one space
     */
    moveChecker(instance, x, y) {
        
        // Set current position to the last visited position
        visitedEnd = this.visited.length - 1;
        currSquare = this.squares[this.visited[visitedEnd].x][this.visited[visitedEnd].y]
        
        // If the square isn't lit up yet, light it up neutral color
        if (currSquare.state.currentFrame < 1) {
            PIXI.animate.Animator.play(currSquare.state, 'visited');
        }
        
        let moveAnimLabel = 'move' + this.squares[x][y].direction;

        PIXI.animate.Animator.play(instance, moveAnimLabel, ()=>{

            // Move based on direction
            switch(this.squares[x][y].direction){
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
            
            if (this.pauseClicked) {
                this.visited.push({x, y});
                console.log('NewXY:', x, y )
                this.placeChecker(instance, x, y);
                return;
            }
            this.checkPosition(instance, x, y);
        });
    }
    
    /*
     * Check if we're still on the board or in a loop, call moveChecker again if so
     */
    checkPosition(instance, x, y) {
        
        // If the new position is on the board, compare it to previous spots
        if (x >=0 && x < this.BOARD_SIZE && y >= 0 && y < this.BOARD_SIZE) {
            
            // If spot has already been visited, we know we're in a loop
            this.visited.forEach((spot) => {
                if (spot.x === x && spot.y === y){
                    this.looping++;
                }
            })
            
            if (this.looping === 1) {
                // Turn visited squares green
                this.visited.forEach((spot) => {
                    PIXI.animate.Animator.play(this.squares[spot.x][spot.y].state, 'looping');
                });
                
                // Turn BG green
                bg.gotoAndStop(frameLabels.LOOP);
            } if (this.looping > 1) {
                console.log(this.looping)
                this.visited.forEach((spot) => {
                    this.squares[spot.x][spot.y].state.gotoAndStop('looping_stop');
                });

            }
            
            // Set checker's onscreen position at new spot
            this.placeChecker(instance, x, y);
            
            // Make another move
            this.moveChecker(instance, x, y);
            
        // If it's not on the board, you fell off the edge!
        } else {
            this.checker.destroy();
            this.checker = null;
            
            // Turn squares red
            this.visited.forEach((spot) => {
                PIXI.animate.Animator.play(this.squares[spot.x][spot.y].state, 'fall');
            });
            
            this.visited.push('OFF');
            
            this.eachSquare((square) => {
                square.interactive = true;
            });
            
            // Turn BG red
            bg.gotoAndStop(frameLabels.OFF);
            // this.placeChecker(instance, x, y);

            return;
        }
    }
}

module.exports = Game;

