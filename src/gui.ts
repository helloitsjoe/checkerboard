import Game from './game';
import { e } from './utils';

export default class Gui {

    constructor(game) {
        this.staggerGUI();
        this.bipListener(game);

        const guiDiv = document.getElementById('gui');

        const createButton = (id, text) => e('div', {
            id,
            parent: guiDiv,
            classList: 'gui-element',
            innerHTML: `<p>${text}</p>`
        });
        
        const pauseButton = createButton('playPause', 'PAUSE');
        const restartButton = createButton('restart', 'RESTART');
        const shuffleButton = createButton('shuffle', 'SHUFFLE ARROWS');
        const randomButton = createButton('random', 'RANDOM SQUARE');
        const resizeButton = createButton('resize', 'RESIZE BOARD');
        
        const resizeBox = e('div', { classList: 'resize-box', parent: guiDiv });
        const sizeText = e('span', { id: 'size-text', parent: resizeBox, innerHTML: 'BOARD SIZE' });
        const resizeInputBase = e('input', { id: 'resize-input', parent: resizeBox }) as HTMLInputElement;
        const resizeInput = Object.assign(resizeInputBase, {
            type: 'number',
            min: '1',
            max: '20'
        });

        pauseButton.addEventListener('click', game.playPause.bind(game));
        restartButton.addEventListener('click', game.restart.bind(game));
        shuffleButton.addEventListener('click', game.shuffle.bind(game));
        randomButton.addEventListener('click', game.randomStart.bind(game));
        resizeButton.addEventListener('click', game.resize.bind(game));
        resizeInput.addEventListener('keydown', game.resizeOnEnter.bind(game));
    }
        
    /*
     * Fire button audio on mouse mouseenter
     */
    private bipListener(game: Game): void {
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
    private staggerGUI(): void {
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