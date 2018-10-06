"use strict";

/*====================================================
  TABLE OF CONTENTS
  1. function declaretion
  2. Initialization
====================================================*/
// import { Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk'

/*===========================
 1. function declaretion
 ==========================*/
var themeApp = {
  featuredMedia: function featuredMedia() {
    $(".post").each(function () {
      var thiseliment = $(this);
      var media_wrapper = $(this).find('featured');
      var media_content_image = media_wrapper.find($('img'));
      var media_content_embeded = media_wrapper.find('iframe');

      if (media_content_image.length > 0) {
        $(media_content_image).insertAfter(thiseliment.find('.post-head')).wrap("<div class='featured-media'></div>");
        thiseliment.addClass('post-type-image');
        media_wrapper.remove();
      } else if (media_content_embeded.length > 0) {
        $(media_content_embeded).insertAfter(thiseliment.find('.post-head')).wrap("<div class='featured-media'></div>");
        thiseliment.addClass('post-type-embeded');
      }
    });
  },
  sidebarConfig: function sidebarConfig() {
    if (sidebar_left == true) {
      $('.main-content').addClass('col-md-push-4');
      $('.sidebar').addClass('col-md-pull-8');
    }
  },
  facebook: function facebook() {
    var fb_page = '<iframe src="//www.facebook.com/plugins/likebox.php?href=' + facebook_page_url + '&amp;width&amp;height=258&amp;colorscheme=light&amp;show_faces=true&amp;header=false&amp;stream=false&amp;show_border=false" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:258px; width:100%;" allowTransparency="true"></iframe>';
    $('.fb').append(fb_page);
  },
  googlePlus: function googlePlus() {
    if (badge_type !== "" && google_plus_url !== "") {
      $('body').append('<script src="https://apis.google.com/js/platform.js" async defer></script>');
      var container = $('.google-plus');
      var width = container.width();
      var google_plus_code = '<div class="g-' + badge_type + '" data-width="' + width + '" data-layout="landscape" data-height="150px" data-href="' + google_plus_url + '" data-rel="publisher"></div>';
      container.append(google_plus_code);
    }
  },
  highlighter: function highlighter() {
    $('pre code').each(function (i, block) {
      hljs.highlightBlock(block);
    });
  },
  backToTop: function backToTop() {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('#back-to-top').fadeIn();
      } else {
        $('#back-to-top').fadeOut();
      }
    });
    $('#back-to-top').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 1000);
      return false;
    });
  },
  adjustTileHeight: function adjustTileHeight() {
    var tile = $('.archive .tag-wrapper');
    var max_height = 0;

    if (tile.length > 0) {
      $.each(tile, function () {
        var h = $(this).height();
        max_height = h > max_height ? h : max_height;
      });
      tile.height(max_height);
    }
  },
  mobileNavigation: function mobileNavigation() {
    $('nav').on('click', function (event) {
      $('.navbar-collapse').toggleClass("active");
      console.log('clicked');
    });
  },
  resizeIframe: function resizeIframe(iframe) {
    iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";
  },
  stitchLogin: function stitchLogin() {
    stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(Stitch.defaultAppClient.callFunction("AuthorTitle", ["todd"]).then(function (result) {
      console.log(result);
      $('.single-author .info .role').text(result['title']);
    }));
    /*const stitchClient = Stitch.initializeDefaultAppClient("hackers-uangn");
    $('#account').on('click', function(event) {
    event.preventDefault();
    return false;
    });
    $('.dropdown-menu .btn').on('click', function(event) {
    event.preventDefault();
    return false;
    });
    // Authenticate an application user based on the submitted information
    async function handleLogin() {
    const email = loginEmailEl.value;
    const password = loginPasswordEl.value;
    const credential = new UserPasswordCredential(email, password);
    	try {
    await stitchClient.auth.loginWithCredential(credential);
    const user = stitchClient.auth.user;
    showLoggedInState();
    displaySuccess(`Logged in as: ${user.profile.data.email}`)
    	} catch (e) {
    handleError(e)
    }
    }*/
  },
  tags: function tags() {
    var tags = {
      nodejs: '<i class="fab fa-node-js"></i>',
      aws: '<i class="fab fa-aws"></i>',
      python: '<i class="fab fa-python"></i>',
      django: '<i class="fab fa-python"></i>',
      nosql: '<i class="fab fa-envira"></i>',
      apis: '<i class="fab fa-hubspot"></i>',
      frontend: '<i class="far fa-code"></i>',
      data: '<i class="fas fa-chart-pie"></i>',
      mysql: '<i class="fas fa-database"></i>',
      javascript: '<i class="fab fa-js-square"></i>',
      roundup: '<i class="fas fa-undo-alt"></i>',
      excel: '<i class="fal fa-table"></i>',
      devops: '<i class="fas fa-server"></i>',
      pandas: '<i class="fas fa-database"></i>',
      datascience: '<i class="fas fa-flask"></i>',
      tableau: '<i class="far fa-asterisk"></i>',
      googlecloud: '<i class="fab fa-google"></i>',
      sql: '<i class="fas fa-database"></i>',
      statistics: '<i class="far fa-chart-bar"></i>',
      flask: '<i class="fab fa-affiliatetheme"></i>',
      expressjs: '<i class="fab fa-etsy"></i>',
      atlassian: '<i class="fab fa-trello"></i>',
      codesnippetcorner: '<i class="fal fa-laptop-code"></i>'
    };

    for (var key in tags) {
      $('.' + key).find('i').replaceWith(tags[key]);
    }
  },
  init: function init() {
    themeApp.featuredMedia();
    themeApp.sidebarConfig();
    themeApp.facebook();
    themeApp.highlighter();
    themeApp.backToTop();
    themeApp.adjustTileHeight();
    themeApp.mobileNavigation();
    themeApp.stitchLogin();
    themeApp.tags();
  }
  /*===========================
  2. Initialization
  ============= =============*/

};
$(document).ready(function () {
  themeApp.init();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsidGhlbWVBcHAiLCJmZWF0dXJlZE1lZGlhIiwiJCIsImVhY2giLCJ0aGlzZWxpbWVudCIsIm1lZGlhX3dyYXBwZXIiLCJmaW5kIiwibWVkaWFfY29udGVudF9pbWFnZSIsIm1lZGlhX2NvbnRlbnRfZW1iZWRlZCIsImxlbmd0aCIsImluc2VydEFmdGVyIiwid3JhcCIsImFkZENsYXNzIiwicmVtb3ZlIiwic2lkZWJhckNvbmZpZyIsInNpZGViYXJfbGVmdCIsImZhY2Vib29rIiwiZmJfcGFnZSIsImZhY2Vib29rX3BhZ2VfdXJsIiwiYXBwZW5kIiwiZ29vZ2xlUGx1cyIsImJhZGdlX3R5cGUiLCJnb29nbGVfcGx1c191cmwiLCJjb250YWluZXIiLCJ3aWR0aCIsImdvb2dsZV9wbHVzX2NvZGUiLCJoaWdobGlnaHRlciIsImkiLCJibG9jayIsImhsanMiLCJoaWdobGlnaHRCbG9jayIsImJhY2tUb1RvcCIsIndpbmRvdyIsInNjcm9sbCIsInNjcm9sbFRvcCIsImZhZGVJbiIsImZhZGVPdXQiLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImFuaW1hdGUiLCJhZGp1c3RUaWxlSGVpZ2h0IiwidGlsZSIsIm1heF9oZWlnaHQiLCJoIiwiaGVpZ2h0IiwibW9iaWxlTmF2aWdhdGlvbiIsImV2ZW50IiwidG9nZ2xlQ2xhc3MiLCJjb25zb2xlIiwibG9nIiwicmVzaXplSWZyYW1lIiwiaWZyYW1lIiwiY29udGVudFdpbmRvdyIsImRvY3VtZW50IiwiYm9keSIsInNjcm9sbEhlaWdodCIsInN0aXRjaExvZ2luIiwic3RpdGNoQ2xpZW50IiwiYXV0aCIsImxvZ2luV2l0aENyZWRlbnRpYWwiLCJBbm9ueW1vdXNDcmVkZW50aWFsIiwidGhlbiIsIlN0aXRjaCIsImRlZmF1bHRBcHBDbGllbnQiLCJjYWxsRnVuY3Rpb24iLCJyZXN1bHQiLCJ0ZXh0IiwidGFncyIsIm5vZGVqcyIsImF3cyIsInB5dGhvbiIsImRqYW5nbyIsIm5vc3FsIiwiYXBpcyIsImZyb250ZW5kIiwiZGF0YSIsIm15c3FsIiwiamF2YXNjcmlwdCIsInJvdW5kdXAiLCJleGNlbCIsImRldm9wcyIsInBhbmRhcyIsImRhdGFzY2llbmNlIiwidGFibGVhdSIsImdvb2dsZWNsb3VkIiwic3FsIiwic3RhdGlzdGljcyIsImZsYXNrIiwiZXhwcmVzc2pzIiwiYXRsYXNzaWFuIiwiY29kZXNuaXBwZXRjb3JuZXIiLCJrZXkiLCJyZXBsYWNlV2l0aCIsImluaXQiLCJyZWFkeSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7QUFNQTs7QUFFQTs7O0FBTUEsSUFBSUEsUUFBUSxHQUFHO0FBQ2RDLEVBQUFBLGFBQWEsRUFBRSx5QkFBVTtBQUN4QkMsSUFBQUEsQ0FBQyxDQUFDLE9BQUQsQ0FBRCxDQUFXQyxJQUFYLENBQWdCLFlBQVc7QUFDMUIsVUFBSUMsV0FBVyxHQUFHRixDQUFDLENBQUMsSUFBRCxDQUFuQjtBQUNBLFVBQUlHLGFBQWEsR0FBR0gsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRSSxJQUFSLENBQWEsVUFBYixDQUFwQjtBQUNBLFVBQUlDLG1CQUFtQixHQUFHRixhQUFhLENBQUNDLElBQWQsQ0FBbUJKLENBQUMsQ0FBQyxLQUFELENBQXBCLENBQTFCO0FBQ0EsVUFBSU0scUJBQXFCLEdBQUdILGFBQWEsQ0FBQ0MsSUFBZCxDQUFtQixRQUFuQixDQUE1Qjs7QUFDQSxVQUFJQyxtQkFBbUIsQ0FBQ0UsTUFBcEIsR0FBNkIsQ0FBakMsRUFBb0M7QUFDbkNQLFFBQUFBLENBQUMsQ0FBQ0ssbUJBQUQsQ0FBRCxDQUF1QkcsV0FBdkIsQ0FBbUNOLFdBQVcsQ0FBQ0UsSUFBWixDQUFpQixZQUFqQixDQUFuQyxFQUFtRUssSUFBbkUsQ0FBd0Usb0NBQXhFO0FBQ0FQLFFBQUFBLFdBQVcsQ0FBQ1EsUUFBWixDQUFxQixpQkFBckI7QUFDQVAsUUFBQUEsYUFBYSxDQUFDUSxNQUFkO0FBQ0EsT0FKRCxNQUtLLElBQUlMLHFCQUFxQixDQUFDQyxNQUF0QixHQUErQixDQUFuQyxF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dUJ1RixXQUF2QixDQUFvQ3pCLElBQUksQ0FBQ3dCLEdBQUQsQ0FBeEM7QUFDRDtBQUNGLEdBOUlhO0FBK0lkRSxFQUFBQSxJQUFJLEVBQUUsZ0JBQVc7QUFDaEI5RixJQUFBQSxRQUFRLENBQUNDLGFBQVQ7QUFDQUQsSUFBQUEsUUFBUSxDQUFDYyxhQUFUO0FBQ0FkLElBQUFBLFFBQVEsQ0FBQ2dCLFFBQVQ7QUFDQWhCLElBQUFBLFFBQVEsQ0FBQzBCLFdBQVQ7QUFDRTFCLElBQUFBLFFBQVEsQ0FBQytCLFNBQVQ7QUFDQS9CLElBQUFBLFFBQVEsQ0FBQ3lDLGdCQUFUO0FBQ0Z6QyxJQUFBQSxRQUFRLENBQUM4QyxnQkFBVDtBQUNBOUMsSUFBQUEsUUFBUSxDQUFDeUQsV0FBVDtBQUNBekQsSUFBQUEsUUFBUSxDQUFDb0UsSUFBVDtBQUNBO0FBR0Y7Ozs7QUE1SmUsQ0FBZjtBQStKQWxFLENBQUMsQ0FBQ29ELFFBQUQsQ0FBRCxDQUFZeUMsS0FBWixDQUFrQixZQUFVO0FBQzFCL0YsRUFBQUEsUUFBUSxDQUFDOEYsSUFBVDtBQUNELENBRkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICBUQUJMRSBPRiBDT05URU5UU1xyXG4gIDEuIGZ1bmN0aW9uIGRlY2xhcmV0aW9uXHJcbiAgMi4gSW5pdGlhbGl6YXRpb25cclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcblxyXG4vLyBpbXBvcnQgeyBTdGl0Y2gsIEFub255bW91c0NyZWRlbnRpYWwgfSBmcm9tICdtb25nb2RiLXN0aXRjaC1icm93c2VyLXNkaydcclxuXHJcbi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAxLiBmdW5jdGlvbiBkZWNsYXJldGlvblxyXG4gPT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG5cclxuXHJcblxyXG52YXIgdGhlbWVBcHAgPSB7XHJcblx0ZmVhdHVyZWRNZWRpYTogZnVuY3Rpb24oKXtcclxuXHRcdCQoXCIucG9zdFwiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgdGhpc2VsaW1lbnQgPSAkKHRoaXMpO1xyXG5cdFx0XHR2YXIgbWVkaWFfd3JhcHBlciA9ICQodGhpcykuZmluZCgnZmVhdHVyZWQnKTtcclxuXHRcdFx0dmFyIG1lZGlhX2NvbnRlbnRfaW1hZ2UgPSBtZWRpYV93cmFwcGVyLmZpbmQoJCgnaW1nJykpO1xyXG5cdFx0XHR2YXIgbWVkaWFfY29udGVudF9lbWJlZGVkID0gbWVkaWFfd3JhcHBlci5maW5kKCdpZnJhbWUnKTtcclxuXHRcdFx0aWYgKG1lZGlhX2NvbnRlbnRfaW1hZ2UubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdCQobWVkaWFfY29udGVudF9pbWFnZSkuaW5zZXJ0QWZ0ZXIodGhpc2VsaW1lbnQuZmluZCgnLnBvc3QtaGVhZCcpKS53cmFwKFwiPGRpdiBjbGFzcz0nZmVhdHVyZWQtbWVkaWEnPjwvZGl2PlwiKTtcclxuXHRcdFx0XHR0aGlzZWxpbWVudC5hZGRDbGFzcygncG9zdC10eXBlLWltYWdlJyk7XHJcblx0XHRcdFx0bWVkaWFfd3JhcHBlci5yZW1vdmUoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChtZWRpYV9jb250ZW50X2VtYmVkZWQubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdCQobWVkaWFfY29udGVudF9lbWJlZGVkKS5pbnNlcnRBZnRlcih0aGlzZWxpbWVudC5maW5kKCcucG9zdC1oZWFkJykpLndyYXAoXCI8ZGl2IGNsYXNzPSdmZWF0dXJlZC1tZWRpYSc+PC9kaXY+XCIpO1xyXG5cdFx0XHRcdHRoaXNlbGltZW50LmFkZENsYXNzKCdwb3N0LXR5cGUtZW1iZWRlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdHNpZGViYXJDb25maWc6ZnVuY3Rpb24oKSB7XHJcblx0XHRpZihzaWRlYmFyX2xlZnQgPT0gdHJ1ZSkge1xyXG5cdFx0XHQkKCcubWFpbi1jb250ZW50JykuYWRkQ2xhc3MoJ2NvbC1tZC1wdXNoLTQnKTtcclxuXHRcdFx0JCgnLnNpZGViYXInKS5hZGRDbGFzcygnY29sLW1kLXB1bGwtOCcpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0ZmFjZWJvb2s6ZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgZmJfcGFnZSA9ICc8aWZyYW1lIHNyYz1cIi8vd3d3LmZhY2Vib29rLmNvbS9wbHVnaW5zL2xpa2Vib3gucGhwP2hyZWY9JytmYWNlYm9va19wYWdlX3VybCsnJmFtcDt3aWR0aCZhbXA7aGVpZ2h0PTI1OCZhbXA7Y29sb3JzY2hlbWU9bGlnaHQmYW1wO3Nob3dfZmFjZXM9dHJ1ZSZhbXA7aGVhZGVyPWZhbHNlJmFtcDtzdHJlYW09ZmFsc2UmYW1wO3Nob3dfYm9yZGVyPWZhbHNlXCIgc2Nyb2xsaW5nPVwibm9cIiBmcmFtZWJvcmRlcj1cIjBcIiBzdHlsZT1cImJvcmRlcjpub25lOyBvdmVyZmxvdzpoaWRkZW47IGhlaWdodDoyNThweDsgd2lkdGg6MTAwJTtcIiBhbGxvd1RyYW5zcGFyZW5jeT1cInRydWVcIj48L2lmcmFtZT4nO1xyXG5cdFx0JCgnLmZiJykuYXBwZW5kKGZiX3BhZ2UpO1xyXG5cdH0sXHJcblx0Z29vZ2xlUGx1czpmdW5jdGlvbigpIHtcclxuXHRcdGlmKGJhZGdlX3R5cGUgIT09IFwiXCIgJiYgZ29vZ2xlX3BsdXNfdXJsICE9PSBcIlwiKSB7XHJcblx0XHRcdCQoJ2JvZHknKS5hcHBlbmQoJzxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9hcGlzLmdvb2dsZS5jb20vanMvcGxhdGZvcm0uanNcIiBhc3luYyBkZWZlcj48L3NjcmlwdD4nKTtcclxuXHRcdFx0dmFyIGNvbnRhaW5lciA9ICQoJy5nb29nbGUtcGx1cycpO1xyXG5cdFx0XHR2YXIgd2lkdGggPSBjb250YWluZXIud2lkdGgoKTtcclxuXHRcdFx0dmFyIGdvb2dsZV9wbHVzX2NvZGUgPSAnPGRpdiBjbGFzcz1cImctJytiYWRnZV90eXBlKydcIiBkYXRhLXdpZHRoPVwiJyt3aWR0aCsnXCIgZGF0YS1sYXlvdXQ9XCJsYW5kc2NhcGVcIiBkYXRhLWhlaWdodD1cIjE1MHB4XCIgZGF0YS1ocmVmPVwiJytnb29nbGVfcGx1c191cmwrJ1wiIGRhdGEtcmVsPVwicHVibGlzaGVyXCI+PC9kaXY+JztcclxuXHRcdFx0Y29udGFpbmVyLmFwcGVuZChnb29nbGVfcGx1c19jb2RlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGhpZ2hsaWdodGVyOiBmdW5jdGlvbigpIHtcclxuXHRcdCQoJ3ByZSBjb2RlJykuZWFjaChmdW5jdGlvbihpLCBibG9jaykge1xyXG5cdFx0ICAgIGhsanMuaGlnaGxpZ2h0QmxvY2soYmxvY2spO1xyXG5cdFx0ICB9KTtcclxuXHR9LFxyXG5cdGJhY2tUb1RvcDogZnVuY3Rpb24oKSB7XHJcblx0XHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMTAwKSB7XHJcblx0XHRcdFx0JCgnI2JhY2stdG8tdG9wJykuZmFkZUluKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCgnI2JhY2stdG8tdG9wJykuZmFkZU91dCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdCQoJyNiYWNrLXRvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3AgOiAwfSwxMDAwKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcbiAgICB9LFxyXG4gICAgYWRqdXN0VGlsZUhlaWdodDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHRpbGUgPSAkKCcuYXJjaGl2ZSAudGFnLXdyYXBwZXInKTtcclxuICAgICAgICB2YXIgbWF4X2hlaWdodCA9IDA7XHJcbiAgICAgICAgaWYodGlsZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICQuZWFjaCh0aWxlLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGggPSAkKHRoaXMpLmhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgbWF4X2hlaWdodCA9IGggPiBtYXhfaGVpZ2h0ID8gaCA6IG1heF9oZWlnaHQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aWxlLmhlaWdodChtYXhfaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cdFx0bW9iaWxlTmF2aWdhdGlvbjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoJ25hdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcclxuXHRcdFx0XHQkKCcubmF2YmFyLWNvbGxhcHNlJykudG9nZ2xlQ2xhc3MoIFwiYWN0aXZlXCIgKTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnY2xpY2tlZCcpO1xyXG5cdFx0XHR9KVxyXG5cdFx0fSxcclxuXHRcdHJlc2l6ZUlmcmFtZTogZnVuY3Rpb24oaWZyYW1lKSB7XHJcblx0ICAgIGlmcmFtZS5oZWlnaHQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCArIFwicHhcIjtcclxuXHQgIH0sXHJcblx0c3RpdGNoTG9naW46IGZ1bmN0aW9uKCkge1xyXG5cdFx0c3RpdGNoQ2xpZW50LmF1dGgubG9naW5XaXRoQ3JlZGVudGlhbChuZXcgQW5vbnltb3VzQ3JlZGVudGlhbCgpKS50aGVuKFxyXG5cdFx0XHRTdGl0Y2guZGVmYXVsdEFwcENsaWVudC5jYWxsRnVuY3Rpb24oXCJBdXRob3JUaXRsZVwiLCBbXCJ0b2RkXCJdKS50aGVuKHJlc3VsdCA9PiB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG5cdFx0XHRcdFx0JCgnLnNpbmdsZS1hdXRob3IgLmluZm8gLnJvbGUnKS50ZXh0KHJlc3VsdFsndGl0bGUnXSk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0KTtcclxuXHRcdFx0XHQvKmNvbnN0IHN0aXRjaENsaWVudCA9IFN0aXRjaC5pbml0aWFsaXplRGVmYXVsdEFwcENsaWVudChcImhhY2tlcnMtdWFuZ25cIik7XHJcblxyXG5cdFx0JCgnI2FjY291bnQnKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcuZHJvcGRvd24tbWVudSAuYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gQXV0aGVudGljYXRlIGFuIGFwcGxpY2F0aW9uIHVzZXIgYmFzZWQgb24gdGhlIHN1Ym1pdHRlZCBpbmZvcm1hdGlvblxyXG5cdFx0YXN5bmMgZnVuY3Rpb24gaGFuZGxlTG9naW4oKSB7XHJcblx0XHRcdGNvbnN0IGVtYWlsID0gbG9naW5FbWFpbEVsLnZhbHVlO1xyXG5cdFx0XHRjb25zdCBwYXNzd29yZCA9IGxvZ2luUGFzc3dvcmRFbC52YWx1ZTtcclxuXHRcdFx0Y29uc3QgY3JlZGVudGlhbCA9IG5ldyBVc2VyUGFzc3dvcmRDcmVkZW50aWFsKGVtYWlsLCBwYXNzd29yZCk7XHJcblxyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGF3YWl0IHN0aXRjaENsaWVudC5hdXRoLmxvZ2luV2l0aENyZWRlbnRpYWwoY3JlZGVudGlhbCk7XHJcblx0XHRcdFx0Y29uc3QgdXNlciA9IHN0aXRjaENsaWVudC5hdXRoLnVzZXI7XHJcblx0XHRcdFx0c2hvd0xvZ2dlZEluU3RhdGUoKTtcclxuXHRcdFx0XHRkaXNwbGF5U3VjY2VzcyhgTG9nZ2VkIGluIGFzOiAke3VzZXIucHJvZmlsZS5kYXRhLmVtYWlsfWApXHJcblxyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0aGFuZGxlRXJyb3IoZSlcclxuXHRcdFx0fVxyXG5cdFx0fSovXHJcblx0fSxcclxuXHR0YWdzOiBmdW5jdGlvbigpIHtcclxuXHRcdHZhciB0YWdzID0ge1xyXG5cdCAgICBub2RlanM6ICc8aSBjbGFzcz1cImZhYiBmYS1ub2RlLWpzXCI+PC9pPicsXHJcblx0ICAgIGF3czogJzxpIGNsYXNzPVwiZmFiIGZhLWF3c1wiPjwvaT4nLFxyXG5cdCAgICBweXRob246ICc8aSBjbGFzcz1cImZhYiBmYS1weXRob25cIj48L2k+JyxcclxuXHQgICAgZGphbmdvOiAnPGkgY2xhc3M9XCJmYWIgZmEtcHl0aG9uXCI+PC9pPicsXHJcblx0ICAgIG5vc3FsOiAnPGkgY2xhc3M9XCJmYWIgZmEtZW52aXJhXCI+PC9pPicsXHJcblx0ICAgIGFwaXM6ICc8aSBjbGFzcz1cImZhYiBmYS1odWJzcG90XCI+PC9pPicsXHJcblx0ICAgIGZyb250ZW5kOiAnPGkgY2xhc3M9XCJmYXIgZmEtY29kZVwiPjwvaT4nLFxyXG5cdCAgICBkYXRhOiAnPGkgY2xhc3M9XCJmYXMgZmEtY2hhcnQtcGllXCI+PC9pPicsXHJcblx0ICAgIG15c3FsOiAnPGkgY2xhc3M9XCJmYXMgZmEtZGF0YWJhc2VcIj48L2k+JyxcclxuXHQgICAgamF2YXNjcmlwdDogJzxpIGNsYXNzPVwiZmFiIGZhLWpzLXNxdWFyZVwiPjwvaT4nLFxyXG5cdCAgICByb3VuZHVwOiAnPGkgY2xhc3M9XCJmYXMgZmEtdW5kby1hbHRcIj48L2k+JyxcclxuXHQgICAgZXhjZWw6ICc8aSBjbGFzcz1cImZhbCBmYS10YWJsZVwiPjwvaT4nLFxyXG5cdCAgICBkZXZvcHM6ICc8aSBjbGFzcz1cImZhcyBmYS1zZXJ2ZXJcIj48L2k+JyxcclxuXHQgICAgcGFuZGFzOiAnPGkgY2xhc3M9XCJmYXMgZmEtZGF0YWJhc2VcIj48L2k+JyxcclxuXHQgICAgZGF0YXNjaWVuY2U6ICc8aSBjbGFzcz1cImZhcyBmYS1mbGFza1wiPjwvaT4nLFxyXG5cdCAgICB0YWJsZWF1OiAnPGkgY2xhc3M9XCJmYXIgZmEtYXN0ZXJpc2tcIj48L2k+JyxcclxuXHQgICAgZ29vZ2xlY2xvdWQ6ICc8aSBjbGFzcz1cImZhYiBmYS1nb29nbGVcIj48L2k+JyxcclxuXHQgICAgc3FsOiAnPGkgY2xhc3M9XCJmYXMgZmEtZGF0YWJhc2VcIj48L2k+JyxcclxuXHQgICAgc3RhdGlzdGljczogJzxpIGNsYXNzPVwiZmFyIGZhLWNoYXJ0LWJhclwiPjwvaT4nLFxyXG5cdCAgICBmbGFzazogJzxpIGNsYXNzPVwiZmFiIGZhLWFmZmlsaWF0ZXRoZW1lXCI+PC9pPicsXHJcblx0ICAgIGV4cHJlc3NqczogJzxpIGNsYXNzPVwiZmFiIGZhLWV0c3lcIj48L2k+JyxcclxuXHQgICAgYXRsYXNzaWFuOiAnPGkgY2xhc3M9XCJmYWIgZmEtdHJlbGxvXCI+PC9pPicsXHJcblx0ICAgIGNvZGVzbmlwcGV0Y29ybmVyOiAnPGkgY2xhc3M9XCJmYWwgZmEtbGFwdG9wLWNvZGVcIj48L2k+J1xyXG5cdCAgfTtcclxuXHJcblx0ICBmb3IgKHZhciBrZXkgaW4gdGFncykge1xyXG5cdCAgICAkKCcuJyArIGtleSkuZmluZCgnaScpLnJlcGxhY2VXaXRoKCB0YWdzW2tleV0gKTtcclxuXHQgIH1cclxuXHR9LFxyXG5cdGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhlbWVBcHAuZmVhdHVyZWRNZWRpYSgpO1xyXG5cdFx0dGhlbWVBcHAuc2lkZWJhckNvbmZpZygpO1xyXG5cdFx0dGhlbWVBcHAuZmFjZWJvb2soKTtcclxuXHRcdHRoZW1lQXBwLmhpZ2hsaWdodGVyKCk7XHJcbiAgICB0aGVtZUFwcC5iYWNrVG9Ub3AoKTtcclxuICAgIHRoZW1lQXBwLmFkanVzdFRpbGVIZWlnaHQoKTtcclxuXHRcdHRoZW1lQXBwLm1vYmlsZU5hdmlnYXRpb24oKTtcclxuXHRcdHRoZW1lQXBwLnN0aXRjaExvZ2luKCk7XHJcblx0XHR0aGVtZUFwcC50YWdzKCk7XHJcblx0fVxyXG59XHJcblxyXG4vKj09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4yLiBJbml0aWFsaXphdGlvblxyXG49PT09PT09PT09PT09ID09PT09PT09PT09PT0qL1xyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gIHRoZW1lQXBwLmluaXQoKTtcclxufSk7XHJcbiJdLCJmaWxlIjoibWFpbi5qcyJ9
