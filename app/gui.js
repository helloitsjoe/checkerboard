class GUI {
    
    constructor() {
        this.staggerGUI();
        document.getElementById('playPause').addEventListener('click', this.playPause);
        document.getElementById('reset').addEventListener('click', this.reset);
        document.getElementById('resize').addEventListener('click', this.resize);
        document.getElementById('shuffle').addEventListener('click', this.shuffle); // DONE
        document.getElementById('random').addEventListener('click', this.randomStart); // DONE
    }
    
    /*
     * Starts checker moving from current spot
     */
    play() {
        
    }
    
    /*
     * Stops checker from moving
     */
    playPause() {
        game.pauseClicked = !game.pauseClicked;
        if (game.pauseClicked) {
            document.getElementById('playPause').innerHTML = '<p>PLAY</p>'
        } else {
            // // game.play();
            // update();
            document.getElementById('playPause').innerHTML = '<p>PAUSE</p>'
        }
    }
    
    /*
     * Resets current turn
     */
    reset() {
        
    }
    
    /*
     * Resizes board
     */
    resize() {
        
    }
    
    /*
     * Shuffles arrows
     */
    shuffle() {
        game.removeBoard(() => {
            PIXI.animate.load(lib.test, stage, setTheTable, 'assets');
        });
        game.remove = true;
        game.squares = [];
        game.create2dArr(game.squares);
    }
    
    /*
     * Starts player at a random square on the board
     */
    randomStart() {
        game.visited.length = 0;
        let x = Math.floor(Math.random() * game.BOARD_SIZE);
        let y = Math.floor(Math.random() * game.BOARD_SIZE);
        game.dropChecker(x, y);
    }
    
    /*
     * Style for GUI motion
     */
    staggerGUI() {
        let guiElems = document.querySelectorAll('.gui-element');
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