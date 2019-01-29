$(document).ready(function() {
  //jQuery time
  var current_fs,
    next_fs,
    previous_fs; //fieldsets
  var left,
    opacity,
    scale; //fieldset properties which we will animate
  var animating; //flag to prevent quick multi-click glitches

	$('.form').validator();


	$(".next").click(function(){
		current_fs = $(this).closest('fieldset');
    next_fs = current_fs.next();
		$.fn.validator.Constructor.INPUT_SELECTOR = ':input:not([type="hidden"], [type="submit"], [type="reset"], button)';
		$('.form').validator('update')
		$('.form').validator('validate')



	  if (e.isDefaultPrevented()) {
	    // handle the invalid form...



	  } else {
    // everything looks good!
    console.log('this = ' + $(this).prop('tagName'));
    if (animating)
      return false;
    animating = true;




    //activate next step on progressbar using the index of next_fs
    var this_fs_index = $(current_fs).index();
    var next_fs_index = $(next_fs).index();
    $("#progressbar li").eq(next_fs_index).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({
      opacity: 0
    }, {
      step: function(now, mx) {
        //as the opacity of current_fs reduces to 0 - stored in "now"
        //1. scale current_fs down to 80%
        scale = 1 - (1 - now) * 0.2;
        //2. bring next_fs from the right(50%)
        left = (now * 50) + "%";
        //3. increase opacity of next_fs to 1 as it moves in
        opacity = 1 - now;
        current_fs.css({
          'transform': 'scale(' + scale + ')',
          'position': 'absolute'
        });
        next_fs.css({'left': left, 'opacity': opacity});
      },
      duration: 800,
      complete: function() {
        current_fs.hide();
        animating = false;
      },
      //this comes from the custom easing plugin
      easing: 'easeInOutBack'
    });
  }
});

  $(".previous").click(function() {
    if (animating)
      return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li").eq(this_fs_index).removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({
      opacity: 0
    }, {
      step: function(now, mx) {
        //as the opacity of current_fs reduces to 0 - stored in "now"
        //1. scale previous_fs from 80% to 100%
        scale = 0.8 + (1 - now) * 0.2;
        //2. take current_fs to the right(50%) - from 0%
        left = ((1 - now) * 50) + "%";
        //3. increase opacity of previous_fs to 1 as it moves in
        opacity = 1 - now;
        current_fs.css({'left': left});
        previous_fs.css({
          'transform': 'scale(' + scale + ')',
          'opacity': opacity
        });
      },
      duration: 800,
      complete: function() {
        current_fs.hide();
        animating = false;
      },
      //this comes from the custom easing plugin
      easing: 'easeInOutBack'
    });
  });

  $(".submit").click(function() {
    return false;
  });

});
