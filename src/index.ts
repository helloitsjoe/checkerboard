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

// import animate from 'pixi-animate';
// require('../assets/checker.js');
// require('../assets/square.js');

// import Game from './Game';
// import Board from './Board';
// import Gui from './Gui';
// import Checker from './Checker';
// var config = require('./gameConfig.json');

// const renderer = new PIXI.autoDetectRenderer(1280, 720, {
//     view: document.getElementById("stage"),
//     backgroundColor: 0x0,
//     antialias: true
// });
// const stage = new PIXI.Container();

// const game = new Game();
// const board = new Board(game);
// const gui = new Gui(game);
// const checker = new Checker(game);

// PIXI.animate.load(testLib, stage, (test) => {
//     board.setTheTable(test)
// }, 'assets');
// update();

// function update() {
//     renderer.render(stage);
//     requestAnimationFrame(update);
// }

// function playAudio(sound, ms) {
//     setTimeout(()=>{
//         new Audio(`./audio/${sound}.wav`).play();
//     }, ms)
// }

// require('pixi.js');
// require('pixi-animate');
// const test = require('.../assets/test');
