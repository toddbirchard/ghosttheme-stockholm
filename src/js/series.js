import '../less/series.less';

function series_sorter() {
  $('.sort-container').on('click', function() {
    $('.sorted-series').toggleClass('descending');
  });

  $('.sort-container').on('click', function(e) {
    $('.sort').toggleClass('sort-toggle');
  });
}

$(document).ready(function() {
  series_sorter();
});
