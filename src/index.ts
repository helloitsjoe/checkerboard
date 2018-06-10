import * as PIXI from 'pixi.js';

const testLib = require('../assets/test.js');
// import animate from 'pixi-animate';
// require('../assets/checker.js');
// require('../assets/square.js');

import Game from './Game';
import Board from './Board';
// import Gui from './Gui';
// import Checker from './Checker';
// var config = require('./gameConfig.json');

const renderer = new PIXI.autoDetectRenderer(1280, 720, {
    view: document.getElementById("stage"),
    backgroundColor: 0x0,
    antialias: true
});
const stage = new PIXI.Container();

const game = new Game();
const board = new Board(game);
// const gui = new Gui(game);
// const checker = new Checker(game);

PIXI.animate.load(testLib, stage, (test) => {
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

