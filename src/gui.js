class GUI {
    constructor() {
        this.staggerGUI();
        this.bipListener();
        document.getElementById('playPause').addEventListener('click', this.playPause.bind(this));
        document.getElementById('restart').addEventListener('click', this.restart.bind(this));
        document.getElementById('shuffle').addEventListener('click', this.shuffle.bind(this));
        document.getElementById('random').addEventListener('click', this.randomStart.bind(this));
        document.getElementById('resize').addEventListener('click', this.resize.bind(this));
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
        if (!game.checker) {
            // If the checker fell off, don't play 'dropOut' animation
            game.dropChecker(this.clickedX, this.clickedY);
        } else {
            game.playAudio('whooshOut', 200);
            
            PIXI.animate.Animator.play(game.checker, 'dropOut', () => {
                game.dropChecker(this.clickedX, this.clickedY);
            });
        }
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
        if (game.checker) {
            game.playAudio('whooshOut', 200);

            // Would be nice not to have to repeat this code
            PIXI.animate.Animator.play(game.checker, 'dropOut', ()=>{
                let x = Math.floor(Math.random() * game.BOARD_SIZE);
                let y = Math.floor(Math.random() * game.BOARD_SIZE);
                this.clickedX = x;
                this.clickedY = y;
                game.dropChecker(x, y);
            });
        } else {
            let x = Math.floor(Math.random() * game.BOARD_SIZE);
            let y = Math.floor(Math.random() * game.BOARD_SIZE);
            this.clickedX = x;
            this.clickedY = y;
            game.dropChecker(x, y);
        }
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