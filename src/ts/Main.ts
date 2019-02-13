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
        usersDiv.innerText = "Users:";

        usersDiv.appendChild(getUsersHTMLElement(websiteData.users));

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

const fetcher = new Fetcher();
fetcher.fetchYaml<IWebsiteData>(Environment.configServer() + "yaml/example.yaml")
    .then(setupWithData);