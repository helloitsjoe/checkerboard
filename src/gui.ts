export default class Gui {

    constructor(game) {
        this.staggerGUI();
        this.bipListener(game);
        
        document.getElementById('playPause').addEventListener('click', game.playPause.bind(game));
        document.getElementById('restart').addEventListener('click', game.restart.bind(game));
        document.getElementById('shuffle').addEventListener('click', game.shuffle.bind(game));
        document.getElementById('random').addEventListener('click', game.randomStart.bind(game));
        document.getElementById('resize').addEventListener('click', game.resize.bind(game));
    }
        
    /*
     * Fire button audio on mouse mouseenter
     */
    bipListener(game) {
        let guiElems = document.getElementsByClassName('gui-element');
        for (let i = 0, len = guiElems.length; i < len; i++) {
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
            for (let i = 0, len = guiElems.length; i < len; i++) {
                let elem = guiElems[i] as HTMLElement;
                let delay = len - i - 1;
                elem.style.transitionDelay = ( delay * 50 ) + 'ms';
            }
        });
    }
}