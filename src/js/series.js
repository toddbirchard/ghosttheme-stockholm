require('../less/series.less');

var pageFunctions = {
  seriesSorter: function(){
      $('.sort-container').on('click', function(){
    		$('.sorted-series').toggleClass('descending');
    	});

    	$('.sort-container').on('click', function(e) {
    		$('.sort').toggleClass('sort-toggle');
    	});
  }
}

$(document).ready(function() {
  pageFunctions.seriesSorter();
});
