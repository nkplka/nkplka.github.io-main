$(document).ready(function() {
  $('.tabs li a').click(function() {
    var tab_id = $(this).attr('href');

    $('.tabs li a').removeClass('active');
    $('.tabcontent').removeClass('active');

    $(this).addClass('active');
    $(tab_id).addClass('active');
  });
});
