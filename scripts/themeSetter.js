//Theme setter file.


function setTheme(theme) {
    const chosenTheme = "./themes/" + theme + ".css";
    document.getElementById("switcher-id").href = chosenTheme;

    localStorage.setItem("style", theme);
    if (theme === "default") {
        document.documentElement.setAttribute("data-theme", "default");

    } else if (theme === "matrix") {
        document.documentElement.setAttribute("data-theme", "matrix");

        localStorage.setItem("style", theme);
    }
}
export {
    //function exported
    setTheme
}
