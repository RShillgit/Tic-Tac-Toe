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

    // Elements
    const displayWinner = document.querySelector('.winnerScreen');
    const gameDisplay = document.querySelector('.game');
    const gameboardBoxes = document.querySelectorAll('.box');
 
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

    // Displays Winner Screen
    function showWinner() {

        // Hide game 
        gameDisplay.style.display = "none";

        // Winner message
        const winnerMsg = document.querySelector('.winner');
        if (player1.winner == true) winnerMsg.innerHTML = "You Win!";
        else if (player2.winner == true) winnerMsg.innerHTML = "You Lose!";
        else if (player1.winner == false && player2.winner == false) winnerMsg.innerHTML = "Draw!";
        
        // Display Winner
        displayWinner.style.display = "Flex";
    };

    function checkForWinner() {
        // Arrays that will hold the data-box numbers of the boxes with X's and O's in them
        let x = [];
        let o = [];
        
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
                else if (winningPatterns[i].every(num => o.includes(num))) {
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

                // Display symbol in the random box 
                unusedGameboard[randInt].style.color = "#FF005C";
                unusedGameboard[randInt].innerText = player2.symbol;
                
                // Check for winnner 
                checkForWinner();

                // Switch turns
                switchTurns()
            };
        };
         
        return {runTurn: runTurn}
    })();

    const playersTurn = (function() {
    
        // Push each box to gameboardArray individually
        gameboardBoxes.forEach(box => gameboardArray.push(box));

        // Event listener for user click
        gameboardBoxes.forEach(box => {box.addEventListener('click', (e) => {

            // If its the users turn and the box clicked is empty
            if (e.target.innerText == '' && player1.turn == true) {

                // Fill it with an X
                e.target.style.color = "#006FFF";
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

    // Replay Button that hides winner screen and displays game again
    const replayBtn = document.querySelector('.replay');
    replayBtn.addEventListener('click', () => {

        // Reset players winner to false
        player1.winner = false;
        player2.winner = false;

        // Make it the users turn
        player1.turn = true
        player2.turn = false

        // Clear Game board 
        gameboardBoxes.forEach(box => {box.innerText = "";}); 

        // Display game board and hide winner screen
        displayWinner.style.display = "none";
        gameDisplay.style.display = "flex";

        return playersTurn;
    });

})();

