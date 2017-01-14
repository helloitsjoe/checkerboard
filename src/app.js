let Game = require('./src/game');
let Gui = require('./src/gui');

const renderer = new PIXI.autoDetectRenderer(1280, 720, {
    view: document.getElementById("stage"),
    backgroundColor: 0x0,
    antialias: true
});
const stage = new PIXI.Container();
const game = new Game();
const gui = new Gui();

PIXI.animate.load(lib.test, stage, (test) => {
    game.setTheTable(test)
}, 'assets');
update();

function update() {
    renderer.render(stage);
    requestAnimationFrame(update);
}

