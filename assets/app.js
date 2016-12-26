// const Test = require('./test');
// const Square = require('./square');
let game = new Game();

var renderer = new PIXI.autoDetectRenderer(1280, 720, {
    view: document.getElementById("stage"),
    backgroundColor: 0x0,
    antialias: true
});
var stage = new PIXI.Container();
PIXI.animate.load(lib.test, stage, loaded);
function update() {
    renderer.render(stage);
    requestAnimationFrame(update);
}
update();

function loaded(clip) {
    
    // addSquare();
    
    console.log(game.board);
    // let square1 = stage.addChild(clip);
    // let square2 = stage.addChild(clip);
    //
    // square1.x = 100;
    // square2.x = 200;
    // console.log(clip);
    
    // let square = new Square(0, 0);

    // let square = clip.square;
    // let state = square.state;
    // let frame = 0;
    
    // square.interactive = true;
    
    // state.gotoAndStop(frame);

    // square.on('click', () => {
    //     frame = frame < 3 ? frame + 1 : 0;
    //
    //     state.gotoAndStop(frame);
    // });
}

function addSquare(x, y) {
    PIXI.animate.load(lib.square, stage, (square) => {
        square.x = x;
        square.y = y;
    });
}