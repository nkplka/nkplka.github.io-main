const nickname = document.getElementById('nickname');
const popup = document.getElementById('popup');

nickname.addEventListener('click', function() {
    popup.style.display = 'block';
});

popup.addEventListener('click', function(event) {
    event.stopPropagation();
});

window.addEventListener('click', function(event) {
    if (event.target !== nickname && event.target !== popup) {
        popup.style.display = 'none';
    }
});
