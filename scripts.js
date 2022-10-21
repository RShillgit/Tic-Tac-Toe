// Home Screen module
const homescreen = (() => {

    // Hide gameboard and winner
    const gameboardDisplay = document.querySelector('.game');
    gameboardDisplay.style.display = "none";
    const winnerDisplay = document.querySelector('.winnerScreen');
    winnerDisplay.style.display = "none";

    // Home screen
    const home_screen = document.querySelector('.home-screen');

    // Play button removes home screen and displays gameboard
    const playBtn = document.querySelector('.play');
    playBtn.addEventListener('click', () => {
        home_screen.style.display = "none";
        gameboardDisplay.style.display = "flex";
    });
    
})();


// Gameboard module
const gameboard = (() => {

    // Player 
    const player = (name, symbol, turn, winner) => {
        return {name, symbol, turn, winner};
    };

    const player1 = player('player1', 'X', true, false);
    const player2 = player('player2', 'O', false, false);
 
    // board array
    let gameboardArray = [];

    // Winning 3 in a row patterns
    const winningPatterns = [
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],
        ['0', '4', '8'],
        ['2', '4', '6']
    ];

    // Switch turns function
    function switchTurns() {
        player1.turn = !player1.turn;
        player2.turn = !player2.turn;
    };

    // Displays Winner Message
    function showWinner() {
        // Hide game 
        const gameDisplay = document.querySelector('.game');
        gameDisplay.style.display = "none";

        // Get winner message
        const winnerMsg = document.querySelector('.winner');
        if (player1.winner == true) winnerMsg.innerHTML = "You Win!";
        if (player2.winner == true) winnerMsg.innerHTML = "You Lose!";
        if (player1.winner == false && player2.winner == false) winnerMsg.innerHTML = "Draw!";
        
        // Display Winner
        const displayWinner = document.querySelector('.winnerScreen');
        displayWinner.style.display = "Flex";
    }

    function checkForWinner() {
        // Arrays that will hold the data-box numbers of the boxes with X's and O's in them
        let x = [];
        let o = [];

        const gameboardBoxes = document.querySelectorAll('.box');
        gameboardBoxes.forEach(box => {
            // If box has an X in it, get its data attribute and send it to x array
            if (box.innerText == "X") {
                const xboxes = box.getAttribute('data-box');
                x.push(xboxes);
            }
            // Else if box has an O in it, get its data attribute and send it to o array
            else if (box.innerText == "O") {
                const oBoxes = box.getAttribute('data-box');
                o.push(oBoxes);
            }
            // If a winning pattern is in the x or o array return winner
            for (let i = 0; i < winningPatterns.length; i++){
                if (winningPatterns[i].every(num => x.includes(num))) {
                    player1.winner = true;
                    return showWinner();
                }
                if (winningPatterns[i].every(num => o.includes(num))) {
                    player2.winner = true;
                    return showWinner();
                }
            };
        });
    };

    const aisTurn = (function() {

        function runTurn() {
            if (player2.turn == true) {
                // An array that holds all the empty boxes
                const unusedGameboard = gameboardArray.filter(box => (box.innerText == ""));
                if (unusedGameboard.length < 1) return showWinner();

                // Random number to select a box to input the ai's symbol
                let randInt = Math.floor(Math.random() * unusedGameboard.length);

                // DIsplay symbol in the random box 
                let aiSelection = unusedGameboard[randInt].innerText = player2.symbol;
                
                // Check for winnner 
                checkForWinner();

                // Switch turns
                switchTurns()
            };
        };
         
        return {runTurn: runTurn}
    })();

    const playersTurn = (function() {
    
        // Board boxes
        const boxes = document.querySelectorAll('.box');
        // Push each box to gameboardArray individually
        boxes.forEach(box => gameboardArray.push(box));

        // Event listener for user click
        boxes.forEach(box => {box.addEventListener('click', (e) => {
            // If there is a winner simply return
            if(player1.winner == true) return console.log(`Player 1 Wins`);
            else if (player2.winner == true) return console.log("Player 2 Wins")
            // If box is empty and its the users turn 
            else if (e.target.innerText == '' && player1.turn == true) {
                box.innerText = player1.symbol;

                // Check for winnner 
                checkForWinner();

                // Switch Turns
                switchTurns()
                
                // Run ai's turn
                aisTurn.runTurn();
            };
        })});

    })(); 

})();

