let game = new Game();

let sqWidth = 380;

const renderer = new PIXI.autoDetectRenderer(1280, 720, {
    view: document.getElementById("stage"),
    backgroundColor: 0x0,
    antialias: true
});
const stage = new PIXI.Container();
let board = new PIXI.Container();
PIXI.animate.load(lib.test, stage, loaded);


function loaded(clip) {
    stage.addChild(board);
    
    for (let i = 0; i < game.board.length; i++){
        for (let j = 0; j < game.board[i].length; j++) {
            addSquare(j, i);
        }
    }
        
    board.x = stage.width / 2;
    board.y = stage.height / 2 - 50;
    board.setTransform.scaleX = 0.5;
    
    console.log(game.board);
}

function addSquare(x, y) {
    PIXI.animate.load(lib.square, board, (mc) => {

        let xOffset = mc.width / 2;
        let yOffset = mc.height / 2;
        mc.x = ( x - y ) * xOffset;
        mc.y = ( y + x ) * yOffset;
        
        let state = mc.square.state;
        let frame = 0;
        
        mc.interactive = true;
        
        state.gotoAndStop(frame);

        mc.on('click', () => {
            frame = frame < 3 ? frame + 1 : 0;
        
            state.gotoAndStop(frame);
        });
    });
}

function update() {
    renderer.render(stage);
    requestAnimationFrame(update);
}
update();