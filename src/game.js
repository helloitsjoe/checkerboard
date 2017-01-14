const config = require('./gameConfig.json');

class Game {
    constructor() {
        this.X_OFFSET = config.SQUARE_WIDTH / 2;
        this.Y_OFFSET = (config.SQUARE_HEIGHT - 24) / 2;
        this.BOARD_SIZE = document.getElementById('resize-input').value;
        this.endText = document.getElementById('text');

        this.visited = [];
        this.squares = [];
        this.pauseClicked = false;
        this.looping = 0;
        
        this.bg;
        this.checker;
        this.startX;
        this.startY;
        this.tableSetInProgress;
        this.endText;

        this.board;
        this.boardBase;
        
        this.createSquareArr();
    }
    
    /*
     * Build the board
     */
    setTheTable(test) {
        if (test) {
            this.bg = test.bg;
            this.boardBase = test.boardBase;
        }

        this.bg.gotoAndStop(0);
        this.board = new PIXI.Container();
        stage.addChild(this.board);
        
        this.board.x = stage.width / 2;
        this.board.y = stage.height / 2 - 60;
        this.boardBase.y = 440 + (5 * this.BOARD_SIZE);
        this.board.scale.x = this.board.scale.y = (stage.width / (config.SQUARE_WIDTH * this.BOARD_SIZE)) * config.BOARD_SCALE_PCT;
        
        // Stagger animation of squares appearing
        // This is pretty ugly. Is there a better way to stagger animation of squares appearing?
        for (let i = 0; i < game.squares.length; i++){
            (function (idx) {
                setTimeout(()=>{
                    for (let j = 0; j < game.squares[i].length; j++) {
                        (function (idx) {
                            setTimeout(()=>{
                                game.addSquare(j, i);
                            }, config.STAGGER_TIME * idx);
                        }(j));
                    }
                }, config.STAGGER_TIME * (idx + (game.squares.length * idx)));
            }(i));
        }
    }
    
    /*
    * Create an array to fill with squares/directions
    */
    createSquareArr() {
        for (let x = 0; x < this.BOARD_SIZE; ++x) {
            this.squares[x] = [];
            for (let y = 0; y < this.BOARD_SIZE; ++y) {
                this.squares[x][y] = null;
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

        PIXI.animate.load(lib.square, this.board, (square) => {

            square.x = ( x - y ) * this.X_OFFSET;
            square.y = ( y + x ) * this.Y_OFFSET;
            square.hitArea = new PIXI.Polygon([-this.X_OFFSET, 0, 0, this.Y_OFFSET, this.X_OFFSET, 0, 0, -this.Y_OFFSET]);
            square.state.gotoAndStop(0);
            square.interactive = true;
            
            // Set direction arrow on square
            square.direction = config.DIRECTIONS[Math.floor(Math.random() * config.DIRECTIONS.length)];;
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
                // Save reference to clicked position in case 'Restart' button is clicked
                this.startX = x;
                this.startY = y;
                this.restart();
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
            PIXI.animate.Animator.play(this.checker, config.frameLabels.FALL);
        }
        
        this.playAudio('remove', 200);

        this.eachSquare((square)=>{
            // Turn off all squares lit state
            square.state.gotoAndStop(0);
            PIXI.animate.Animator.play(square, 'fadeOut', () => {
                stage.removeChild(this.board);
                this.board.destroy();
            });
        });

        this.squares.length = 0;
        this.restartSetup();
        setTimeout(()=>{
            if (this.checker) {
                this.checker.destroy();
                this.checker = null;
            }
            this.setTheTable();
        }, 500)
    }
    
    restart() {
        if (!this.checker) {
            // If the checker fell off, don't play 'dropOut' animation
            this.dropChecker(this.startX, this.startY);
        } else {
            this.playAudio('whooshOut', 200);
            
            PIXI.animate.Animator.play(this.checker, 'dropOut', () => {
                this.dropChecker(this.startX, this.startY);
            });
        }
    }
    
    /*
     * Reset states of elements
     * Called by removeBoard() and dropChecker()
     */
    restartSetup() {
        this.eachSquare((square)=>{
            square.visited = false;
            square.state.gotoAndStop(0);
        });
        
        // Clear 'loop' or 'fall off' text from screen
        this.endText.classList.remove('text-end');

        this.bg.gotoAndStop(0);
        this.visited.length = 0;
        this.looping = 0;
    }

    /*
     * Initial placement of checker on board
     */
    dropChecker(x, y) {
        this.restartSetup();
        PIXI.animate.load(lib.checker, this.board, (checker)=>{
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
        this.checker.x = ( x - y ) * this.X_OFFSET;
        this.checker.y = ( y + x ) * this.Y_OFFSET;
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
        let currSquare = this.squares[x][y];
        // If the square isn't lit up yet, light it up white
        if (currSquare.state.currentFrame < 1) {
            PIXI.animate.Animator.play(currSquare.state, config.frameLabels.VISITED);
        }
        if (this.pauseClicked) {
            return;
        }
        
        let moveAnimLabel = 'move' + this.squares[x][y].direction;
        
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
                    PIXI.animate.Animator.play(this.squares[spot.x][spot.y].state, config.frameLabels.LOOPING);
                });

                this.playAudio('bell', 200);
                
                // Turn BG green
                PIXI.animate.Animator.play(this.bg, config.frameLabels.LOOPING);
                
                // Show text onscreen
                this.endText.innerHTML = 'YOU ARE IN A LOOP';
                this.endText.classList.add('text-end');
                
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
                PIXI.animate.Animator.play(this.squares[spot.x][spot.y].state, config.frameLabels.FALL);
            });
            
            // Turn BG red
            PIXI.animate.Animator.play(this.bg, config.frameLabels.FALL);
            
            // Show text onscreen
            this.endText.innerHTML = 'YOU FELL OFF THE EDGE';
            this.endText.classList.add('text-end');
            
            // Move checker's onscreen position off the board
            this.placeChecker(x, y);
            
            this.playAudio('zap', 200);
            
            PIXI.animate.Animator.play(this.checker, config.frameLabels.FALL, () => {
                this.checker.destroy();
                this.checker = null;
            })
        }
    }
}

module.exports = Game;

