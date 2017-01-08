const game = new Game();
const gui = new GUI();

const renderer = new PIXI.autoDetectRenderer(1280, 720, {
    view: document.getElementById("stage"),
    backgroundColor: 0x0,
    antialias: true
});
const stage = new PIXI.Container();
let board = new PIXI.Container();
PIXI.animate.load(lib.test, stage, setTheTable, 'assets');

update();

/*
 * Build the board
 */
function setTheTable(test) {
    bg = test.bg;
    bg.gotoAndStop(0);
    stage.addChild(board);
    
    board.x = stage.width / 2;
    board.y = stage.height / 2 - 100;
    test.boardBase.y = stage.height / 2 + 54;
    board.scale.x = board.scale.y = (stage.width / (SQUARE_WIDTH * game.squares.length)) * BOARD_SCALE_PCT;
    
    staggerSquares();
}

/*
 * Stagger animation of squares appearing
 */
function staggerSquares(){
    // This is gnarly. Is there a better way to stagger animation of squares appearing?
    // Also, I tried moving this to the Game class, but I couldn't get it working
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

function update() {
    // if (game.pauseClicked) {
    //     return;
    // }
    renderer.render(stage);
    requestAnimationFrame(update);
}
