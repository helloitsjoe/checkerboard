import * as PIXI from 'pixi.js';
require('pixi-animate');

const testLib = require('../assets/test.js');

import Game from './game';
const game = new Game();

const app = new PIXI.Application(1280, 720, {backgroundColor : 0x0});
const container = document.getElementById('container');
container.appendChild(app.view);
app.stage.addChild(game.stage);

PIXI.animate.load(testLib.stage, game.stage, (instance) => {
    game.board.setTheTable(instance);
}, 'assets');