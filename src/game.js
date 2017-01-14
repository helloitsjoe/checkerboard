

class Game {
    constructor() {
        this.visited = [];
        this.pauseClicked = false;
        this.randomClicked = false;
        this.looping = 0;
    }
    
    restart() {
        if (this.randomClicked) {
            this.randomClicked = false;
            let x = Math.floor(Math.random() * board.BOARD_SIZE);
            let y = Math.floor(Math.random() * board.BOARD_SIZE);
            board.startX = x;
            board.startY = y;
        }
        if (!board.checker) {
            // If the checker fell off, don't play 'dropOut' animation
            checker.dropChecker(board.startX, board.startY);
        } else {
            playAudio('whooshOut', 200);
            
            PIXI.animate.Animator.play(board.checker, 'dropOut', () => {
                checker.dropChecker(board.startX, board.startY);
            });
        }
    }
    
    /*
     * Reset states of elements
     * Called by removeBoard() and dropChecker()
     */
    restartSetup() {
        board.eachSquare((square)=>{
            square.stored = false;
            square.state.gotoAndStop(0);
        });
        
        // Clear 'loop' or 'fall off' text from screen
        board.endText.classList.remove('text-end');

        board.bg.gotoAndStop(0);
        this.visited.length = 0;
        this.looping = 0;
    }
    
    /*
     * Check if we're still on the board or in a loop, call moveChecker again if so
     */
    checkPosition(x, y) {
        
        // If the new position is on the board, compare it to previous spots
        if (x >=0 && x < board.BOARD_SIZE && y >= 0 && y < board.BOARD_SIZE) {
            
            if (board.squares[x][y].stored) {
                this.looping++;
            }
            
            if (this.looping === 1) {

                // Turn visited squares green
                this.visited.forEach((spot) => {
                    PIXI.animate.Animator.play(board.squares[spot.x][spot.y].state, config.frameLabels.LOOPING);
                });

                playAudio('bell', 200);
                
                // Turn BG green
                PIXI.animate.Animator.play(board.bg, config.frameLabels.LOOPING);
                
                // Show text onscreen
                board.endText.innerHTML = 'YOU ARE IN A LOOP';
                board.endText.classList.add('text-end');
                
            } if (this.looping > 1) {
                // This is to stop repeated animation of green squares
                this.visited.forEach((spot) => {
                    board.squares[spot.x][spot.y].state.gotoAndStop('looping_stop');
                });
            }
            
            // Set checker's onscreen position at new spot
            checker.placeChecker(x, y);
            
            // Make another move from the new position with a recursive call
            checker.moveChecker(x, y);
            
        // If it's not on the board, you fell off the edge!
        } else {
            // Turn squares red
            this.visited.forEach((spot) => {
                PIXI.animate.Animator.play(board.squares[spot.x][spot.y].state, config.frameLabels.FALL);
            });
            
            // Turn BG red
            PIXI.animate.Animator.play(board.bg, config.frameLabels.FALL);
            
            // Show text onscreen
            board.endText.innerHTML = 'YOU FELL OFF THE EDGE';
            board.endText.classList.add('text-end');
            
            // Move checker's onscreen position off the board
            checker.placeChecker(x, y);
            
            playAudio('zap', 200);
            
            PIXI.animate.Animator.play(board.checker, config.frameLabels.FALL, () => {
                board.checker.destroy();
                board.checker = null;
            })
        }
    }
}

module.exports = Game;

