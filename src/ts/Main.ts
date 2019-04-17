///////////////////////////////////////////////////////
////////////////////// IMPORTS ////////////////////////
///////////////////////////////////////////////////////
import "@Sass/styles";
import { ENGINE_METHOD_PKEY_ASN1_METHS } from "constants";


//
// TIC-TAC-TOE
//
// Game Recipe:
//
// Step 1. Initialize gameState and game visuals.
// Step 2. When the player makes a move (i.e. `playerMoved` method):
//          a. Update the game state.
//          b. Update the game visuals to reflect the new game state.
//          c. Test if the game is over, and end the game if so.


///////////////////////////////////////////////////////
//////////////// GLOBALS DECLARATIONS /////////////////
///////////////////////////////////////////////////////
const x: string = "x";
const o: string = "o";
const _: string = " ";

// Declare GameState data structure
interface GameState {
    counterx: number;
    xarry: number[];
    oarry: number[];
}

interface OtherInterface {
    foo: string;
    bar: Number;
}

interface HigherLevelGameState {
    currentGameState: GameState;
    pastGameStates: GameState[];
}

let higherLevelGameState: HigherLevelGameState = {
    currentGameState: {
        counterx: 1,
        xarry: [1],
        oarry: []
    },
    pastGameStates: [
        {
            counterx: 0,
            xarry: [],
            oarry: []
        }
    ]
};


let javascriptPOJO = {
    counterx: 0,
    xarry: [],
    oarry: [],

    foo: "randomString",
    bar: 0

};

const myGameState: GameState = javascriptPOJO;
console.log(myGameState.counterx);

const otherInterface: OtherInterface = javascriptPOJO;
console.log(otherInterface.foo);

type GameStateAndOtherInterface = GameState & OtherInterface;
const bothGameStateAnOtherInterface: GameStateAndOtherInterface = javascriptPOJO;
console.log(bothGameStateAnOtherInterface.foo);

const eitherGameStateOrOtherInterface: GameState | OtherInterface = javascriptPOJO;
if (isGameStateObject(eitherGameStateOrOtherInterface)) {
    console.log(eitherGameStateOrOtherInterface.counterx);
} else {
    console.log(eitherGameStateOrOtherInterface.bar);
}


// User defined type-guard
function isGameStateObject(obj: GameState | OtherInterface): obj is GameState {
    return true;
}

// Global variable representing the current GameState.
let gameState: GameState;


// Store all the TicTacToe cells (which are HTML Divs) in a global array.
let ticTacToeCells: HTMLDivElement[];

// This is a reference to the `div` that says "X goes first"
let label: HTMLDivElement = document.getElementById("label")! as HTMLDivElement;


///////////////////////////////////////////////////////
//////////////// GAME LOGIC ///////////////////////////
///////////////////////////////////////////////////////


// [Step 1]
function initializeGame() {
    gameState = getInitialGameState();
    initializeGameVisuals();
}

function getInitialGameState(): GameState {
    return {
        xarry: [],
        oarry: [],
        counterx: 0
    };
}

function initializeGameVisuals() {
    ticTacToeCells = []; // Declare this as an empty array to start, then add to it.
    ticTacToeCells.push(document.getElementById("row1_column1")! as HTMLDivElement);
    ticTacToeCells.push(document.getElementById("row1_column2")! as HTMLDivElement);
    ticTacToeCells.push(document.getElementById("row1_column3")! as HTMLDivElement);
    ticTacToeCells.push(document.getElementById("row2_column1")! as HTMLDivElement);
    ticTacToeCells.push(document.getElementById("row2_column2")! as HTMLDivElement);
    ticTacToeCells.push(document.getElementById("row2_column3")! as HTMLDivElement);
    ticTacToeCells.push(document.getElementById("row3_column1")! as HTMLDivElement);
    ticTacToeCells.push(document.getElementById("row3_column2")! as HTMLDivElement);
    ticTacToeCells.push(document.getElementById("row3_column3")! as HTMLDivElement);

    // For each cell, let's make sure the cell is empty, and when the player clicks it,
    // it will call the `playerMoved` function with that cell number.
    for (let i = 0; i < ticTacToeCells.length; ++i) {
        ticTacToeCells[i].innerText = _;
        ticTacToeCells[i].onclick = ((mouseEvent: MouseEvent) => playerMoved(i));
    }
}


// [Step 2]
// This gets called when the player clicks on a cell.
function playerMoved(cellNumber: number) {
   

    //gameState.counterx = gameState.counterx-1;
    
    
   // updateGameStateWithPlayerMove(cellNumber);
   // updateGameVisuals();

    // ticTacToeCells[cellNumber].innerText = (counterx % 2 == 0) ? x : o ;
    //counterx ++;

if (ticTacToeCells[cellNumber].innerText == "")
{
    if (gameState.counterx % 2 == 0){
        
        
    
        ticTacToeCells[cellNumber].innerText = x;

        // How do we change this line to use the GameState object?
        gameState.xarry.push(cellNumber);
        console.log("the xraay is  " +gameState.xarry);

       
        gameState.counterx++;
        
    }
       
        else {
        ticTacToeCells[cellNumber].innerText = o;
        gameState.oarry.push(cellNumber);
        gameState.counterx++;
    }
    
}
else {
    alert("you can't ");
}
    // [Step 2c]
    if (isGameOver()) {
        endGame();
    }

    else {
        console.log("no one win try again");
    }
}

// [Step 2a]
function updateGameStateWithPlayerMove(cellNumber: number) {
    // TODO: update the `gameState` variable accordingly here.
    //       based on tic-tac-toe logic.
}

// [Step 2b]
function updateGameVisuals() {
    // TODO: Change the visuals of the game board via the `ticTacToeCells` array
    //       to look like the current `gameState`. 
    //       Hint: use `innerText` on a div.
}

function xofuntion(playerarray: number[]): boolean {
    if (

        (playerarray.includes(0) && playerarray.includes(1) && playerarray.includes(2))
        ||
        (playerarray.includes(0) && playerarray.includes(3) && playerarray.includes(6)
            ||
            (playerarray.includes(1) && playerarray.includes(4) && playerarray.includes(7))
            ||
            (playerarray.includes(2) && playerarray.includes(5) && playerarray.includes(8))
            ||
            (playerarray.includes(3) && playerarray.includes(4) && playerarray.includes(5))
            ||
            (playerarray.includes(6) && playerarray.includes(7) && playerarray.includes(8))
            ||
            (playerarray.includes(0) && playerarray.includes(4) && playerarray.includes(8))
            ||
            (playerarray.includes(2) && playerarray.includes(4) && playerarray.includes(6)))

    ) {
        return true;
    }
    else {
        return false;
    }
}


function isGameOver(): boolean {
    if (xofuntion(gameState.xarry) || xofuntion(gameState.oarry)) {
        return true;
    } else {
        if (isGameATie()) {
            alertUserOfWinnerAndRestart("nobody wins");
        }
    }

    return false;
}

function isGameATie(): boolean {
    return gameState.oarry.length + gameState.xarry.length == 9;
  //return gameState.counterx == 9; // There's 9 spots, and they have all been taken up.
}

function alertUserOfWinnerAndRestart(alertMessage: string): void {
    setTimeout(() => {
        alert(alertMessage);
        initializeGame();
    }, 0);
}

function getWinner(): string {
    // Ternary Statement: Basically a shorthand "if/else" clause
    return (gameState.counterx % 2 == 0) ? o : x;
}

function endGame(): void {
    // TODO: Inform the players the game is over and who won. 
    //       Bonus points if you restart for the next game! 

    let whowin: string = getWinner();

    // Declarative Programming
    alertUserOfWinnerAndRestart("the winner is  " + whowin);

    // Procedural Programming
    // setTimeout(() => {
    //     alert("the winner is  " + whowin);
    //     initializeGame();
    // }, 0);
}

initializeGame();

//Ahmads-MacBook-Air:HelloTypescript ahmadyounis$ git add src/ts/Main.ts
//Ahmads-MacBook-Air:HelloTypescript ahmadyounis$ git commit -m "this adding the x and o as function instaead of keep repeating the x and o using if statement"
//[TicTacToe 3508648] this adding the x and o as function instaead of keep repeating the x and o using if statement
// 1 file changed, 64 insertions(+), 32 deletions(-)
//Ahmads-MacBook-Air:HelloTypescript ahmadyounis$ git push


// 1. when no one is winning then the x or x is not display so i added the setTimeout same as 
// the alert for win x or o and it's working good now 
// 2. I complated the x and o raw and culoum for winning 
// 3. If no one is winning the i restart the game by calling in initializeGame() after the alert





                ///////////////////////////////////////////////////////
                //////////////// How to make computer play ///////////////////////////
                ///////////////////////////////////////////////////////



// X will start  
// O is the computer  
// O will check each filed to see if its fill or no 
// Use For loop to save all the empty fileds to Arry 
// now we need to think where to put O in which filed that the best to make it win 
// I am not sure how to make the step above 
// once we know which one is the best then we need to add O to the filed 
// Make the Arry + and also the counter + for O 
// then we need to make X turn 


// the rest will be the same to make the counter + 
// after each move we need to check if the game is done or no by win or tie 