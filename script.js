//Main script file. All necessary script files are imported here

import { greenBtn, yellowBtn, redBtn, themeBtn } from "./scripts/buttons.js";






import {

    new_line,
    removeInput,
    trueValue,
    falseValue,
    createText,
    createCode,
    downloadFile,
    calc
} from "./scripts/functions.js";

import { setTheme } from "./scripts/themeSetter.js";

export let commandsList = [
    "help",
    "ls",
    "clear",
    "social",
    "ipconfig",
    "calc",
    "typing",
    "reset",
    "history",
    "csgo",
    "gtav",
    "server",
];


let delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const app = document.querySelector("#app");
const bodyContainer = document.querySelector("#bodyContainer");

const greenButton = document.querySelector("#greenButton");
greenButton.addEventListener("click", greenBtn);

const yellowButton = document.querySelector("#yellowButton");
yellowButton.addEventListener("click", yellowBtn);

const redButton = document.querySelector("#redButton");
redButton.addEventListener("click", redBtn);

const themeButton = document.querySelector("#themeButton");
themeButton.addEventListener("click", themeBtn);

//function to set up and start the terminal
async function openTerminal() {
    await createText("ку бро!");
    await delay(500);
    await createText("ща, все загрузит");
    await delay(800);
    await createText("ну напиши че нить по приколу");
    await createCode("что бы получить список команд напиши help", "");
    await delay(500);
    new_line();
}



//open the terminal
openTerminal();






// Themes Switcher
let switches = document.getElementsByClassName("main-switch");
let style = localStorage.getItem("style");

if (style == null) {
    setTheme("default");
} else {
    setTheme(style);
}

for (let i of switches) {
    i.addEventListener("click", function () {
        let theme = this.dataset.theme;
        setTheme(theme);
    });
}


