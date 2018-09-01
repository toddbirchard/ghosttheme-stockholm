$(document).ready(function(){
    $('article img').materialbox();
    $('pre').append('<div class="fullscreenbtn"><i class="far fa-square"></i></div>')
    $('.fullscreenbtn').on('click', function(){
      $(this).closest('code').addClass('fullscreen')
    })
});
