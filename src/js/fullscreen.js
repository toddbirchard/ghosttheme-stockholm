$(document).ready(function(){
    $('article img').materialbox();
    $('pre').append('<div class="fullscreenbtn"><i class="fal fa-square"></i></div>')
    $('.fullscreenbtn').on('click', function(){
      $(this).closest('pre').addClass('fullscreen')
    })
});
