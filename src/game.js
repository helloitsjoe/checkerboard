class Game {
    constructor() {
        this.pauseClicked = false;
    }
    
    /*
     * Check if we're still on the board or in a loop, call checker.move again if so
     */
    checkPosition(x, y) {
        // If the new position is on the board, compare it to previous spots
        if (x >=0 && x < board.BOARD_SIZE && y >= 0 && y < board.BOARD_SIZE) {
            board.loopState(x, y);
            
            // Set checker's onscreen position at new spot and move from there
            checker.newPlace(x, y);
            checker.move(x, y);
            
        // If it's not on the board, you fell off the edge!
        } else {
            board.edgeState();
            checker.remove(x, y);
        }
    }
    
    /*
     * Pause/resume checker
     */
    playPause() {
        PIXI.animate.Animator.stop(checker._clip);
        // Turn off button if there's no checker or if it fell off the edge
        if (!board.visited.length) {
            return;
        }
        this.pauseClicked = !this.pauseClicked;
        if (this.pauseClicked) {
            document.getElementById('playPause').innerHTML = '<p>PLAY</p>'
        } else {
            if (checker._clip) {
                this.pauseClicked = false;
                checker.unpause();
            }
            document.getElementById('playPause').innerHTML = '<p>PAUSE</p>'
        }
    }
    
    
    /*
     * Plays current turn again from the same start spot
     */
    restart() {
        if (!board.visited.length) {
            // Turn off button if game hasn't started yet
            return;
        }
        checker.restart();
    }
    
    /*
     * Shuffles arrows
     */
    shuffle() {
        this.togglePause();
        // Don't reshuffle if shuffle is already in progress
        // This works most of the time, but not perfectly... how to make it better?
        if (!this._tableSetInProgress) {
            board.createNew();
            board.createSquareArr();
        }
    }
    
    /*
     * Starts player at a random square on the board
     */
    randomStart() {
        board.random();
        checker.restart();
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
    
    /*
     * Repeated logic in shuffle, restart, randomStart
     */
    togglePause() {
        if (this.pauseClicked) {
            this.playPause();
        }
    }
}

module.exports = Game;

