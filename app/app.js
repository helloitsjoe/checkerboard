const game = new Game();

const STAGGER_TIME = 30;
const SQUARE_WIDTH = 380;
const BOARD_SCALE_PCT = 0.8;

let xOffset;
let yOffset;
let bg;

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
    // TODO: Combine test.js, square.js, checker.js, reference library? How?
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

        square.on('click', ()=>{
            // TODO: remove click listener from other squares
            dropChecker(x, y);
        });
        
        PIXI.animate.Animator.play(square, 'fadeIn');
    }, 'assets');
}

function dropChecker(x, y) {
    PIXI.animate.load(lib.checker, board, (checker)=>{
    // let checker = lib.checkerAnim;
    // console.log(checker);
        placeChecker(checker, x, y);
        
        PIXI.animate.Animator.play(checker, 'dropIn', ()=>{
            moveChecker(checker, x, y);
        });
    }, 'assets');
}

function moveChecker(instance, x, y) {
    PIXI.animate.Animator.play(instance, 'move' + game.board[x][y], ()=>{
        if (!game.spot.x) {
            game.spot.x = x;
            game.spot.y = y;
        }
        game.walk(game.board, x, y);
        if (game.state.length) {
            bg.gotoAndStop(game.state);
            if (game.state === 'off') {
                return;
            }
        }
        console.log(game.spot);
        instance.gotoAndStop('pause');
        placeChecker(instance, game.spot.x, game.spot.y);
        moveChecker(instance, game.spot.x, game.spot.y);
    });
}

function placeChecker(instance, x, y) {
    instance.x = ( x - y ) * xOffset;
    instance.y = ( y + x ) * yOffset;
}

function update() {
    renderer.render(stage);
    requestAnimationFrame(update);
}
update();