
import config from "../config.js";

import { suggestFurtherCommand } from "./compare.js";
import {
    commandHistory,
    saveHistory,
    clearHistory,
    popInvalidCommand,
    runSpecificHistoryCmd,
} from "./history.js";

const app = document.querySelector("#app");
let delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));




function IPDetails() {
    const addr = "https://ipapi.co/json";
    fetch(addr)
        .then(response => response.json())
        .then(json => {
                createText("ip: " + json.ip)
        })
}

function serverstat() {
    const addr = "https://api.mcsrvstat.us/2/mc.nkpl.ru";
    fetch(addr)
        .then(response => response.json())
        .then(json => {


            if (json.online == false){
                createText("Server Status")
                createText("Offline")

            }
            else {
                createText("ip: " +  json.hostname)
                createText("online: " + json.players.online + "/" + json.players.max)
            }
        })
}
function removeNeoFetch() {
    const element = document.querySelector(".fetch-container")
    if (element) element.remove();
}


async function getInputValue(history, remove = false, cmd = undefined) {
    const val = cmd || document.querySelector("input").value.trim().toLowerCase();
    saveHistory(val);
    const a = val.split(" ");
    const flag = a[1];
    const value = a[0];
    const flags = [...a];

    flags.shift(); // removes the first element
    if (value.substring(0, 5) === "cheer") {
        value.substring(0, 5).toLowerCase();
    } else {
        value.replace(/\s+/g, "").toLowerCase();
    }

    history.push(cmd || document.querySelector("input").value);

    if (remove) removeInput();


    switch (value) {
        case "help":
        case "ls":
            config.help.sort((a, b) => {
                return a.title.localeCompare(b.title);
            });

            if (flag == '-d') {
                trueValue(val)
                for (let item of config.help) {
                    await createText(`${item.title} :- ${item.description}`);
                }
                break;
            }

            if (flag) {
                trueValue(val);
                let isCmd = false;
                for (let x of config.help) {
                    if (flag === x.title) {
                        for (let i=0;i<x.info.length;i++)
                            await createText(x.info[i]);
                        isCmd = true;
                        break;
                    }
                }

                if (!isCmd) {
                    await createText(`${flag} инвалид комманд`);
                    let commands = suggestFurtherCommand(flag);
                    await createText("может ты хочешь ввести эту команду? -  " + commands);
                }
                break;
            }

            trueValue(value);
            let titles = config.help.map(item => item.title);
            let titlesString = titles.join(', ');
            await createText(titlesString);
            await createText("-d, там я вроде чет написал")
            await createText("help 'command'")

            break;

        case "auth":
            window.location.replace("./login.html");
            break;


        case "server":
            trueValue(value);
            serverstat()
            break;




        case "reset":
            trueValue(value);
            location.reload(true);
            break;
        case "social":
                trueValue(val);
                config.social.forEach((item) => {
                    createText(`${item.title} :- <a href=${item.link} target="_blank">${item.link}</a>
            `, false);
                });
                break;
        case "cfg":
                trueValue(val);
                config.cfg.forEach((item) => {
                    createText(`${item.title} :- <a href=${item.link} target="_blank">${item.link}</a>
            `, false);
                });
                break;


        case "ipconfig":
            trueValue(value);
            IPDetails()
            break;


        case "clear":
        case "cls":
            document
                .querySelectorAll("p")
                .forEach((e) => e.parentNode.removeChild(e));
            document
                .querySelectorAll("section")
                .forEach((e) => e.parentNode.removeChild(e));
            removeNeoFetch();
            removeInput();
            await delay(150);
            break;

        case "sudo":
            trueValue(value);
            await createText("You are not authorized to use this command");
            break;

        case "cd":
            trueValue(value);
            await createText("There's no directory in this path");
            break;
        case "calc":
            calc(flags.join(""));
            break;
        case "history":
            if (flag === "--clear") {
                clearHistory();
            }
            if (Number(flag)) {
                await runSpecificHistoryCmd(Number(flag));
            } else {
                await commandHistory();
            }
            break;
        case "typing":
            await typingCmd(flag);
            break;
        case "exit":
            window.close();
        default:
            if (value.substring(0, 5) === "cheer") {
                trueValue(value);
                const reply =
                    config.cheer.responseArray[
                    Math.floor(
                        Math.random() * config.cheer.responseArray.length
                    )
                    ];
                await createText(reply);
            } else {
                falseValue(value);
                await createText(`${value} is not a valid command`);
                let commands = suggestFurtherCommand(value);
                await createText("Are you looking for this: " + commands);
            }
    }
}

function new_line() {
    const p = document.createElement("p");
    const span = document.createElement("span");
    const span2 = document.createElement("span");
    p.setAttribute("class", "path");
    p.textContent = config.terminal.user + " ";
    span.textContent = config.terminal.host + " ";
    span2.textContent = config.terminal.path + " ";
    p.appendChild(span);
    p.appendChild(span2);
    app.appendChild(p);
    const div = document.createElement("div");
    div.setAttribute("class", "type");
    const i = document.createElement("i");
    i.setAttribute("class", "fas fa-angle-right icone");
    const input = document.createElement("input");
    div.appendChild(i);
    div.appendChild(input);
    app.appendChild(div);
    input.focus();
}

function removeInput() {
    const div = document.querySelector(".type");
    if (div) app.removeChild(div);
}

function trueValue(value) {
    const div = document.createElement("section");
    div.setAttribute("class", "type2");
    const i = document.createElement("i");
    i.setAttribute("class", "fas fa-angle-right icone");
    const msg = document.createElement("h2");
    msg.textContent = `${value}`;
    div.appendChild(i);
    div.appendChild(msg);
    app.appendChild(div);
}

function falseValue(value) {
    const div = document.createElement("section");
    div.setAttribute("class", "type2");
    const i = document.createElement("i");
    i.setAttribute("class", "fas fa-angle-right icone");
    const msg = document.createElement("h2");
    msg.setAttribute("class", "error");
    msg.textContent = `${value}`;
    div.appendChild(i);
    div.appendChild(msg);
    app.appendChild(div);
}

async function createText(text, typingOn = true) {
    const p = document.createElement("p");
    app.appendChild(p);
    p.scrollIntoView({ behavior: 'smooth' });

    const typing = localStorage.getItem("typing");

    if (!typingOn || (typing && typing === "off")) {
        p.innerHTML = text;
        return;
    }

    const typingSpeed = localStorage.getItem("typingSpeed") || 20;

    let index = 0;
    async function writeText() {
        while (index < text.length) {
            p.innerHTML += text[index++];
            await new Promise((writeText) => setTimeout(writeText, typingSpeed));
        }
        return;
    }

    await writeText();

}

async function createCode(code, text, typingOn = true) {
    const p = document.createElement("p");
    app.appendChild(p);

    const typing = localStorage.getItem("typing");

    if (!typingOn || (typing && typing === "off")) {
        p.innerHTML = `<span class="code">${code} =></span> ${text}`;
        return;
    }

    const typingSpeed = localStorage.getItem("typingSpeed") || 20;

    const span = document.createElement("span");
    span.className = "code"
    p.appendChild(span);
    p.scrollIntoView({ behavior: 'smooth' });
    let index = 0;
    async function writeCode() {
        while (index < code.length) {
            span.innerHTML += code[index++];
            await new Promise((writeCode) => setTimeout(writeCode, typingSpeed));
        }
        return;
    }
    await writeCode();

    p.innerHTML += " "

    index = 0;
    async function writeText() {
        while (index < text.length) {
            p.innerHTML += text[index++];
            await new Promise((writeText) => setTimeout(writeText, typingSpeed));
        }
        return;
    }

    await writeText();

}

function downloadFile() {
    let link = document.createElement("a");
    link.href = resumeUrl;
    link.click();
    const p = document.createElement("p");
    p.innerHTML = "<span class='blink'>###############<span />";
    app.appendChild(p);
    setTimeout(() => {
        app.removeChild(p);
    }, 2500);
    document.body.removeChild(link);
}

async function calc(flag) {
    try {
        if (flag === "" || flag === " " || flag === undefined) {
            falseValue(flag);
            await createText("Пожалуйста, введите допустимое выражение");
        } else {
            trueValue(flag);
            function parse(str) {
                return Function(`'use strict'; return (${str})`)();
            }
            await createText(flag + " = " + parse(flag));
        }
    } catch (e) {
        falseValue(flag);
        await createText(flag + " является недопустимым выражением");
    }
}

// all functions exported
export {
    removeNeoFetch,
    getInputValue,
    new_line,
    removeInput,
    trueValue,
    falseValue,
    createText,
    createCode,
    downloadFile,
    calc,
};

const typingCmd = async (flag) => {
    const typing = localStorage.getItem("typing");
    let typingSpeed = localStorage.getItem("typingSpeed");

    if (flag == "-on") {
        localStorage.setItem("typing", "on");
        createText("on");
    } else if (flag == "-off") {
        localStorage.setItem("typing", "off");
        createText("off");
    } else if (Number(flag)) {
        localStorage.setItem("typingSpeed", Number(flag));
        typingSpeed = localStorage.getItem("typingSpeed");
        await createText(`Typing animation speed is set to ${typingSpeed ? typingSpeed : 20}ms`);
    } else {
        await createText(`Анимация ввода текста в настоящее время ${typing ? typing : "on"} и скорость установлена на ${typingSpeed ? typingSpeed : 20}ms`);
        await createText("Включайте и выключайте анимацию набора текста, добавляя флаги -on или -off соответственно");
        await createText("Также вы можете ввести число (в мс), чтобы задать скорость ввода пользовательской анимации");
    }
}
