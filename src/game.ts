import * as PIXI from 'pixi.js';
import Gui from './Gui';
import Board from './Board';
import Checker from './Checker';

const config = require('./gameConfig.json');

export default class Game {

    public stage = new PIXI.Container();
    public board: Board;
    public checker: Checker;
    private gui: Gui;
    private pauseClicked = false;
    private _tableSetInProgress = false;

    constructor() {
        this.gui = new Gui(this);
        this.board = new Board(this);
        this.checker = new Checker(this, this.board);
    }
    
    /*
     * Check if we're still on the board or in a loop, call this.checker.move again if so
     */
    checkPosition(x, y) {
        // If the new position is on the board, compare it to previous spots
        if (x >=0 && x < this.board.boardSize && y >= 0 && y < this.board.boardSize) {
            this.board.loopState(x, y);
            
            // Set checker's onscreen position at new spot and move from there
            this.checker.newPlace(x, y);
            this.checker.move(x, y);
            
        // If it's not on the board, you fell off the edge!
        } else {
            this.board.edgeState();
            this.checker.remove(x, y);
        }
    }
    
    /*
     * Pause/resume checker
     */
    playPause() {
        // Turn off button if there's no checker or if it fell off the edge
        if (!this.board.visited.length) {
            return;
        }
        this.checker.pause();
        this.pauseClicked = !this.pauseClicked;
        if (this.pauseClicked) {
            document.getElementById('playPause').innerHTML = '<p>PLAY</p>'
        } else {
            if (this.checker.clip) {
                this.pauseClicked = false;
                this.checker.unpause();
            }
            document.getElementById('playPause').innerHTML = '<p>PAUSE</p>'
        }
    }
    
    
    /*
     * Plays current turn again from the same start spot
     */
    restart() {
        if (!this.board.visited.length) {
            // Turn off button if game hasn't started yet
            return;
        }
        this.checker.restart();
    }
    
    /*
     * Shuffles arrows
     */
    shuffle() {
        this.togglePause();
        // Don't reshuffle if shuffle is already in progress
        // This works most of the time, but not perfectly... how to make it better?
        if (!this._tableSetInProgress) {
            this.board.createNew();
            // this.board.createSquareArr();
        }
    }
    
    /*
     * Starts player at a random square on the board
     */
    randomStart() {
        this.board.random();
        this.checker.restart();
    }
        
    /*
     * Resizes board
     */
    resize() {
        const input = document.getElementById('resize-input') as HTMLInputElement;
        this.board.boardSize = parseInt(input.value);
        this.shuffle();
    }

    /*
     * Resizes board when enter is pressed
     */
    resizeOnEnter(el, event) {
        // TODO: Make sure el and event are the right arguments
        if (event.keyCode === 13) {
            this.board.boardSize = el.value;
            this.shuffle();
        }
    }
    
    /*
     * Repeated logic in shuffle, restart, randomStart
     */
    togglePause() {
        if (this.pauseClicked) {
            this.playPause();
        }
    }
    
    /*
     * Plays audio from wav file
     */
    playAudio(sound, ms) {
        setTimeout(()=>{
            new Audio(`./audio/${sound}.wav`).play();
        }, ms)
    }
}

