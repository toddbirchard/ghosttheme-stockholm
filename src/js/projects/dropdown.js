export function build_dropdown() {

  $('.projects-dropdown').on('mouseover', function() {
    $('.dropdown-list').css('display', 'block');
    $('.dropdown-list').css('opacity', '1');
  });

  $('.projects-dropdown').on('mouseleave', function() {
    $('.dropdown-list').css('display', 'none');
    $('.dropdown-list').css('opacity', '0');
  });

  $('.projects-dropdown').on('click', function() {
    $('.dropdown-list').css('display', 'block');
    $('.dropdown-list').css('opacity', '1');
  });
}
