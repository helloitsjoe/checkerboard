const game = new Game();

const STAGGER_TIME = 30;
const SQUARE_WIDTH = 380;
const BOARD_SCALE_PCT = 0.8;

let xOffset;
let yOffset;

const renderer = new PIXI.autoDetectRenderer(1280, 720, {
    view: document.getElementById("stage"),
    backgroundColor: 0x0,
    antialias: true
});
const stage = new PIXI.Container();
let board = new PIXI.Container();
PIXI.animate.load(lib.test, stage, setTheTable, 'assets');


function setTheTable() {
    stage.addChild(board);
    
    // This is gnarly. Is there a better way to stagger animation of squares appearing?
    for (let i = 0; i < game.board.length; i++){
        (function (idx) {
            setTimeout(()=>{
                for (let j = 0; j < game.board[i].length; j++) {
                    (function (idx) {
                        setTimeout(()=>{
                            addSquare(j, i);
                        }, STAGGER_TIME * idx);
                    }(j));
                }
            }, STAGGER_TIME * (idx + (game.board.length * idx)));
        }(i));
    }
        
    board.x = stage.width / 2;
    board.y = stage.height / 2 - 50;
    board.scale.x = board.scale.y = (stage.width / (SQUARE_WIDTH * game.board.length)) * BOARD_SCALE_PCT;
    
    console.log(game.board);
}

function addSquare(x, y) {
    PIXI.animate.load(lib.square, board, (square) => {

        xOffset = square.width / 2;
        yOffset = square.height / 2;
        square.x = ( x - y ) * xOffset;
        square.y = ( y + x ) * yOffset;
        square.hitArea = new PIXI.Polygon([-xOffset, 0, 0, yOffset, xOffset, 0, 0, -yOffset]);
        
        let state = square.state;
        let frame = 0;
        state.gotoAndStop(frame);
        
        square.directions.gotoAndStop(game.board[x][y]);
        
        if (( x + y ) % 2 === 0) {
            square.color02.visible = false;
        } else {
            square.color01.visible = false;
        }
        
        square.interactive = true;

        square.on('click', () => {
            // frame = frame < 3 ? frame + 1 : 0;
            //
            // state.gotoAndStop(frame);
            if (!board.children[board.children.length - 1].checker) {
                dropChecker(x, y);
                // TODO: is this removing from memory as well? Is there a better way to do this?
                // PIXI.animate.Animator.play(board.children[board.children.length - 1], 'dropOut', ()=>{
                //     board.removeChildAt(board.children.length - 1);
                //     dropChecker(x, y);
                // });
            } else {
                let checker = board.children[board.children.length - 1];
                PIXI.animate.Animator.play(checker, 'move' + game.board[x][y], ()=>{
                    checker.x = x;
                    checker.y = y;
                });
            }
        });
        
        PIXI.animate.Animator.play(square, 'fadeIn');
    }, 'assets');
}

function dropChecker(x, y) {
    PIXI.animate.load(lib.checker, board, (checker)=>{
        checker.x = ( x - y ) * xOffset;
        checker.y = ( y + x ) * yOffset;
        
        PIXI.animate.Animator.play(checker, 'dropIn');
    }, 'assets');
}

function update() {
    renderer.render(stage);
    requestAnimationFrame(update);
}
update();