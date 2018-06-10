import * as PIXI from 'pixi.js';

const config = require('./gameConfig.json');
const square = require('../assets/square.js').stage;

const X_OFFSET = config.SQUARE_WIDTH / 2;
const Y_OFFSET = (config.SQUARE_HEIGHT - 24) / 2;

export default class Board {
    public boardSize: any;
    private _bg;
    private _board;
    private _boardBase;
    private _game;
    private _startX;
    private _startY;
    private _squares;
    private _tableSetInProgress;
    private _endText;
    private _looping;
    
    private squares: Array<any> = [];

    public visited;
    
    constructor(game) {
        this._game = game;

        this.boardSize = (document.getElementById('resize-input') as HTMLInputElement).value;
        this._endText = document.getElementById('text');

        this.createSquareArr();
    }

    /*
    * Create an array to fill with squares/directions
    */
    createSquareArr() {
        for (let x = 0; x < this.boardSize; ++x) {
            this.squares[x] = [];
            for (let y = 0; y < this.boardSize; ++y) {
                this.squares[x][y] = null;
            }
        }
    }

    /*
     * Build the board
     */
    setTheTable(test?) {
        if (test) {
            this._bg = test.bg;
            this._boardBase = test.boardBase;
        }

        this._bg.gotoAndStop(0);
        this._board = new PIXI.Container();
        this._game.stage.addChild(this._board);

        this._board.x = this._game.stage.width / 2;
        this._board.y = this._game.stage.height / 2 - 60;
        this._boardBase.y = 440 + (5 * this.boardSize);
        this._board.scale.x = this._board.scale.y = (this._game.stage.width / (this._game.config.SQUARE_WIDTH * this.boardSize)) * this._game.config.BOARD_SCALE_PCT;

        // Stagger animation of squares appearing
        // This is pretty ugly. Is there a better way to stagger animation of squares appearing?
        const game = this._game;
        for (let row = 0, len = game.board.squares.length; row < len; row++){
            (function (idx) {
                setTimeout(()=>{
                    for (let col = 0, rowLen = game.board.squares[row].length; col < rowLen; col++) {
                        (function (idx) {
                            setTimeout(()=>{
                                game.board.addSquare(col, row);
                            }, game.config.STAGGER_TIME * idx);
                        }(col));
                    }
                }, game.config.STAGGER_TIME * (idx + (len * idx)));
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
        this._tableSetInProgress = true;

        PIXI.animate.load(square, this._board, (square) => {

            square.x = ( x - y ) * X_OFFSET;
            square.y = ( y + x ) * Y_OFFSET;
            square.hitArea = new PIXI.Polygon([-X_OFFSET, 0, 0, Y_OFFSET, X_OFFSET, 0, 0, -Y_OFFSET]);
            square.state.gotoAndStop(0);
            square.interactive = true;

            // Set direction arrow on square
            square.direction = this._game.config.DIRECTIONS[Math.floor(Math.random() * this._game.config.DIRECTIONS.length)];;
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
                this._startX = x;
                this._startY = y;
                this._game.checker.restart();
            });

            this._game.playAudio('set', 200);

            PIXI.animate.Animator.play(square, 'fadeIn', ()=>{
                this._tableSetInProgress = false;
            });
        }, 'assets');
    }

    /*
     * Remove board and create a new one - called by gui.shuffle()
     */
    createNew() {
        this._tableSetInProgress = true;

        // If we've started a round, remove the checker
        if (this.visited.length && this._game.checker._clip) {
            this._game.checker.remove();
        }

        this._game.playAudio('remove', 200);

        this.eachSquare((square)=>{
            // Turn off all squares lit state
            square.state.gotoAndStop(0);
            PIXI.animate.Animator.play(square, 'fadeOut', () => {
                this._game.stage.removeChild(this._board);
                this._board.destroy();
            });
        });

        // resizeBoard needs the array of squares to be reset
        this.squares.length = 0;
        this.refreshBoard();
        setTimeout(()=>{
            if (this._game.checker._clip) {
                this._game.checker.destroy();
            }
            this.setTheTable();
        }, 500)
    }

    /*
     * Reset states of elements
     * Called by this.createNew() and this._game.checker.dropOnBoard()
     */
    refreshBoard() {
        this.eachSquare((square)=>{
            square.stored = false;
            square.state.gotoAndStop(0);
        });

        // Clear 'loop' or 'fall off' text from screen
        this._endText.classList.remove('text-end');

        this._bg.gotoAndStop(0);
        this._looping = 0;
        this.visited.length = 0;
    }

    /*
     * Restart checker from same spot without rebuilding board
     */
    random() {
        let x = Math.floor(Math.random() * this.boardSize);
        let y = Math.floor(Math.random() * this.boardSize);
        this._startX = x;
        this._startY = y;
    }

    /*
     * Transition animation
     */
    lightUpSquare(x, y) {
        let currSquare = this.squares[x][y];
        // If the square isn't lit up yet, light it up white
        if (currSquare && currSquare.state.currentFrame < 1) {
            PIXI.animate.Animator.play(currSquare.state, this._game.config.frameLabels.VISITED);
        }
    }

    /*
     * State of board if checker is looping, accessed by this._game.checkPosition
     */
    loopState(x, y) {
        if (this.squares[x][y].stored) {
            this._looping++;
        }
        if (this._looping === 1) {

            // Turn visited squares green
            this.visited.forEach((spot) => {
                PIXI.animate.Animator.play(this.squares[spot.x][spot.y].state, this._game.config.frameLabels.LOOPING);
            });

            this._game.playAudio('bell', 200);

            // Turn BG green
            PIXI.animate.Animator.play(this._bg, this._game.config.frameLabels.LOOPING);

            // Show text onscreen
            this._endText.innerHTML = 'YOU ARE IN A LOOP';
            this._endText.classList.add('text-end');

        // This is to stop repeated green square transition animation
        } if (this._looping > 1) {
            this.visited.forEach((spot) => {
                this.squares[spot.x][spot.y].state.gotoAndStop('looping_stop');
            });
        }
    }

    /*
     * State of board if checker falls off edge, accessed by this._game.checkPosition
     */
    edgeState() {
        // Remove "last visited" spot since it will be off the board
        this.visited.pop();

        // Turn squares red
        this.visited.forEach((spot) => {
            PIXI.animate.Animator.play(this.squares[spot.x][spot.y].state, this._game.config.frameLabels.FALL);
        });

        // this.visited.length = 0;

        // Turn BG red
        PIXI.animate.Animator.play(this._bg, this._game.config.frameLabels.FALL);

        // Show text onscreen
        this._endText.innerHTML = 'YOU FELL OFF THE EDGE';
        this._endText.classList.add('text-end');
    }
}
