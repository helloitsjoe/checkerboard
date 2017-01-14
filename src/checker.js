class Checker {
    constructor() {
        this.checker;
    }
    
    /*
     * Initial placement of checker on board
     */
    dropOnBoard(x, y) {
        game.board.refreshBoard();
        PIXI.animate.load(lib.checker, game.board.board, (checker)=>{
            this.checker = checker;
            this.newPlace(x, y);
            
            playAudio('whoosh', 0);
            
            PIXI.animate.Animator.play(checker, 'dropIn', ()=>{
                this.move(x, y);
            });
        }, 'assets');
    }
    
    restart() {
        if (!this.checker) {
            // If the checker fell off, don't play 'dropOut' animation
            this.dropOnBoard(game.board.startX, game.board.startY);
        } else {
            playAudio('whooshOut', 200);
            
            PIXI.animate.Animator.play(this.checker, 'dropOut', () => {
                this.dropOnBoard(game.board.startX, game.board.startY);
            });
        }
    }
    
    /*
     * Sets x/y position on stage
     */
    newPlace(x, y) {
        this.checker.gotoAndStop('pause');
        
        // Add first position to array
        game.visited.push({x, y});
        if (game.board.squares[x] && game.board.squares[x][y]) {
            game.board.squares[x][y].stored = true;
        }
        this.checker.x = ( x - y ) * game.board.X_OFFSET;
        this.checker.y = ( y + x ) * game.board.Y_OFFSET;
    }

    /*
     * Resume from pause
     */
    unpause(x, y) {
        game.pauseClicked = false;
        let lastVisited = game.visited[game.visited.length - 1];
        this.newPlace(lastVisited.x, lastVisited.y);
        this.move(lastVisited.x, lastVisited.y);
    }
    
    remove() {
        playAudio('zap', 200);
        PIXI.animate.Animator.play(checker.checker, config.frameLabels.FALL);
    }
        
    /*
     * Move the checker one space
     */
    move(x, y) {
        let currSquare = game.board.squares[x][y];
        // If the square isn't lit up yet, light it up white
        if (currSquare.state.currentFrame < 1) {
            PIXI.animate.Animator.play(currSquare.state, config.frameLabels.VISITED);
        }
        if (game.pauseClicked) {
            return;
        }
        
        let moveAnimLabel = 'move' + game.board.squares[x][y].direction;
        
        // Note: My dog Olive HATES this sound.
        playAudio('shift', 400);
        
        PIXI.animate.Animator.play(this.checker, moveAnimLabel, ()=>{
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
            game.checkPosition(x, y);
        });
    }
    
    edgeState(x, y) {
        // Move checker's onscreen position off the board
        this.newPlace(x, y);
        
        playAudio('zap', 200);
        
        PIXI.animate.Animator.play(this.checker, config.frameLabels.FALL, () => {
            this.checker.destroy();
            this.checker = null;
        });
    }
}

module.exports = Checker;