require('pixi.js');
require('pixi-animate');
const test = require('./assets/test');

const Game = require('./src/game');
const game = new Game();

const app = new PIXI.Application(1280, 720, {backgroundColor : 0x0});
const container = document.getElementById('container');
container.appendChild(app.view);
app.stage.addChild(game.stage);

PIXI.animate.load(test.stage, game.stage, (instance) => {
    game.board.setTheTable(instance);
}, 'assets');
