<script>


    (function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementById('msform');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();


  //jQuery time
  var current_fs,
    next_fs,
    previous_fs; //fieldsets
  var left,
    opacity,
    scale; //fieldset properties which we will animate
  var animating; //flag to prevent quick multi-click glitches


	$(".next").click(function(){
		current_fs = $(this).closest('fieldset');
    next_fs = current_fs.next();

    // everything looks good!
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



</script>
