class GUI {
    
    constructor() {
        this.staggerGUI();
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
        if (!game.visited.length || game.visited[game.visited.length - 1] === 'OFF') {
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
     * Resets current turn
     */
    restart() {
        if (game.pauseClicked) {
            this.playPause();
        }
        if (!game.visited.length) {
            return;
        }
        if (game.visited[game.visited.length - 1] === 'OFF') {
            game.dropChecker(game.clickedX, game.clickedY);
        } else {
            PIXI.animate.Animator.play(game.checker, 'dropOut', () => {
                game.dropChecker(game.clickedX, game.clickedY);
            });
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
    
    /*
     * Shuffles arrows
     */
    shuffle() {
        if (game.pauseClicked) {
            this.playPause();
        }
        if (!game.tableSetInProgress) {
            game.removeBoard();
            game.create2dArr(game.squares);
        }
    }
    
    /*
     * Starts player at a random square on the board
     */
    randomStart() {
        if (game.pauseClicked) {
            this.playPause();
        }
        if (game.checker) {
            PIXI.animate.Animator.play(game.checker, 'dropOut');
        }
        let x = Math.floor(Math.random() * game.BOARD_SIZE);
        let y = Math.floor(Math.random() * game.BOARD_SIZE);
        game.clickedX = x;
        game.clickedY = y;
        game.dropChecker(x, y);
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