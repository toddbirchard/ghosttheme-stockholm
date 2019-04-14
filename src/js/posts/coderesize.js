export function code_snippet_full_screen() {
  $('main > pre').each(function() {
    if ($(this).height() >= 400) {
      $(this).append('<div class="fullscreenbtn"><i style="transform: rotate(45deg);" class="far fa-arrows-alt-v"></i></div>');
      $(this).append('<div class="codeoverflow"></div>');
    }
  });
  $('.fullscreenbtn').on('click', function(event) {
    var preContainer = $(this).closest('pre');
    preContainer.css('max-height', 'none');
    preContainer.css('padding', '64px 20px !important');
    preContainer.css('border-radius', '0');
    preContainer.addClass('fullWidth');
    preContainer.find('.codeoverflow').remove();
    $(this).css('opacity', 0);
    $('html,body').animate({scrollTop: preContainer.position().top});
  });
}
