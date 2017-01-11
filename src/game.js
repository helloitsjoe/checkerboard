const STAGGER_TIME = 30;
const SQUARE_WIDTH = 382;
const SQUARE_HEIGHT = 144;
const BOARD_SCALE_PCT = 0.85;
const X_OFFSET = SQUARE_WIDTH / 2;
const Y_OFFSET = (SQUARE_HEIGHT - 24) / 2;

const frameLabels = {
    FALL: 'fall',
    LOOPING: 'looping',
    VISITED: 'visited'
};

let bg;
let checker;
let clickedX;
let clickedY;
let tableSetInProgress;
let text;

class Game {
    constructor() {
        this.BOARD_SIZE = document.getElementById('resize-input').value;
        this.text = document.getElementById('text');

        this.directions = ['N', 'S', 'E', 'W'];
        this.visited = [];
        this.squares = [];
        this.pauseClicked = false;
        this.looping = 0;
        
        this.createSquareArr();
    }
    
    /*
    * Create an array to fill with squares/directions
    */
    createSquareArr() {
        for (let x = 0; x < this.BOARD_SIZE; ++x) {
            this.squares[x] = [];
            for (let y = 0; y < this.BOARD_SIZE; ++y) {
                this.squares[x][y] = [];
            }
        }
    }
        
    /*
     * Plays audio after timeout
     */
    playAudio(sound, ms) {
        setTimeout(()=>{
            new Audio(`./audio/${sound}.wav`).play();
        }, ms)
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
     * Add each square and its direction to the array and screen
     * Set up click listener
     */
    addSquare(x, y) {
        this.tableSetInProgress = true;

        PIXI.animate.load(lib.square, board, (square) => {

            square.x = ( x - y ) * X_OFFSET;
            square.y = ( y + x ) * Y_OFFSET;
            square.hitArea = new PIXI.Polygon([-X_OFFSET, 0, 0, Y_OFFSET, X_OFFSET, 0, 0, -Y_OFFSET]);
            square.state.gotoAndStop(0);
            square.interactive = true;
            
            // Set direction arrow on square
            square.direction = this.directions[Math.floor(Math.random() * this.directions.length)];;
            square.arrows.gotoAndStop(square.direction);
            
            // Checkerboard pattern
            if (( x + y ) % 2 === 0) {
                square.base.gotoAndStop(0);
            } else {
                square.base.gotoAndStop(1);
            }
            
            // Put square into array to reference it later
            this.squares[x][y] = square;

            square.on('click', ()=>{
                // Remove click listener from other squares
                this.eachSquare((square) => {
                    square.interactive = false;
                })
                
                // Save reference to clicked position in case 'Restart' button is clicked
                clickedX = x;
                clickedY = y;
                this.dropChecker(x, y);
            });
            
            this.playAudio('set', 200);

            PIXI.animate.Animator.play(square, 'fadeIn', ()=>{
                this.tableSetInProgress = false;
            });
        }, 'assets');
    }
    
    /*
     * Remove board before resetting - called by gui.shuffle()
     */
    removeBoard() {
        this.tableSetInProgress = true;
        
        // If we've started a round, remove the checker
        if (this.visited.length && this.checker) {
            this.playAudio('zap', 200);
            PIXI.animate.Animator.play(this.checker, frameLabels.FALL);
        }
        
        this.playAudio('remove', 200);

        this.eachSquare((square)=>{
            // Turn off all squares lit state
            square.state.gotoAndStop(0);
            PIXI.animate.Animator.play(square, 'fadeOut', () => {
                stage.removeChild(board);
                board.destroy();
            });
        });

        this.squares.length = 0;
        this.restartSetup();
        setTimeout(()=>{
            if (this.checker) {
                this.checker.destroy();
                this.checker = null;
            }
            PIXI.animate.load(lib.test, stage, setTheTable, 'assets');
        }, 500)
    }
    
    /*
     * Reset states of elements
     * Called by removeBoard() and dropChecker()
     */
    restartSetup() {
        this.eachSquare((square)=>{
            square.interactive = false;
            square.visited = false;
            square.state.gotoAndStop(0);
        });
        
        // Clear 'loop' or 'fall off' text from screen
        this.text.classList.remove('text-end');

        bg.gotoAndStop(0);
        this.visited.length = 0;
        this.looping = 0;
    }

    /*
     * Initial placement of checker on board
     */
    dropChecker(x, y) {
        this.restartSetup();
        PIXI.animate.load(lib.checker, board, (checker)=>{
            this.checker = checker;
            this.placeChecker(x, y);
            
            this.playAudio('whoosh', 0);
            
            PIXI.animate.Animator.play(checker, 'dropIn', ()=>{
                this.moveChecker(x, y);
            });
        }, 'assets');
    }
        
    /*
     * Sets x/y position on stage
     */
    placeChecker(x, y) {
        this.checker.gotoAndStop('pause');
        
        // Add first position to array
        this.visited.push({x, y});
        if (this.squares[x] && this.squares[x][y]) {
            this.squares[x][y].visited = true;
        }
        this.checker.x = ( x - y ) * X_OFFSET;
        this.checker.y = ( y + x ) * Y_OFFSET;
    }
    
    /*
     * Resume from pause
     */
    play(x, y) {
        this.pauseClicked = false;
        let lastVisited = this.visited[this.visited.length - 1];
        this.placeChecker(lastVisited.x, lastVisited.y);
        this.moveChecker(lastVisited.x, lastVisited.y);
    }
        
    /*
     * Move the checker one space
     */
    moveChecker(x, y) {
        let moveAnimLabel = 'move' + this.squares[x][y].direction;
        let currSquare = this.squares[x][y];
        
        // If the square isn't lit up yet, light it up white
        if (currSquare.state.currentFrame < 1) {
            PIXI.animate.Animator.play(currSquare.state, frameLabels.VISITED);
        }
        if (this.pauseClicked) {
            return;
        }
        
        // Note: My dog Olive HATES this sound.
        this.playAudio('shift', 400);
        
        PIXI.animate.Animator.play(this.checker, moveAnimLabel, ()=>{
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
            this.checkPosition(x, y);
        });
    }
    
    /*
     * Check if we're still on the board or in a loop, call moveChecker again if so
     */
    checkPosition(x, y) {
        
        // If the new position is on the board, compare it to previous spots
        if (x >=0 && x < this.BOARD_SIZE && y >= 0 && y < this.BOARD_SIZE) {
            
            if (this.squares[x][y].visited) {
                this.looping++;
            }
            
            if (this.looping === 1) {
                // Turn visited squares green
                this.visited.forEach((spot) => {
                    PIXI.animate.Animator.play(this.squares[spot.x][spot.y].state, frameLabels.LOOPING);
                });
                
                this.playAudio('bell', 200);
                
                // Turn BG green
                PIXI.animate.Animator.play(bg, frameLabels.LOOPING);
                
                // Show text onscreen
                this.text.innerHTML = 'YOU ARE IN A LOOP';
                this.text.classList.add('text-end');
                
            } if (this.looping > 1) {
                // This is to stop repeated animation of green squares
                this.visited.forEach((spot) => {
                    this.squares[spot.x][spot.y].state.gotoAndStop('looping_stop');
                });
            }
            
            // Set checker's onscreen position at new spot
            this.placeChecker(x, y);
            
            // Make another move from the new position with a recursive call
            this.moveChecker(x, y);
            
        // If it's not on the board, you fell off the edge!
        } else {
            // Turn squares red
            this.visited.forEach((spot) => {
                PIXI.animate.Animator.play(this.squares[spot.x][spot.y].state, frameLabels.FALL);
            });
            
            // Turn BG red
            PIXI.animate.Animator.play(bg, frameLabels.FALL);
            
            // Show text onscreen
            this.text.innerHTML = 'YOU FELL OFF THE EDGE';
            this.text.classList.add('text-end');
            
            // Move checker's onscreen position off the board
            this.placeChecker(x, y);
            
            this.playAudio('zap', 200);
            
            PIXI.animate.Animator.play(this.checker, frameLabels.FALL, () => {
                this.checker.destroy();
                this.checker = null;
            })
            
            this.eachSquare((square) => {
                // Make the squares interactive again
                square.interactive = true;
            });
                
            return;
        }
    }
}

module.exports = Game;

