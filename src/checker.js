class Checker {
    constructor() {
        this._checker;
        this._moveAnimLabel;
    }
    
    /*
     * Initial placement of checker on board
     */
    dropOnBoard(x, y) {
        board.refreshBoard();
        PIXI.animate.load(lib.checker, board.board, (checker)=>{
            this._checker = checker;
            // Add first position to array
            board.visited.push({x, y});
            
            this.newPlace(x, y);
            
            playAudio('whoosh', 0);
            
            PIXI.animate.Animator.play(checker, 'dropIn', ()=>{
                this.move(x, y);
            });
        }, 'assets');
    }
    
    /*
     * Restart checker's position
     */
    restart() {
        game.togglePause();
        if (!this._checker) {
            // If the checker fell off, don't play 'dropOut' animation
            this.dropOnBoard(board._startX, board._startY);
        } else {
            playAudio('whooshOut', 200);
            
            PIXI.animate.Animator.play(this._checker, 'dropOut', () => {
                this.destroy();
                this.dropOnBoard(board._startX, board._startY);
            });
        }
    }
    
    /*
     * Sets x/y position on stage
     */
    newPlace(x, y) {
        this._checker.gotoAndStop('pause');
        
        if (board.squares[x] && board.squares[x][y]) {
            board.squares[x][y].stored = true;
        }
        this._checker.x = ( x - y ) * board.X_OFFSET;
        this._checker.y = ( y + x ) * board.Y_OFFSET;
    }

    /*
     * Resume from pause
     */
    unpause() {
        let fallStopFrame = checker._checker.labelsMap[`${config.frameLabels.FALL}_stop`];
        let moveStopFrame = checker._checker.labelsMap[`${this._moveAnimLabel}_stop`];
        
        let endFrame = this._checker.currentFrame < moveStopFrame ? moveStopFrame : fallStopFrame;

        PIXI.animate.Animator.fromTo(this._checker, this._checker.currentFrame, endFrame, false, () => {
            let lastVisited = board.visited[board.visited.length - 1];
            game.checkPosition(lastVisited.x, lastVisited.y);
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
        
        playAudio('zap', 200);
        
        PIXI.animate.Animator.play(this._checker, config.frameLabels.FALL, () => {
            this.destroy();
        });
    }
    
    destroy() {
        this._checker.destroy();
        this._checker = null;
    }
        
    /*
     * Move the checker one space
     */
    move(x, y) {
        let currSquare = game.board.squares[x][y];
        // If the square isn't lit up yet, light it up white
        if (currSquare && currSquare.state.currentFrame < 1) {
            PIXI.animate.Animator.play(currSquare.state, config.frameLabels.VISITED);
        }

        this._moveAnimLabel = 'move' + board.squares[x][y].direction;
        
        // Note: My dog Olive HATES this sound.
        playAudio('shift', 400);
        
        // Move based on direction
        switch(board.squares[x][y].direction){
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

        board.visited.push({x, y});
        
        PIXI.animate.Animator.play(this._checker, this._moveAnimLabel, ()=>{
            game.checkPosition(x, y);
        });
    }
}

module.exports = Checker;