require('pixi.js');
require('pixi-animate');
global.lib = {
    test: require('./assets/test.js').stage,
    checker: require('./assets/checker.js').stage,
    square: require('./assets/square.js').stage
};

const Game = require('./src/game');
const game = new Game();

const renderer = new PIXI.autoDetectRenderer(1280, 720, {
    view: document.getElementById("stage"),
    backgroundColor: 0x0,
    antialias: true
});

PIXI.animate.load(lib.test, game.stage, (test) => {
    game.board.setTheTable(test)
}, 'assets');
update();

function update() {
    renderer.render(game.stage);
    requestAnimationFrame(update);
}


