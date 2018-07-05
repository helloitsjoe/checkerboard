import * as PIXI from 'pixi.js';
import Game from './game';

const config = require('./gameConfig.json');
const squareLib = require('../assets/square.js');
const DEFAULT_START_SIZE = 4;

type Spot = {
    x: number,
    y: number
}

export default class Board {

    public size: number;
    public startX: number;
    public startY: number;
    public xOffset: number;
    public yOffset: number;
    public squares: Array<PIXI.animate.MovieClip>; // TODO: Get animate typings
    public visited: Array<Spot>;
    private board: PIXI.Container;
    private _bg: PIXI.animate.MovieClip;
    private _boardBase: PIXI.animate.MovieClip;
    private _game: Game;
    private _tableSetInProgress = false;
    private _endText: HTMLElement;
    private _loopState: number;
    
    constructor(game: Game) {
        this._game = game;
        this._endText = document.getElementById('text');

        const input = document.getElementById('resize-input') as HTMLInputElement;
        this.size = parseInt(input.value) || DEFAULT_START_SIZE;

        this.xOffset = config.SQUARE_WIDTH / 2;
        this.yOffset = (config.SQUARE_HEIGHT - 24) / 2;

        this.squares = this.createSquareArr(this.size);
        this.visited = [];
    }

    /*
    * Create an array to fill with squares/directions
    */
    private createSquareArr(size): PIXI.animate.MovieClip[] {
        const arr: PIXI.animate.MovieClip = [];
        for (let x = 0; x < size; ++x) {
            arr[x] = [];
            for (let y = 0; y < size; ++y) {
                arr[x][y] = null;
            }
        }
        return arr;
    }

    /*
     * Build the board
     */
    public setTheTable(test?: PIXI.animate.MovieClip): void {
        if (test) {
            this._bg = test.bg;
            this._boardBase = test.boardBase;
        }

        this._bg.gotoAndStop(0);
        this.board = new PIXI.Container();
        this._game.stage.addChild(this.board);

        this.board.x = this._game.stage.width / 2;
        this.board.y = this._game.stage.height / 2 - 60;
        this._boardBase.y = 440 + (5 * this.size);
        this.board.scale.x = this.board.scale.y = (this._game.stage.width / (config.SQUARE_WIDTH * this.size)) * config.BOARD_SCALE_PCT;

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
                            }, config.STAGGER_TIME * idx);
                        }(col));
                    }
                }, config.STAGGER_TIME * (idx + (len * idx)));
            }(row));
        }
    }

    /*
     * Generic function for when I need to do something to every square
     */
    private eachSquare(cb: Function) {
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
    private addSquare(x: number, y: number): void {
        this._tableSetInProgress = true;

        PIXI.animate.load(squareLib.stage, this.board, (square) => {
            square.x = ( x - y ) * this.xOffset;
            square.y = ( y + x ) * this.yOffset;
            square.hitArea = new PIXI.Polygon([-this.xOffset, 0, 0, this.yOffset, this.xOffset, 0, 0, -this.yOffset]);
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
                this._game.checker.restart();
            });

            this._game.playAudio('set', 200);

            PIXI.animate.Animator.play(square, 'fadeIn', ()=>{
                this._tableSetInProgress = false;
            });
        }, 'assets');
    }

    /**
     * Add the checker MovieClip as a child of the board Container
     */
    public addChecker(checker: PIXI.animate.MovieClip, x: number, y: number): void {
        this.board.addChild(checker);
        this.visited.push({x, y}); // Add first position to array
    }

    /*
     * Remove board and create a new one - called by gui.shuffle()
     */
    public createNew(): void {
        this._tableSetInProgress = true;

        // If we've started a round, remove the checker
        if (this.visited.length && this._game.checker.exists()) {
            this._game.checker.remove();
        }

        this._game.playAudio('remove', 200);

        this.eachSquare((square)=>{
            // Turn off all squares lit state
            square.state.gotoAndStop(0);
            PIXI.animate.Animator.play(square, 'fadeOut', () => {
                this._game.stage.removeChild(this.board);
                this.board.destroy();
            });
        });

        // resizeBoard needs the array of squares to be reset
        this.squares.length = 0;
        this.refreshBoard();
        this.squares = this.createSquareArr(this.size);
        setTimeout(()=>{
            if (this._game.checker.exists()) {
                this._game.checker.destroy();
            }
            this.setTheTable();
        }, 500)
    }

    /*
     * Reset states of elements
     * Called by this.createNew() and this._game.checker.dropOnBoard()
     */
    public refreshBoard(): void {
        this.eachSquare((square)=>{
            square.stored = false;
            square.state.gotoAndStop(0);
        });

        // Clear 'loop' or 'fall off' text from screen
        this._endText.classList.remove('text-end');

        this._bg.gotoAndStop(0);
        this._loopState = 0;
        this.visited.length = 0;
    }

    /*
     * Restart checker from same spot without rebuilding board
     */
    public random(): void {
        this.startX = Math.floor(Math.random() * this.size);
        this.startY = Math.floor(Math.random() * this.size);
    }

    /*
     * Transition animation
     */
    public lightUpSquare(x: number, y: number): void {
        let currSquare = this.squares[x][y];
        // If the square isn't lit up yet, light it up white
        if (currSquare && currSquare.state.currentFrame < 1) {
            PIXI.animate.Animator.play(currSquare.state, config.frameLabels.VISITED);
        }
    }

    /*
     * State of board if checker is looping, accessed by this._game.checkPosition
     */
    public updateLoopState(x: number, y: number): void {
        if (this.squares[x][y].stored) {
            this._loopState++;
        }
        if (this._loopState === 1) {

            // Turn visited squares green
            this.visited.forEach((spot) => {
                PIXI.animate.Animator.play(this.squares[spot.x][spot.y].state, config.frameLabels.LOOPING);
            });

            this._game.playAudio('bell', 200);

            // Turn BG green
            PIXI.animate.Animator.play(this._bg, config.frameLabels.LOOPING);

            // Show text onscreen
            this._endText.innerHTML = 'YOU ARE IN A LOOP';
            this._endText.classList.add('text-end');

        // This is to stop repeated green square transition animation
        } if (this._loopState > 1) {
            this.visited.forEach((spot) => {
                this.squares[spot.x][spot.y].state.gotoAndStop('looping_stop');
            });
        }
    }

    /*
     * State of board if checker falls off edge, accessed by this._game.checkPosition
     */
    public updateEdgeState(): void {
        // Remove "last visited" spot since it will be off the board
        this.visited.pop();

        // Turn squares red
        this.visited.forEach((spot) => {
            PIXI.animate.Animator.play(this.squares[spot.x][spot.y].state, config.frameLabels.FALL);
        });

        // this.visited.length = 0;

        // Turn BG red
        PIXI.animate.Animator.play(this._bg, config.frameLabels.FALL);

        // Show text onscreen
        this._endText.innerHTML = 'YOU FELL OFF THE EDGE';
        this._endText.classList.add('text-end');
    }
}
