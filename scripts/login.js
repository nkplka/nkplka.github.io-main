// список разрешенных IP-адресов
var allowedIps = ["85.192.19.167"];

// текущий IP-адрес пользователя
var currentIp = "";

// функция, которая проверяет, есть ли текущий IP в списке разрешенных
function isIpAllowed(ip) {
    return allowedIps.includes(ip);
}

// функция для получения IP-адреса пользователя
function getIp() {
    return fetch("https://ipapi.co/json")
        .then((res) => res.json())
        .then((json) => json.ip);
}

// проверяем IP-адрес пользователя и перенаправляем, если он не разрешен
getIp().then((ip) => {
    currentIp = ip;
    if (!isIpAllowed(currentIp)) {
        window.location.href = "../index.html";
    }
});
