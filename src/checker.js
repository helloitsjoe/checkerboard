class Checker {
    constructor() {
        
    }
    
    /*
     * Initial placement of checker on board
     */
    dropChecker(x, y) {
        game.restartSetup();
        PIXI.animate.load(lib.checker, board.board, (checker)=>{
            board.checker = checker;
            this.placeChecker(x, y);
            
            playAudio('whoosh', 0);
            
            PIXI.animate.Animator.play(checker, 'dropIn', ()=>{
                this.moveChecker(x, y);
            });
        }, 'assets');
    }
    
    /*
     * Sets x/y position on stage
     */
    placeChecker(x, y) {
        board.checker.gotoAndStop('pause');
        
        // Add first position to array
        game.visited.push({x, y});
        if (board.squares[x] && board.squares[x][y]) {
            board.squares[x][y].stored = true;
        }
        board.checker.x = ( x - y ) * board.X_OFFSET;
        board.checker.y = ( y + x ) * board.Y_OFFSET;
    }

    /*
     * Resume from pause
     */
    play(x, y) {
        game.pauseClicked = false;
        let lastVisited = game.visited[game.visited.length - 1];
        this.placeChecker(lastVisited.x, lastVisited.y);
        this.moveChecker(lastVisited.x, lastVisited.y);
    }
        
    /*
     * Move the checker one space
     */
    moveChecker(x, y) {
        let currSquare = board.squares[x][y];
        // If the square isn't lit up yet, light it up white
        if (currSquare.state.currentFrame < 1) {
            PIXI.animate.Animator.play(currSquare.state, config.frameLabels.VISITED);
        }
        if (game.pauseClicked) {
            return;
        }
        
        let moveAnimLabel = 'move' + board.squares[x][y].direction;
        
        // Note: My dog Olive HATES this sound.
        playAudio('shift', 400);
        
        PIXI.animate.Animator.play(board.checker, moveAnimLabel, ()=>{
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
            game.checkPosition(x, y);
        });
    }
}

module.exports = Checker;