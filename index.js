
function submit() {
    // Set board size based on input
    let BOARD_SIZE = document.getElementById('resize').value;

    let directions = ['N', 'S', 'E', 'W'];
    let board = [];
    let spot = {};
    let visited = [];

    function getRandomFromArr(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    
    /*
     *
     *
     *
     */
    function createBoard(size) {
        for (let x = 0; x < BOARD_SIZE; ++x) {
            board[x] = [];
            for (let y = 0; y < BOARD_SIZE; ++y) {
                
                // Fill board with random directions
                board[x][y] = getRandomFromArr(directions);
                
                // Checker pattern
                // if ((x + y) % 2 === 0) {
                //     board[x][y] = 'X'
                // } else {
                //     board[x][y] = '•'
                // }
            }
            // Debug - array string outputs with line breaks
            board[x].push('\n');
        }
    }
    
    /*
     *
     * Starts player at a random square on the board
     *
     */
    function randomSpot() {
        visited.length = 0;
        spot.x = Math.floor(Math.random() * BOARD_SIZE);
        spot.y = Math.floor(Math.random() * BOARD_SIZE);
        // console.log(spot.y, spot.x);
    }
    
    /*
     *
     * Moves one square
     *
     */
    function walk(arr) {
        
        // Add prev position to array
        visited.push(`${spot.y} ${spot.x}`);
        
        // Move based on direction
        switch(arr[spot.x][spot.y]){
          case 'N':
            spot.x -= 1;
            break;
          case 'S':
            spot.x += 1;
            break;
          case 'W':
            spot.y -= 1;
            break;
          case 'E':
            spot.y += 1;
            break;
        }
        
        // If the new position is on the board, compare it to previous spots
        if (spot.x >=0 && spot.x < BOARD_SIZE && spot.y >= 0 && spot.y < BOARD_SIZE) {
            visited.forEach((visit) => {
                console.log(visit);
            });
            console.log('Location After:', spot.y, spot.x);
            console.log('Direction After:', arr[spot.x][spot.y]);
            // If spot has already been visited, we know we're in a loop
            if (visited.indexOf(`${spot.y} ${spot.x}`) >= 0) {
                // TODO: Set this up to turn visited squares green
                // TODO: Other loop animation?
                console.log('LOOP MOTHAFUCKAAAAA');
                done();
            // Otherwise, we're not in a loop, keep walking
            } else {
                // Turn this on/off to make this recursive and
                // keep walking until it either loops or falls off
                console.log('next!');
                walk(arr);
            }
        // If it's not on the board, you fell off the edge!
        } else {
            // TODO: Set this up to turn visited squares red
            // TODO: Other fall-off-edge animation?
            console.log('YOU FELL OFF THE EDGEEEEE');
            done();
        }
    }
    
    // Break out of recursive loop
    function done() {
        console.log('stopping...');
    }
    
    createBoard();
    console.log(board.toString());
    
    // HTML button functionality
    let randomize = document.getElementById('randomize');
    let walkButton = document.getElementById('walk');

    randomize.addEventListener('click', randomSpot);
    walkButton.addEventListener('click', () => {walk(board)});
}

