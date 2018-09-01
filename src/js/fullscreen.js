$(document).ready(function(){
    $('article img').materialbox();
    $('pre').append('<div class="fullscreenbtn"><i class="fal fa-square"></i></div>');
    $('.fullscreenbtn').on('click', function(){
      var height = $(window).height();
      $(this).closest('pre').toggleClass('fullscreen');
      $(this).closest('pre').css('max-height', 'none');
      $(this).closest('pre').css('height', height);
      $([document.documentElement, document.body]).animate({
        scrollTop: $(this).closest('pre').offset().top
    }, 1000);
    })
});