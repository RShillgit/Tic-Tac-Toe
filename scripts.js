// Gameboard module
const gameboard = (() => {

    // Player 
    const player = (name, symbol, turn) => {
        return {name, symbol, turn};
    };

    const player1 = player('player1', 'X', true);
    const player2 = player('player2', 'O', false);

    // board array
    let _gameboardArray = [];
    
    // Function 
    const playersTurn = (function() {

        // Board boxes
        const boxes = document.querySelectorAll('.box');

        boxes.forEach(box => {box.addEventListener('click', (e) => {
            // If box is empty and its the users turn 
            if (e.target.innerText == '' && player1.turn == true) {
                box.innerText = player1.symbol;
                _gameboardArray.push(box);
                console.log(_gameboardArray); 
                
                // Switch turns
                player1.turn = !player1.turn;
                console.log(player1.turn)
            }
        })});
    return {boxes};
    })(); 

    const aisTurn = (function() {
        /* 
        create a random number
        iterate through array of divs and use the random number so it chooses a random box instead of a super predictable box like a forEach would
        if the box at the index [random number] has inner text, return
        if the box does NOT have innner text, make it player2.symbol then change player2.turn to false
        */
       console.log(playersTurn.boxes)
        playersTurn.boxes.forEach(box => () => {
            if (box.innerText == "" && player2.turn == true) {
                box.innerText = player2.symbol;
                player2.turn = !player2.turn 
            }
        });
    })();
})();


