const Game = require('./src/game');
const game = new Game();

const renderer = new PIXI.autoDetectRenderer(1280, 720, {
    view: document.getElementById("stage"),
    backgroundColor: 0x0,
    antialias: true
});
const stage = new PIXI.Container();

PIXI.animate.load(lib.test, stage, (test) => {
    game.board.setTheTable(test)
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

