const game = new Game();
const gui = new GUI();

let board;
let boardBase;

const renderer = new PIXI.autoDetectRenderer(1280, 720, {
    view: document.getElementById("stage"),
    backgroundColor: 0x0,
    antialias: true
});
const stage = new PIXI.Container();
PIXI.animate.load(lib.test, stage, setTheTable, 'assets');
update();

function update() {
    renderer.render(stage);
    requestAnimationFrame(update);
}

/*
 * Build the board
 */
function setTheTable(test) {
    if (test) {
        bg = test.bg;
        boardBase = test.boardBase;
    }
    bg.gotoAndStop(0);
    board = new PIXI.Container();
    stage.addChild(board);
    
    board.x = stage.width / 2;
    board.y = stage.height / 2 - 60;
    boardBase.y = 440 + (5 * game.BOARD_SIZE);
    board.scale.x = board.scale.y = (stage.width / (SQUARE_WIDTH * game.BOARD_SIZE)) * BOARD_SCALE_PCT;
    
    // Stagger animation of squares appearing
    // This is pretty ugly. Is there a better way to stagger animation of squares appearing?
    for (let i = 0; i < game.squares.length; i++){
        (function (idx) {
            setTimeout(()=>{
                for (let j = 0; j < game.squares[i].length; j++) {
                    (function (idx) {
                        setTimeout(()=>{
                            game.addSquare(j, i);
                        }, STAGGER_TIME * idx);
                    }(j));
                }
            }, STAGGER_TIME * (idx + (game.squares.length * idx)));
        }(i));
    }
}
