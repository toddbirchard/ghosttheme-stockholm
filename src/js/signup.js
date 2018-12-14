/*====================================================
  TABLE OF CONTENTS
  1. function declaretion
  2. Initialization
====================================================*/

/*===========================
 1. function declaretion
 ==========================*/

var signupForm = {
  closeSignup: function() {
    $(".overlay").on('click', function() {
      $('body').removeClass('stop-scrolling');
      var signupGone = new TimelineMax();
      var formGone = new TimelineMax();

      // remove overlay
      signupGone
        .to(".overlay", 0.4, {
          opacity: 0,
          ease: Elastic.easeOut.config(1, 1.1)
        }, "-=0.5")
        .to(".signup", 0.4, {
          opacity: 0,
          y: 100,
          ease: Elastic.easeOut.config(1, 1.1)
        }, "-=0.5")
        .set([".overlay", ".signup"], {
          visibility: "hidden"
        });

      // remove form
      formGone
        .to([".signup .signup-form", ".float-left", ".float-right", ".signup .text_max", ".signup .description", ".signup .signup-head"], 0.8, {
          y: 100,
          opacity: 0,
          ease: Elastic.easeOut.config(1, 1.5)
        })
        .set([".confirm-head", ".confirm-description"], {
          visibility: "visible"
        })
        .from(".confirm-head", 0.4, {
          y: '-900px',
          ease: Elastic.easeOut.config(1, 1.5)
        })
        .from(".confirm-description", 0.4, {
          y: '-900px',
          ease: Elastic.easeOut.config(1, 1.5)
        });
    });

  },
  signup: function() {

    $(".signup").css('display', 'block');
    $(".overlay").css('display', 'block');
    $(".overlay").css('opacity', '1');
    $('body').addClass('stop-scrolling');

    var tlScreen1 = new TimelineMax();

    //    TweenMax.to("#earth", 3, {x:500, scale:0.5, rotation:720, opacity: 0.5});
    //    TweenLite.to("#astro", 3, { ease: Elastic.easeOut.config(1, 1), x: 500, scale: 0.5});

    tlScreen1
      .set(".signup .text_max", {
        visibility: "visible"
      })
      .set(".signup", {
        visibility: "visible"
      })
      .add("start")
      .from(".signup", 0.4, {
        y: '-900px'
      })
      .set(".signup #thunder", {
        fillOpacity: 1
      })
      .from(".signup #thunder", 1, {
        y: -300,
        ease: Elastic.easeOut.config(1, 1.1)
      })
      .from(".signup .text_max", 1, {
        opacity: 0,
        y: 200,
        ease: Elastic.easeOut.config(1, 1.5)
      }, "start")
      .from(".signup #logo", 0.3, {
        delay: 0.2,
        y: '-300px',
        scale: 1
      })
      .to(".signup .text_max", 0.2, {
        opacity: 0
      }, "-=0.5")
      .add("nextScreen")
      .set([".options", ".signup-form", ".signup-head", ".description"], {
        visibility: "visible"
      })
      .from(".signup .description", 0.8, {
        y: '-300px',
        opacity: 0
      })
      .to(".signup #logo-txt", 0.8, {
        opacity: 1
      })
      .from(".signup .signup-head", 0.8, {
        y: 100,
        opacity: 0,
        ease: Elastic.easeOut.config(1, 1.5)
      }, "nextScreen")
      .from(".signup .signup-form", 1.2, {
        y: 200,
        opacity: 0,
        ease: Elastic.easeOut.config(0.8, 1.5)
      }, "nextScreen")
      .from([".float-left", ".float-right"], 1, {
        y: 35,
        opacity: 0,
        ease: Elastic.easeOut.config(0.8, 1.5)
      }, "-=0.4");

    /*$(".signup #signup-button").mousedown(function() {
        $(this).css("box-shadow", "unset");
      });

      $(".signup #signup-button").on('click', function() {



      $(".signup #signup-button").mouseup(function() {
        $(this).css("box-shadow", "0px 5px 11px 0px #0000001a");
      });
    });*/
  },
  init: function() {
    $('.account').on('click', function(e) {
      e.preventDefault();
      signupForm.signup();
    });
    $(".signup #signup-button").on('click', function() {
      signupForm.closeSignup();
    });
  }
};

/*===========================
2. Initialization
============= =============*/
$(document).ready(function() {
  signupForm.init();
});
