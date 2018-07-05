import * as PIXI from 'pixi.js';
import Gui from './Gui';
import Board from './Board';
import Checker from './Checker';

const config = require('./gameConfig.json');

export default class Game {

    public stage = new PIXI.Container();
    public board: Board;
    public checker: Checker;
    private _gui: Gui;
    private _pauseClicked = false;
    private _tableSetInProgress = false;

    constructor() {
        this._gui = new Gui(this);
        this.board = new Board(this);
        this.checker = new Checker(this, this.board);
    }
    
    /*
     * Check if we're still on the board or in a loop, call this.checker.move again if so
     */
    private checkPosition(x: number, y: number): void {
        // If the new position is on the board, compare it to previous spots
        if (x >= 0 && x < this.board.size && y >= 0 && y < this.board.size) {
            this.board.updateLoopState(x, y);
            
            // Set checker's onscreen position at new spot and move from there
            this.checker.newPlace(x, y);
            this.checker.move(x, y);
            
        // If it's not on the board, you fell off the edge!
        } else {
            this.board.updateEdgeState();
            this.checker.remove(x, y);
        }
    }
    
    /*
     * Pause/resume checker
     */
    private playPause(): void {
        // Turn off button if there's no checker or if it fell off the edge
        if (!this.board.visited.length) {
            return;
        }
        this.checker.pause();
        this._pauseClicked = !this._pauseClicked;
        if (this._pauseClicked) {
            document.getElementById('playPause').innerHTML = '<p>PLAY</p>'
        } else {
            if (this.checker.exists()) {
                this._pauseClicked = false;
                this.checker.unpause();
            }
            document.getElementById('playPause').innerHTML = '<p>PAUSE</p>'
        }
    }

    /*
     * Plays current turn again from the same start spot
     */
    public restart(): void {
        if (!this.board.visited.length) {
            // Turn off button if game hasn't started yet
            return;
        }
        this.checker.restart();
    }
    
    /*
     * Shuffles arrows
     */
    private shuffle(): void {
        this.togglePause();
        // Don't reshuffle if shuffle is already in progress
        // This works most of the time, but not perfectly... how to make it better?
        if (!this._tableSetInProgress) {
            this.board.createNew();
        }
    }
    
    /*
     * Starts player at a random square on the board
     */
    public randomStart(): void {
        this.board.random();
        this.checker.restart();
    }
        
    /*
     * Resizes board
     */
    private resize(): void {
        const input = document.getElementById('resize-input') as HTMLInputElement;
        this.board.size = parseInt(input.value);
        this.shuffle();
    }

    /*
     * Resizes board when enter is pressed
     */
    private resizeOnEnter(event: KeyboardEvent): void {
        // TODO: Make sure el and event are the right arguments
        if (event.key === 'Enter') {
            this.board.size = parseInt((<HTMLInputElement>event.target).value);
            this.shuffle();
        }
    }
    
    /*
     * Repeated logic in shuffle, restart, randomStart
     */
    private togglePause(): void {
        if (this._pauseClicked) {
            this.playPause();
        }
    }
    
    /*
     * Plays audio from wav file
     */
    public playAudio(sound: string, ms: number) {
        setTimeout(()=>{
            new Audio(`./audio/${sound}.wav`).play();
        }, ms)
    }
}

