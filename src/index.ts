// import PIXI from 'pixi.js';
// import animate from 'pixi-animate';
// require('../assets/test.js');
// require('../assets/checker.js');
// require('../assets/square.js');

import Game from './game';
import Gui from './gui';
import Board from './board';
import Checker from './checker';
var config = require('./gameConfig.json');

const renderer = new PIXI.autoDetectRenderer(1280, 720, {
    view: document.getElementById("stage"),
    backgroundColor: 0x0,
    antialias: true
});
const stage = new PIXI.Container();

const game = new Game();
const gui = new Gui();
const board = new Board();
const checker = new Checker();

PIXI.animate.load(lib.test, stage, (test) => {
    board.setTheTable(test)
}, 'assets');
update();

function update() {
    renderer.render(stage);
    requestAnimationFrame(update);
}

function playAudio(sound, ms) {
    setTimeout(()=>{
        new Audio(`./audio/${sound}.wav`).play();
    }, ms)
}

