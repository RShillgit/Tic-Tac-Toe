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

    // Switch turns function
    function switchTurns() {
        player1.turn = !player1.turn;
        player2.turn = !player2.turn;
    };

    const aisTurn = (function() {
        /* 
        create a random number
        iterate through array of divs and use the random number so it chooses a random box instead of a super predictable box like a forEach would
        if the box at the index [random number] has inner text, return
        if the box does NOT have innner text, make it player2.symbol then change player2.turn to false
        */
        // Random number between 0 and 8 (indexes of the gameboardArray)
        function runTurn() {


            console.log(player2.turn)
            if (player2.turn == true) {
                // An array that holds all the empty boxes
                const unusedGameboard = gameboardArray.filter(box => (box.innerText == ""));

                // Random number to select a box to input the ai's symbol
                let randInt = Math.floor(Math.random() * unusedGameboard.length);

                // DIsplay symbol in the random box 
                let aiSelection = unusedGameboard[randInt].innerText = player2.symbol;
                
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
                
                // Switch Turns
                switchTurns()
                
                // Run ai's turn
                aisTurn.runTurn();
            };
        })});
        
    return {boxes};
    })(); 

})();


