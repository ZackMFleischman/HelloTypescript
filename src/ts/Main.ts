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
let counterx = 0;
let xarry: number[] = [];
let oarry: number[] = [];
let whowin : string = "" ; 

// Declare GameState data structure
interface GameState {
    grid2D: string[][];
    nextPlayersTurn: string; // "x" or "o"
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
    xarry = [];
    oarry = []; 
    counterx = 0;
}

function getInitialGameState(): GameState {
    let grid2D: string[][] = [
        [_, _, _],
        [_, _, _],
        [_, _, _]
    ];

    return {
        nextPlayersTurn: x,
        grid2D: grid2D
    } as GameState;
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
    updateGameStateWithPlayerMove(cellNumber);
    updateGameVisuals();

   // ticTacToeCells[cellNumber].innerText = (counterx % 2 == 0) ? x : o ;
    //counterx ++;
 

   if ( counterx % 2 == 0 )    {
    ticTacToeCells[cellNumber].innerText = x;
    console.log(" we added X");
    xarry.push(cellNumber);
    console.log("we added X to the Xarry at index is " + xarry );
         counterx ++;
         whowin = x;
    }
    else
    {
        ticTacToeCells[cellNumber].innerText = o; 
        console.log(" we added o");
        oarry.push(cellNumber);
    console.log("we added O to the Xarry at index is " + oarry );
        counterx ++;
        whowin =o;
       
    }

    // [Step 2c]
    if (isGameOver())

    
    {

    console.log("we are in the game over check");
        endGame();
    }

    else 
    {
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

function xofuntion(playerarray : number [] ): boolean {
    if (
       
        (playerarray.includes(0) && playerarray.includes(1) && playerarray.includes(2))  
        ||
        (playerarray.includes(0) && playerarray.includes(3) && playerarray.includes(6) 
        ||
        (playerarray.includes(1) && playerarray.includes(4) && playerarray.includes(7)) 
        ||
        (playerarray.includes(2) && playerarray.includes(5) && playerarray.includes(8)) 
        ||
        (playerarray.includes(3) && playerarray.includes(4) && playerarray.includes(5)))
    )

    {
        return true;

    }
    else 
    {
        return false;
    }
}


function isGameOver(): boolean 
{
            if (xofuntion(xarry) || xofuntion(oarry))
            {
                return true;
            }
   
       else {
           if(counterx == 9) 
           alert("nobody win");
       }
           return false;

}

function endGame(): void {
    // TODO: Inform the players the game is over and who won. 
    //       Bonus points if you restart for the next game! 
   
    //initializeGame();
    console.log("x should display as won in alert message");
    setTimeout(() => {
        alert("the winner is  " + whowin);
        initializeGame();  
    }, 0);
    

}

initializeGame();