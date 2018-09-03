$(document).ready(function(){
    $('.post-template article img').materialbox();
    $('pre').append('<div class="fullscreenbtn"><i style="transform: rotate(45deg);" class="far fa-arrows-alt-v"></i></div>');
    $('.fullscreenbtn').on('click', function(){
      var height = $(window).height();
      $(this).closest('pre').toggleClass('fullscreen');
      $(this).closest('pre').css('max-height', 'none');
      $(this).css('opacity', 0);
      $([document.documentElement, document.body]).animate({
        scrollTop: $(this).closest('pre').offset().top,
        height: $(window).height()
    }, 1000);
    })
});
