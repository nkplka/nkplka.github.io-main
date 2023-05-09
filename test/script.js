$(function() {
    $("#menu").draggable();
});

$(document).ready(function() {
    setTimeout(function() {
        $('#logo-container').fadeOut('slow', function() {
            $('#menu').fadeIn('slow');
            $('#overlay').fadeOut('slow');
        });
    }, 1000); // Скрываем лого через 2 секунды
});

$(document).keydown(function(e) {
    if (e.keyCode === 45) { // проверяем, нажата ли клавиша Insert
        $('#menu').toggle(); // скрываем или показываем меню
    }
});

$(document).ready(function(){
    $('.tabs li a').click(function(event){
        event.preventDefault();
        var tab_id = $(this).attr('href');
        $('.tabs li a').removeClass('current');
        $('.tabcontent').removeClass('active');
        $(this).addClass('current');
        $(tab_id).addClass('active');
    });
});


