class GUI {
    constructor() {
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
        for (let i = 0; i < guiElems.length; i++) {
            guiElems[i].addEventListener('mouseenter', ()=>{
                playAudio('bip', 0)
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