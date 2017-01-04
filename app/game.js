const states = {
    OFF: 'off',
    LOOP: 'loop'
};

const STAGGER_TIME = 30;
const SQUARE_WIDTH = 380;
const BOARD_SCALE_PCT = 0.8;

let xOffset;
let yOffset;
let bg;

class Game {
    
    constructor() {
        // TODO: Set board size based on input
        this.BOARD_SIZE = /*document.getElementById('resize').value;*/ 6;

        this.directions = ['N', 'S', 'E', 'W'];
        this.spot = {};
        this.visited = [];
        this.squares = [];
        
        // initializes empty array
        this.create2dArr(this.squares);
        this.state = '';
    }
    
    /*
     *
     *
     *
     */
    create2dArr(arr) {
        for (let x = 0; x < this.BOARD_SIZE; ++x) {
            arr[x] = [];
            for (let y = 0; y < this.BOARD_SIZE; ++y) {
                arr[x][y] = [];
            }
        }
    }
    
    getRandomFromArr(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    
    addSquare(x, y) {
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
            
            // Set direction arrow on square
            square.direction = this.getRandomFromArr(this.directions);
            square.arrows.gotoAndStop(square.direction);
            
            if (( x + y ) % 2 === 0) {
                square.color02.visible = false;
            } else {
                square.color01.visible = false;
            }
            
            square.interactive = true;
            
            this.squares[x][y] = square;

            square.on('click', ()=>{
                // TODO: remove click listener from other squares
                this.dropChecker(x, y);
            });
            
            PIXI.animate.Animator.play(square, 'fadeIn');
        }, 'assets');
    }

    dropChecker(x, y) {
        PIXI.animate.load(lib.checker, board, (checker)=>{
            this.placeChecker(checker, x, y);
            
            PIXI.animate.Animator.play(checker, 'dropIn', ()=>{
                this.moveChecker(checker, x, y);
            });
        }, 'assets');
    }

    
    /*
     * Starts player at a random square on the board
     */
    randomSpot() {
        this.visited.length = 0;
        x = Math.floor(Math.random() * this.BOARD_SIZE);
        y = Math.floor(Math.random() * this.BOARD_SIZE);
    }
    
    /*
     * Sets x/y position on stage
     */
    placeChecker(instance, x, y) {
        instance.x = ( x - y ) * xOffset;
        instance.y = ( y + x ) * yOffset;
    }

    moveChecker(instance, x, y) {
        console.log("Spot:", {x, y});
        
        // Add prev position to array
        this.visited.push({x, y});

        let lastVisited = this.visited.length - 1;
        let currSquare = this.squares[this.visited[lastVisited].x][this.visited[lastVisited].y]
        if (currSquare.state.currentFrame < 1) {
            currSquare.state.gotoAndStop(1);
        }
        
        let moveAnimLabel = 'move' + this.squares[x][y].direction;
        PIXI.animate.Animator.play(instance, moveAnimLabel, ()=>{

            // Move based on direction
            switch(this.squares[x][y].direction){
              case 'N':
                y -= 1;
                break;
              case 'S':
                y += 1;
                break;
              case 'W':
                x -= 1;
                break;
              case 'E':
                x += 1;
                break;
            }
            this.checkPosition(instance, x, y);
        });
    }
    
    checkPosition(instance, x, y) {
        
        // If the new position is on the board, compare it to previous spots
        if (x >=0 && x < this.BOARD_SIZE && y >= 0 && y < this.BOARD_SIZE) {
            
            // If spot has already been visited, we know we're in a loop
            // if (this.visited.indexOf(`${x} ${y}`) >= 0) {
            this.visited.forEach((spot) => {
                if (spot.x === x && spot.y === y){
                    // Turn visited squares green
                    this.visited.forEach((spot) => {
                        this.squares[spot.x][spot.y].state.gotoAndStop(2);
                    });
                    
                    console.log('LOOP MOTHAFUCKAAAAA');
                    // Turn BG green
                    bg.gotoAndStop(states.LOOP);
                }
            })
            
            // Otherwise, we're not in a loop, keep walking
            this.placeChecker(instance, x, y);
            this.moveChecker(instance, x, y);
            
        // If it's not on the board, you fell off the edge!
        } else {
            console.log('YOU FELL OFF THE EDGEEEEE');
            
            // Turn BG red
            bg.gotoAndStop(states.OFF);
            
            // Turn squares red
            this.visited.forEach((spot) => {
                this.squares[spot.x][spot.y].state.gotoAndStop(3);
            });
            return;
        }
    }
}

module.exports = Game;

