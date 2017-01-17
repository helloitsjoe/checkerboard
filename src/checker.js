class Checker {
    constructor(game) {
        this._clip;
        this._moveAnimLabel;
    }
    
    /*
     * Initial placement of checker on board
     */
    dropOnBoard(x, y) {
        game.board.refreshBoard();
        PIXI.animate.load(lib.checker, game.board.board, (checker)=>{
            this._clip = checker;
            // Add first position to array
            game.board.visited.push({x, y});
            
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
        if (!this._clip) {
            // If the checker fell off, don't play 'dropOut' animation
            this.dropOnBoard(game.board._startX, game.board._startY);
        } else {
            playAudio('whooshOut', 200);
            
            PIXI.animate.Animator.play(this._clip, 'dropOut', () => {
                this.destroy();
                this.dropOnBoard(game.board._startX, game.board._startY);
            });
        }
    }
    
    /*
     * Sets x/y position on stage
     */
    newPlace(x, y) {
        this._clip.gotoAndStop('pause');
        
        if (game.board.squares[x] && game.board.squares[x][y]) {
            game.board.squares[x][y].stored = true;
        }
        this._clip.x = ( x - y ) * game.board.X_OFFSET;
        this._clip.y = ( y + x ) * game.board.Y_OFFSET;
    }

    /*
     * Resume from pause
     */
    unpause() {
        let fallStopFrame = this._clip.labelsMap[`${game.config.frameLabels.FALL}_stop`];
        let moveStopFrame = this._clip.labelsMap[`${this._moveAnimLabel}_stop`];
        
        let endFrame = this._clip.currentFrame < moveStopFrame ? moveStopFrame : fallStopFrame;

        PIXI.animate.Animator.fromTo(this._clip, this._clip.currentFrame, endFrame, false, () => {
            let lastVisited = game.board.visited[game.board.visited.length - 1];
            this.newPlace(lastVisited.x, lastVisited.y)
            this.move(lastVisited.x, lastVisited.y)
            // game.checkPosition(lastVisited.x, lastVisited.y);
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
        
        PIXI.animate.Animator.play(this._clip, game.config.frameLabels.FALL, () => {
            this.destroy();
        });
    }
    
    destroy() {
        this._clip.destroy();
        this._clip = null;
    }
        
    /*
     * Move the checker one space
     */
    move(x, y) {
        game.board.lightUpSquare(x, y);

        this._moveAnimLabel = 'move' + game.board.squares[x][y].direction;
        
        // Note: My dog Olive HATES this sound.
        playAudio('shift', 400);
        
        // Move based on direction
        switch(game.board.squares[x][y].direction){
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

        game.board.visited.push({x, y});
        game.checkPosition(x, y);
    }
    
    /*
     * Animate the checker moving
     */
    animateMove(callback) {
        PIXI.animate.Animator.play(this._clip, this._moveAnimLabel, callback);
    }
}

module.exports = Checker;