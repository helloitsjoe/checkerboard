const states = {
    OFF: 'off',
    LOOP: 'loop'
};

class Game {
    
    // Set board size based on input
    constructor() {
        this.BOARD_SIZE = /*document.getElementById('resize').value;*/ 6;

        this.directions = ['N', 'S', 'E', 'W'];
        this.board = [];
        this.spot = {};
        this.visited = [];
    
        this.createBoard(this.BOARD_SIZE);
        this.state = '';
    }

    getRandomFromArr(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    
    
    /*
     *
     * 
     *
     */
    createBoard(size) {
        for (let x = 0; x < this.BOARD_SIZE; ++x) {
            this.board[x] = [];
            for (let y = 0; y < this.BOARD_SIZE; ++y) {
                // Fill board with random directions
                this.board[x][y] = this.getRandomFromArr(this.directions);
            }
        }
    }
    
    /*
     *
     * Starts player at a random square on the board
     *
     */
    randomSpot() {
        this.visited.length = 0;
        this.spot.x = Math.floor(Math.random() * this.BOARD_SIZE);
        this.spot.y = Math.floor(Math.random() * this.BOARD_SIZE);
        // console.log(this.spot.x, this.spot.y);
    }
    
    /*
     *
     * Moves one square
     *
     */
    walk(arr, x, y) {
        // TODO: Do I need to have a this.spot or can I just use x, y?
        console.log("Spot:", this.spot);
        // Add prev position to array
        this.visited.push(`${this.spot.x} ${this.spot.y}`);
        
        // Move based on direction
        switch(arr[x][y]){
          case 'N':
            this.spot.y -= 1;
            break;
          case 'S':
            this.spot.y += 1;
            break;
          case 'W':
            this.spot.x -= 1;
            break;
          case 'E':
            this.spot.x += 1;
            break;
        }
        
        // If the new position is on the board, compare it to previous spots
        if (this.spot.x >=0 && this.spot.x < this.BOARD_SIZE && this.spot.y >= 0 && this.spot.y < this.BOARD_SIZE) {

            // If spot has already been visited, we know we're in a loop
            if (this.visited.indexOf(`${this.spot.x} ${this.spot.y}`) >= 0) {
                // TODO: Set this up to turn visited squares green
                // TODO: Other loop animation?
                console.log('LOOP MOTHAFUCKAAAAA');
                this.state = states.LOOP;
                this.done();
            // Otherwise, we're not in a loop, keep walking
            } else {
                // Turn this on/off to make this recursive and
                // keep walking until it either loops or falls off
                console.log('next!');
                // this.walk(arr, this.spot.y, this.spot.x);
                return;
            }
        // If it's not on the board, you fell off the edge!
        } else {
            // TODO: Set this up to turn visited squares red
            // TODO: Other fall-off-edge animation?
            console.log('YOU FELL OFF THE EDGEEEEE');
            this.state = states.OFF;
            this.done();
        }
    }
    
    // Break out of recursive loop
    done() {
        console.log('stopping...');
    }
}

module.exports = Game;

