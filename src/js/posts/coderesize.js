export function code_snippet_full_screen() {
  $('main pre').each(function() {
    $(this).append('<div class="fullscreen-btn"><i style="transform: rotate(45deg);" class="fas fa-arrows-alt-v"></i></div>');
    $(this).append('<div class="codeoverflow"></div>');
  });
  $('.fullscreen-btn').on('click', function(event) {
    var preContainer = $(this).closest('pre');
    preContainer.addClass('fullWidth');
    preContainer.find('.codeoverflow').remove();
    preContainer.find('.fullscreen-btn').remove();
    $(this).css('opacity', 0);
    $('html,body').animate({scrollTop: preContainer.position().top});
  });
}
