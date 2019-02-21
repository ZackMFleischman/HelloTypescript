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

<<<<<<< Updated upstream
const fetcher = new Fetcher();
fetcher.fetchYaml<IWebsiteData>(Environment.configServer() + "yaml/example.yaml")
    .then(setupWithData);
=======
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



interface GameModel {
    grid2D: string[][];
    nextPlayersTurn: string; // "x" or "o"
}

/// TIC - TAC - TOE
/*
let grid2D: string[][] = [
        [x, o, _],
        [_, x, o],
        [x, o, _]
    ];
*/
function displayGameBoard(gameModel: GameModel) {

    console.log("Next Players Turn: " + gameModel.nextPlayersTurn);

    for (let x = 0; x < 3; ++x) {

        let displayRow: string = "";
        for (let y = 0; y < 3; ++y) {
            displayRow += gameModel.grid2D[x][y];
        }
        console.log(displayRow);

    }
}

function playTicTacToe() {
    console.log("Let's Play TicTacToe");

    const x: string = "x";
    const o: string = "o";
    const _: string = " ";

    let grid2D: string[][] = [
        [x, o, _],
        [_, x, o],
        [x, o, _]
    ];
    displayGameBoard({
        nextPlayersTurn: "x",
        grid2D: grid2D
    });

    // x | o |  
    // ---------
    //   | x |  
    // ---------
    //   | o | x



    // What do we need to play?
    // 1. State of the board: Game Model
    //      -- Data
    // 2. Display the board   
    //    -- Background-
    //
    // - 2 Players
    // - Game rules
    //     - Start game
    // - End of game check and message, offer to restart the game.




}

playTicTacToe();

>>>>>>> Stashed changes
