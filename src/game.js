

class Game {
    constructor() {
        this.visited = [];
        this.pauseClicked = false;
        this.randomClicked = false;
        this.looping = 0;
    }
    
    restart() {
        this.visited.length = 0;
        this.looping = 0;
    }
    
    /*
     * Check if we're still on the board or in a loop, call checker.move again if so
     */
    checkPosition(x, y) {
        
        // If the new position is on the board, compare it to previous spots
        if (x >=0 && x < board.BOARD_SIZE && y >= 0 && y < board.BOARD_SIZE) {
            if (board.squares[x][y].stored) {
                this.looping++;
            }
            board.loopState();
            
            // Set checker's onscreen position at new spot
            checker.newPlace(x, y);
            
            // Make another move from the new position with a recursive call
            checker.move(x, y);
            
        // If it's not on the board, you fell off the edge!
        } else {
            board.edgeState();
            checker.edgeState(x, y);
        }
    }
}

module.exports = Game;

