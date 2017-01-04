const game = new Game();

const renderer = new PIXI.autoDetectRenderer(1280, 720, {
    view: document.getElementById("stage"),
    backgroundColor: 0x0,
    antialias: true
});
const stage = new PIXI.Container();
let board = new PIXI.Container();
PIXI.animate.load(lib.test, stage, setTheTable, 'assets');


function setTheTable(test) {
    bg = test.bg;
    bg.gotoAndStop(0);
    stage.addChild(board);

    // This is gnarly. Is there a better way to stagger animation of squares appearing?
    for (let i = 0; i < game.boardArr.length; i++){
        (function (idx) {
            setTimeout(()=>{
                for (let j = 0; j < game.boardArr[i].length; j++) {
                    (function (idx) {
                        setTimeout(()=>{
                            game.addSquare(j, i);
                        }, STAGGER_TIME * idx);
                    }(j));
                }
            }, STAGGER_TIME * (idx + (game.boardArr.length * idx)));
        }(i));
    }

    board.x = stage.width / 2;
    board.y = stage.height / 2 - 50;
    board.scale.x = board.scale.y = (stage.width / (SQUARE_WIDTH * game.boardArr.length)) * BOARD_SCALE_PCT;

    console.log(game.boardArr);
}

function update() {
    renderer.render(stage);
    requestAnimationFrame(update);
}
update();