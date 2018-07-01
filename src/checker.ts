import * as PIXI from 'pixi.js';
import Board from './board';
require('pixi-animate');

const checkerLib = require('../assets/checker.js');
const config = require('./gameConfig.json');

export default class Checker {

    private _clip;
    private _game;
    private _board: Board;
    private _moveAnimLabel;

    constructor(game, board) {
        this._game = game;
        this._board = board;
    }

    public exists(): boolean {
        return !!this._clip;
    }

    /*
     * Initial placement of checker on board
     */
    private dropOnBoard(x: number, y: number): void {
        this._board.refreshBoard();
        PIXI.animate.load(checkerLib.stage, null, (checker) => {
            this._clip = checker;
            this._board.addChecker(this._clip, x, y);

            this.newPlace(x, y);

            this._game.playAudio('whoosh', 0);

            PIXI.animate.Animator.play(this._clip, 'dropIn', () => {
                this.move(x, y);
            });
        }, 'assets');
    }

    /*
     * Restart checker's position
     */
    public restart(): void {
        this._game.togglePause();
        if (!this._clip) {
            // If the checker fell off, don't play 'dropOut' animation
            this.dropOnBoard(this._board.startX, this._board.startY);
        } else {
            this._game.playAudio('whooshOut', 200);

            PIXI.animate.Animator.play(this._clip, 'dropOut', () => {
                this.destroy();
                this.dropOnBoard(this._board.startX, this._board.startY);
            });
        }
    }

    /*
     * Sets x/y position on stage
     */
    public newPlace(x: number, y: number): void {
        this._clip.gotoAndStop('pause');

        if (this._board.squares[x] && this._board.squares[x][y]) {
            this._board.squares[x][y].stored = true;
        }
        this._clip.x = ( x - y ) * this._board.xOffset;
        this._clip.y = ( y + x ) * this._board.yOffset;
    }

    /*
     * Pause current animation
     */
    public pause(): void {
        if (this._clip) {
            PIXI.animate.Animator.stop(this._clip);
        }
    }

    /*
     * Resume from pause
     */
    public unpause(): void {
        let fallStopFrame = this._clip.labelsMap[`${config.frameLabels.FALL}_stop`];
        let moveStopFrame = this._clip.labelsMap[`${this._moveAnimLabel}_stop`];

        let endFrame = this._clip.currentFrame < moveStopFrame ? moveStopFrame : fallStopFrame;

        PIXI.animate.Animator.fromTo(this._clip, this._clip.currentFrame, endFrame, false, () => {
            let lastVisited = this._board.visited[this._board.visited.length - 1];
            this._game.checkPosition(lastVisited.x, lastVisited.y);
        });
    }

    /*
     * Remove checker when it falls off the edge or if the board gets reset
     */
    public remove(x?: number, y?: number) {
        if (x || y) {
            // Move checker's onscreen position off the board
            this.newPlace(x, y);
        }

        this._game.playAudio('zap', 200);

        PIXI.animate.Animator.play(this._clip, config.frameLabels.FALL, () => {
            this.destroy();
        });
    }

    public destroy(): void {
        this._clip.destroy();
        this._clip = null;
    }

    /*
     * Move the checker one space
     */
    public move(x: number, y: number): void {
        this._board.lightUpSquare(x, y);

        let direction = this._board.squares[x][y].direction;
        this._moveAnimLabel = 'move' + direction;

        // Note: My dog Olive HATES this sound.
        this._game.playAudio('shift', 400);

        // Move based on direction
        switch(direction){
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

        this._board.visited.push({x, y});

        PIXI.animate.Animator.play(this._clip, this._moveAnimLabel, ()=>{
            this._game.checkPosition(x, y);
        });
    }
}
