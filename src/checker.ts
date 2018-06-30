import * as PIXI from 'pixi.js';
require('pixi-animate');

const checkerLib = require('../assets/checker.js');
const config = require('./gameConfig.json');

export default class Checker {

    public clip;
    private _game;
    private _moveAnimLabel;

    constructor(game) {
        this._game = game;
    }

    /*
     * Initial placement of checker on board
     */
    dropOnBoard(x, y) {
        this._game.board.refreshBoard();
        PIXI.animate.load(checkerLib.stage, this._game.board.board, (checker) => {
            this.clip = checker;
            // Add first position to array
            this._game.board.visited.push({x, y});

            this.newPlace(x, y);

            this._game.playAudio('whoosh', 0);

            PIXI.animate.Animator.play(this.clip, 'dropIn', () => {
                this.move(x, y);
            });
        }, 'assets');
    }

    /*
     * Restart checker's position
     */
    restart() {
        this._game.togglePause();
        if (!this.clip) {
            // If the checker fell off, don't play 'dropOut' animation
            this.dropOnBoard(this._game.board._startX, this._game.board._startY);
        } else {
            this._game.playAudio('whooshOut', 200);

            PIXI.animate.Animator.play(this.clip, 'dropOut', () => {
                this.destroy();
                this.dropOnBoard(this._game.board._startX, this._game.board._startY);
            });
        }
    }

    /*
     * Sets x/y position on stage
     */
    newPlace(x, y) {
        this.clip.gotoAndStop('pause');

        if (this._game.board.squares[x] && this._game.board.squares[x][y]) {
            this._game.board.squares[x][y].stored = true;
        }
        this.clip.x = ( x - y ) * this._game.board.X_OFFSET;
        this.clip.y = ( y + x ) * this._game.board.Y_OFFSET;
    }

    /*
     * Pause current animation
     */
    pause() {
        if (this.clip) {
            PIXI.animate.Animator.stop(this.clip);
        }
    }

    /*
     * Resume from pause
     */
    unpause() {
        let fallStopFrame = this.clip.labelsMap[`${config.frameLabels.FALL}_stop`];
        let moveStopFrame = this.clip.labelsMap[`${this._moveAnimLabel}_stop`];

        let endFrame = this.clip.currentFrame < moveStopFrame ? moveStopFrame : fallStopFrame;

        PIXI.animate.Animator.fromTo(this.clip, this.clip.currentFrame, endFrame, false, () => {
            let lastVisited = this._game.board.visited[this._game.board.visited.length - 1];
            this._game.checkPosition(lastVisited.x, lastVisited.y);
        });
    }

    /*
     * Remove checker when it falls off the edge or if the board gets reset
     */
    remove(x, y) {
        // Move checker's onscreen position off the board
        if (x || y) {
            this.newPlace(x, y);
        }

        this._game.playAudio('zap', 200);

        PIXI.animate.Animator.play(this.clip, config.frameLabels.FALL, () => {
            this.destroy();
        });
    }

    destroy() {
        this.clip.destroy();
        this.clip = null;
    }

    /*
     * Move the checker one space
     */
    move(x, y) {
        this._game.board.lightUpSquare(x, y);

        let direction = this._game.board.squares[x][y].direction;
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

        this._game.board.visited.push({x, y});

        PIXI.animate.Animator.play(this.clip, this._moveAnimLabel, ()=>{
            this._game.checkPosition(x, y);
        });
    }
}
