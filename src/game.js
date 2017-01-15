class Game {
    constructor() {
        this.visited = [];
        this.pauseClicked = false;
        this.randomClicked = false;
        this.looping = 0;
        
        this.board = new Board();
        this.checker = new Checker();
    }
    
    reInit() {
        this.visited.length = 0;
        this.looping = 0;
    }
    
    /*
     * Pause/resume checker
     */
    playPause() {
        // Turn off button if there's no checker or if it fell off the edge
        if (!this.visited.length || !checker.checker) {
            // Issue: If you click pause when checker is in motion off the edge of the board,
            // pause will stay in effect if you restart, shuffle, or resize.
            // I haven't figured out the condition to check and see if we're in that state.
            return;
        }
        this.pauseClicked = !this.pauseClicked;
        if (this.pauseClicked) {
            document.getElementById('playPause').innerHTML = '<p>PLAY</p>'
        } else {
            checker.unpause();
            document.getElementById('playPause').innerHTML = '<p>PAUSE</p>'
        }
    }
    
    
    /*
     * Plays current turn again from the same start spot
     */
    restart() {
        if (!this.visited.length) {
            // Turn off button if game hasn't started yet
            return;
        }
        this.togglePause();
        board.restart();
        checker.restart();
    }
    
    /*
     * Shuffles arrows
     */
    shuffle() {
        this.togglePause();
        // Don't reshuffle if shuffle is already in progress
        // This works most of the time, but not perfectly... how to make it better?
        if (!this.tableSetInProgress) {
            board.createNew();
            board.createSquareArr();
        }
    }
    
    /*
     * Starts player at a random square on the board
     */
    randomStart() {
        this.togglePause();
        board.randomClicked = true;
        board.restart();
        // checker.restart();
    }
        
    /*
     * Resizes board
     */
    resize() {
        board.BOARD_SIZE = document.getElementById('resize-input').value;
        this.shuffle();
    }

    /*
     * Resizes board when enter is pressed
     */
    resizeOnEnter(el) {
        if(event.keyCode == 13) {
            board.BOARD_SIZE = el.value;
            this.shuffle();
        }
    }
    
    togglePause() {
        if (this.pauseClicked) {
            this.playPause();
        }
    }
    
    /*
     * Check if we're still on the board or in a loop, call checker.move again if so
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

