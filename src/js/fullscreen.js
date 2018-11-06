$(document).ready(function(){
    $('.post-template article .post-content img').materialbox();
    $('.post-content pre').each(function(){
      if ( $(this).height() >= 400 ) {
        $(this).append('<div class="fullscreenbtn"><i style="transform: rotate(45deg);" class="far fa-arrows-alt-v"></i></div>');
      }
    });
    $('.fullscreenbtn').on('click', function(event){
      var height = $(window).height();
      var codeContainer = $(this).closest('pre');
      codeContainer.css('max-height', 'none');
      codeContainer.css('padding', '64px 20px !important')
      $(this).css('opacity', 0);
      codeContainer.animate({
        //height: $(window).height()
    }, 1000);
    $('html,body').animate({
        scrollTop: codeContainer.position().top + 100
    });
  });
});
