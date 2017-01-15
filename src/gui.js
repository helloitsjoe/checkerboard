class GUI {
    constructor() {
        this.staggerGUI();
        this.bipListener();
        
        this.playPauseButton = document.getElementById('playPause');
        this.restartButton = document.getElementById('restart')
        this.shuffleButton = document.getElementById('shuffle')
        this.randomButton = document.getElementById('random')
        this.resizeButton = document.getElementById('resize')
        
        this.playPauseButton.addEventListener('click', game.playPause.bind(game));
        this.restartButton.addEventListener('click', game.restart.bind(game));
        this.shuffleButton.addEventListener('click', game.shuffle.bind(game));
        this.randomButton.addEventListener('click', game.randomStart.bind(game));
        this.resizeButton.addEventListener('click', game.resize.bind(game));
    }
    
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