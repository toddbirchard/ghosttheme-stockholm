require('../src/less/pages.less');

var pageFunctions = {
  seriesSorter: function(){
    if ($('body').hasClass('home-template')) {
      $('.sort').on('click', function(){
    		$('.sorted-series').toggleClass('descending');
    	});

    	$('.sort').on('click', function(e) {
    		$('.sort').toggleClass('sort-toggle');
    	});
    }
  }
}

$(document).ready(function() {
  pageFunctions.postInit();
});
