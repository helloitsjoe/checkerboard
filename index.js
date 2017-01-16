// require('pixi.js');
// require('pixi-animate');
// require('../assets/test.js');
// require('../assets/checker.js');
// require('../assets/square.js');

const Game = require('./src/game');
const Gui = require('./src/gui');
const Board = require('./src/board');
const Checker = require('./src/checker');
const config = require('./src/gameConfig.json');

const renderer = new PIXI.autoDetectRenderer(1280, 720, {
    view: document.getElementById("stage"),
    backgroundColor: 0x0,
    antialias: true
});
const stage = new PIXI.Container();

const game = new Game();
const gui = new Gui(game);
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

