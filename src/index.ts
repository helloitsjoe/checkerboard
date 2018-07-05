import * as PIXI from 'pixi.js';
require('pixi-animate');

import { e } from './utils';
import Game from './game';

const body = document.body;

const app = new PIXI.Application(1280, 720, { backgroundColor : 0x0 });
const mainDiv = e('div');
body.insertBefore(mainDiv, body.firstChild);

const containerDiv = e('div', { id: 'container', parent: mainDiv });
const borderDiv = e('div', { id: 'border', parent: mainDiv });
const textElem = e('h1', { id: 'text', classList: 'text', parent: mainDiv });
const guiDiv = e('div', { id: 'gui', parent: mainDiv });

const game = new Game();

containerDiv.appendChild(app.view);
app.stage.addChild(game.stage);

const testLib = require('../assets/test.js');

PIXI.animate.load(testLib.stage, game.stage, (instance) => {
    game.board.setTheTable(instance);
}, 'assets');