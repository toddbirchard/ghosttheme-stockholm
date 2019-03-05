$(document).ready(function() {
  $('.sort').on('click', function(){
		$('.sorted-series').toggleClass('descending');
	});

	$('.sort').on('click', function(e) {
		$('.sort').toggleClass('sort-toggle');
	});
});

$(document).ready(function() {
  postFunctions.postInit();
});
