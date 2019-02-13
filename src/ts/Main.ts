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
        mainDiv.appendChild(usersDiv);

    } else {
        console.log(`Couldn't find the main div!`);
    }
}

const fetcher = new Fetcher();
fetcher.fetchYaml<IWebsiteData>(Environment.configServer() + "yaml/example.yaml")
    .then(setupWithData);