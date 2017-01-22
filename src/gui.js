class GUI {
    constructor(game) {
        this._game = game;
        
        this.staggerGUI();
        this.bipListener();
        
        this._playPauseButton = document.getElementById('playPause');
        this._restartButton = document.getElementById('restart')
        this._shuffleButton = document.getElementById('shuffle')
        this._randomButton = document.getElementById('random')
        this._resizeButton = document.getElementById('resize')
        
        this._playPauseButton.addEventListener('click', game.playPause.bind(game));
        this._restartButton.addEventListener('click', game.restart.bind(game));
        this._shuffleButton.addEventListener('click', game.shuffle.bind(game));
        this._randomButton.addEventListener('click', game.randomStart.bind(game));
        this._resizeButton.addEventListener('click', game.resize.bind(game));
    }
        
    /*
     * Fire button audio on mouse mouseenter
     */
    bipListener() {
        let guiElems = document.getElementsByClassName('gui-element');
        let len = guiElems.length;
        for (let i = 0; i < len; i++) {
            guiElems[i].addEventListener('mouseenter', ()=>{
                this._game.playAudio('bip', 0)
            })
        }
    }

    /*
     * Style for GUI motion
     */
    staggerGUI() {
        let guiElems = document.querySelectorAll('.gui-element .box-resize');
        let gui = document.getElementById('gui');
        let len = guiElems.length;

        // Stagger GUI motion
        gui.addEventListener('mouseover', () => {
            for ( let i = 0; i < len; i++ ) {
                let elem = guiElems[i];
                let delay = guiElems.length - i - 1;
                elem.style.transitionDelay = ( delay * 50 ) + 'ms';
            }
        });
    }
}

module.exports = GUI;