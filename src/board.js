

class Board {
    constructor() {
        this.X_OFFSET = config.SQUARE_WIDTH / 2;
        this.Y_OFFSET = (config.SQUARE_HEIGHT - 24) / 2;
        this.BOARD_SIZE = document.getElementById('resize-input').value;
        this.endText = document.getElementById('text');
        
        this.squares = [];
        
        this.bg;
        this.board;
        this.boardBase;
        this.checker;
        this.startX;
        this.startY;
        this.tableSetInProgress;
        this.endText;
        
        this.createSquareArr();
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
        for (let row = 0; row < board.squares.length; row++){
            (function (idx) {
                setTimeout(()=>{
                    for (let col = 0; col < board.squares[row].length; col++) {
                        (function (idx) {
                            setTimeout(()=>{
                                board.addSquare(col, row);
                            }, config.STAGGER_TIME * idx);
                        }(col));
                    }
                }, config.STAGGER_TIME * (idx + (board.squares.length * idx)));
            }(row));
        }
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
                game.restart();
            });
            
            playAudio('set', 200);

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
        if (game.visited.length && this.checker) {
            playAudio('zap', 200);
            PIXI.animate.Animator.play(this.checker, config.frameLabels.FALL);
        }
        
        playAudio('remove', 200);

        this.eachSquare((square)=>{
            // Turn off all squares lit state
            square.state.gotoAndStop(0);
            PIXI.animate.Animator.play(square, 'fadeOut', () => {
                stage.removeChild(this.board);
                this.board.destroy();
            });
        });

        this.squares.length = 0;
        game.restartSetup();
        setTimeout(()=>{
            if (this.checker) {
                this.checker.destroy();
                this.checker = null;
            }
            this.setTheTable();
        }, 500)
    }
}

module.exports = Board;