export function build_dropdown() {

  $('.stockholmproject').on('click', function() {
    construct_query();
  });

  $('.tokyoproject').on('click', function() {
    construct_query('Toddzilla');
  });

  $('.linkbox-api').on('click', function() {
    construct_query('Linkbox API');
  });

  $('.ghostthemesio').on('click', function() {
    construct_query('ghostthemes.io');
  });

  $('.dropdown').on('mouseover', function() {
    $('.dropdown-list').css('display', 'block');
    $('.dropdown-list').css('opacity', '1');
  });

  $('.dropdown').on('mouseleave', function() {
    $('.dropdown-list').css('display', 'none');
    $('.dropdown-list').css('opacity', '0');
  });

  $('.mobilemenu').on('click', function() {
    $('.dropdown-list').css('display', 'block');
    $('.dropdown-list').css('opacity', '1');
  });
}
