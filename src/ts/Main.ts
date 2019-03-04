//
// Entry Point into the app.
//

import "@Sass/styles"; // Pull in the CSS
import Fetcher from "@Fetcher/Fetcher";
import Environment from "@Environment/Environment";
import CSS from "@Sass/styles.scss";


interface IUser {
    name: string;
    age: number;
    email: string;
    favoriteAnimal: string;
    picture: string;
}

interface IWebsiteData {
    title: string;
    users: IUser[];
}

function setupWithData(websiteData: IWebsiteData) {
    const mainDiv: HTMLElement | null = document.getElementById(CSS.idMain);
    if (mainDiv) {
        mainDiv.innerText = websiteData.title;

        const usersDiv: HTMLElement = document.createElement("div");
        usersDiv.id = "idUsers";
        usersDiv.innerText = "Users:";
        mainDiv.appendChild(usersDiv);

    } else {
        console.log(`Couldn't find the main div!`);
    }
}

function getUsersHTMLElement(users: IUser[]): HTMLElement {
    const usersUL: HTMLOListElement = document.createElement("ol");

    users.forEach(user => {
        const listItem = document.createElement("li")
        listItem.appendChild(getUserHTMLElement(user));

        usersUL.appendChild(listItem);
    })

    return usersUL;
}

function getUserHTMLElement(user: IUser): HTMLElement {
    const userUL: HTMLUListElement = document.createElement("ul");

    userUL.appendChild(getListItemForString("Name: " + user.name));
    userUL.appendChild(getListItemForString("Age: " + user.age));
    userUL.appendChild(getListItemForString("Email: " + user.email));
    userUL.appendChild(getListItemForString("Favorite Animal: " + user.favoriteAnimal));
    userUL.appendChild(getListItemForImage(user.picture));

    return userUL;
}

function getListItemForString(label: string) {
    const listItem: HTMLLIElement = document.createElement("li");
    listItem.innerText = label;
    return listItem;
}

function getListItemForImage(imageUrl: string) {
    const listItem: HTMLLIElement = document.createElement("li");
    const imageElement: HTMLImageElement = document.createElement("img");
    imageElement.src = imageUrl;

    listItem.appendChild(imageElement);
    return listItem;
}

// Uncomment this for the original code...
// const fetcher = new Fetcher();
// fetcher.fetchYaml<IWebsiteData>(Environment.configServer() + "yaml/example.yaml")
//     .then(setupWithData);

///////////////////////////////////////////////////////
///////////////////// TIC TAC TOE /////////////////////
///////////////////////////////////////////////////////


// x | o |  
// ---------
//   | x |  
// ---------
//   | o | x

//
// What we need to do in order (Game Recipe)
//
// 1. Declare the GameModel and initialize it with the initial state of the game.
// 2. Enter a game loop:
//      1. Display the Board to the player
//      2. Ask the correct player for his move
//      3. Apply his move to the game, and recalculate the next game state
//      4. If a player has won/lost, exit the loop and show GameOver/YouWin.

const x: string = "x";
const o: string = "o";
const _: string = " ";

// Declare GameModel
interface GameModel {
    grid2D: string[][];
    nextPlayersTurn: string; // "x" or "o"
}

function playGame() {
    // Step 1: Declare the GameModel and initialize it with the initial state of the game.
    const gameModel: GameModel = getInitialGameModel();

    // Step 2. Enter a game loop
    while (true) {
        // Step 2a. Display the Board to the player
        displayGameBoard(gameModel);

        // Step 2b. Ask the correct player for his move
        const nextMove: number = promptNextPlayerForMove(gameModel.nextPlayersTurn);

        // Step 2c. Apply his move to the game, and recalculate the next game state
        applyMoveToGame(nextMove, gameModel);

        // Step 2d. If a player has won/lost, exit the loop and show GameOver/YouWin.
        if (isGameOver(gameModel)) {
            break;
        }
    }
}

// Step 1: Initialize the GameModel with the initial state of the game
function getInitialGameModel(): GameModel {
    let grid2D: string[][] = [
        [_, _, _],
        [_, _, _],
        [_, _, _]
    ];

    return {
        nextPlayersTurn: x,
        grid2D: grid2D
    } as GameModel;
}

/*
// Step 2a. Display the Board to the player
let grid2D: string[][] = [
        [x, o, _],
        [_, x, o],
        [x, o, _]
    ];
*/
function displayGameBoard(gameModel: GameModel): void {
    for (let x = 0; x < 3; ++x) {

        let displayRow: string = "";
        for (let y = 0; y < 3; ++y) {
            displayRow += gameModel.grid2D[x][y];
        }
        console.log(displayRow);
    }
}

// Step 2b. Ask the correct player for his move
// Current Game Board:
// _ _ _  | 1 2 3
// _ x _  | 4 5 6
// _ _ _  | 7 8 9
function promptNextPlayerForMove(nextPlayer: string): number {
    // TODO: Prompt for input
    return 5;
}

// Step 2c. Apply his move to the game, and recalculate the next game state
function applyMoveToGame(nextMove: number, gameModel: GameModel): void {
}

// Step 2d
function isGameOver(gameModel: GameModel): boolean {
    // 1. Rows, Columns, or Diagonals are all one player
    // 2. The board is full (tie)
    return false;
}


////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// TYPE SIGNATURE: It's inputs and outputs:
// 1. INPUTS: Look in the parentheses, and see how many parameters there are, and what
//    their types are.
// 2. OUTPUTS: Look right after the parentheses, before the {, and see what it's return type
//    is.
function whatsMyTypeSignature(param1: string, param2: number): string {
    return "hello";
}


// Type Signature
// Inputs: 2 parameters: object, string
// Outputs: 1 return value: number
function whatsMyTypeSignature2(param1: object, param2: string): number {
    return 99;
}

playGame();
