class Game {
    constructor() {
        this.visited = [];
        this.pauseClicked = false;
        this.randomClicked = false;
        this.looping = 0;
        
        this.board = new Board();
        this.checker = new Checker();
    }
    
    
    restart() {
        this.visited.length = 0;
        this.looping = 0;
    }
    
    /*
     * Check if we're still on the board or in a loop, call this.checker.move again if so
     */
    checkPosition(x, y) {
        
        // If the new position is on the board, compare it to previous spots
        if (x >=0 && x < this.board.BOARD_SIZE && y >= 0 && y < this.board.BOARD_SIZE) {
            if (this.board.squares[x][y].stored) {
                this.looping++;
            }
            this.board.loopState();
            
            // Set checker's onscreen position at new spot
            this.checker.newPlace(x, y);
            
            // Make another move from the new position with a recursive call
            this.checker.move(x, y);
            
        // If it's not on the board, you fell off the edge!
        } else {
            this.board.edgeState();
            this.checker.edgeState(x, y);
        }
    }
}

module.exports = Game;

