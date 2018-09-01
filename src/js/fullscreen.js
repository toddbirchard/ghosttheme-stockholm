$(document).ready(function(){
    $('article img').materialbox();
    $('pre').append('<div class="fullscreenbtn"><i class="fal fa-square"></i></div>');
    $('.fullscreenbtn').on('click', function(){
      var height = $(window).height();
      $(this).closest('pre').addClass('fullscreen');
      $(this).closest('pre').css('max-height', 'none');
      $(this).closest('pre').css('height', height);
      $([document.documentElement, document.body]).animate({
        scrollTop: $(this).offset().top
    }, 2000);
    })
});
