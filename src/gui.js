class GUI {
    constructor() {
        this.staggerGUI();
        this.bipListener();
        
        this.playPauseButton = document.getElementById('playPause');
        this.restartButton = document.getElementById('restart')
        this.shuffleButton = document.getElementById('shuffle')
        this.randomButton = document.getElementById('random')
        this.resizeButton = document.getElementById('resize')
        
        this.playPauseButton.addEventListener('click', this.playPause.bind(this));
        this.restartButton.addEventListener('click', this.restart.bind(this));
        this.shuffleButton.addEventListener('click', this.shuffle.bind(this));
        this.randomButton.addEventListener('click', this.randomStart.bind(this));
        this.resizeButton.addEventListener('click', this.resize.bind(this));
    }
    
    /*
     * Pause/resume checker
     */
    playPause() {
        // Turn off button if there's no checker or if it fell off the edge
        if (!game.visited.length || !game.checker) {
            // Issue: If you click pause when checker is in motion off the edge of the board,
            // pause will stay in effect if you restart, shuffle, or resize.
            // I haven't figured out the condition to check and see if we're in that state.
            return;
        }
        game.pauseClicked = !game.pauseClicked;
        if (game.pauseClicked) {
            document.getElementById('playPause').innerHTML = '<p>PLAY</p>'
        } else {
            game.play();
            document.getElementById('playPause').innerHTML = '<p>PAUSE</p>'
        }
    }
    
    /*
     * Plays current turn again from the same start spot
     */
    restart() {
        if (game.pauseClicked) {
            // Reset pause button
            this.playPause();
        }
        if (!game.visited.length) {
            // Turn off button if game hasn't started yet
            return;
        }
        game.restart();
    }
    
    /*
     * Shuffles arrows
     */
    shuffle() {
        if (game.pauseClicked) {
            // Reset pause button
            this.playPause();
        }
        // Don't reshuffle if shuffle is already in progress
        // This works most of the time, but not perfectly... how to make it better?
        if (!game.tableSetInProgress) {
            game.removeBoard();
            game.createSquareArr();
        }
    }
    
    /*
     * Starts player at a random square on the board
     */
    randomStart() {
        if (game.pauseClicked) {
            // Reset pause button
            this.playPause();
        }
        game.randomClicked = true;
        game.restart();
    }
        
    /*
     * Resizes board
     */
    resize() {
        game.BOARD_SIZE = document.getElementById('resize-input').value;
        this.shuffle();
    }

    /*
     * Resizes board when enter is pressed
     */
    resizeOnEnter(el) {
        if(event.keyCode == 13) {
            game.BOARD_SIZE = el.value;
            this.shuffle();
        }
    }
    
    bipListener() {
        let guiElems = document.getElementsByClassName('gui-element');
        for (let i = 0; i < guiElems.length; i++) {
            guiElems[i].addEventListener('mouseenter', ()=>{
                game.playAudio('bip', 0)
            })
        }
    }

    /*
     * Style for GUI motion
     */
    staggerGUI() {
        let guiElems = document.querySelectorAll('.gui-element .box-resize');
        let gui = document.getElementById('gui');

        // Stagger GUI motion
        gui.addEventListener('mouseover', () => {
            for ( let i = 0; i < guiElems.length; i++ ) {
                let elem = guiElems[i];
                let delay = guiElems.length - i - 1;
                elem.style.transitionDelay = ( delay * 50 ) + 'ms';
            }
        });
    }
}

module.exports = GUI;