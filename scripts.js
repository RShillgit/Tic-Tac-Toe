// Gameboard module
const gameboard = (() => {

    // Player 
    const player = (name, symbol, turn) => {
        return {name, symbol, turn};
    };

    const player1 = player('player1', 'X', true);
    const player2 = player('player2', 'O', false);

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
                if (winningPatterns[i].every(num => x.includes(num))) return console.log('player 1 wins!')
                if (winningPatterns[i].every(num => o.includes(num))) return console.log('player 2 wins!')
            };
        });
    };

    const aisTurn = (function() {
    
        function runTurn() {

            if (player2.turn == true) {
                // An array that holds all the empty boxes
                const unusedGameboard = gameboardArray.filter(box => (box.innerText == ""));

                // Random number to select a box to input the ai's symbol
                let randInt = Math.floor(Math.random() * unusedGameboard.length);

                // DIsplay symbol in the random box 
                let aiSelection = unusedGameboard[randInt].innerText = player2.symbol;
                
                // Check for winnner 
                checkForWinner();

                // Switch turns
                switchTurns()
            };
        }
        
        return {runTurn: runTurn}
    })();

    const playersTurn = (function() {
        // Board boxes
        const boxes = document.querySelectorAll('.box');
        // Push each box to gameboardArray individually
        boxes.forEach(box => gameboardArray.push(box));

        // Event listener for user click
        boxes.forEach(box => {box.addEventListener('click', (e) => {
            // If box is empty and its the users turn 
            if (e.target.innerText == '' && player1.turn == true) {
                box.innerText = player1.symbol;

                // Check for winnner 
                checkForWinner();

                // Switch Turns
                switchTurns()
                
                // Run ai's turn
                aisTurn.runTurn();
            };
        })});
        
    return {boxes};
    })(); 

})();


