/*====================================================
  TABLE OF CONTENTS
  1. function declaretion
  2. Initialization
====================================================*/

/*===========================
 1. function declaretion
 ==========================*/

var themeApp = {
  featuredMedia: function() {
    $(".post").each(function() {
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
  sidebarConfig: function() {
    if (sidebar_left == true) {
      $('.main-content').addClass('col-md-push-4');
      $('.sidebar').addClass('col-md-pull-8');
    }
  },
  facebook: function() {
    var fb_page = '<iframe src="//www.facebook.com/plugins/likebox.php?href=' + facebook_page_url + '&amp;width&amp;height=258&amp;colorscheme=light&amp;show_faces=true&amp;header=false&amp;stream=false&amp;show_border=false" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:258px; width:100%;" allowTransparency="true"></iframe>';
    $('.fb').append(fb_page);
  },
  googlePlus: function() {
    if (badge_type !== "" && google_plus_url !== "") {
      $('body').append('<script src="https://apis.google.com/js/platform.js" async defer></script>');
      var container = $('.google-plus');
      var width = container.width();
      var google_plus_code = '<div class="g-' + badge_type + '" data-width="' + width + '" data-layout="landscape" data-height="150px" data-href="' + google_plus_url + '" data-rel="publisher"></div>';
      container.append(google_plus_code);
    }
  },
  backToTop: function() {
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('#back-to-top').fadeIn();
      } else {
        $('#back-to-top').fadeOut();
      }
    });
    $('#back-to-top').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 1000);
      return false;
    });
  },
  mobileNavigation: function() {
    $('nav').on('click', function(event) {
      $('.navbar-collapse').toggleClass("active");
    });
  },
  resizeIframe: function(iframe) {
    iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";
  },
  fullScreen: function() {
    $('.post-template article .post-content img').each(function(item) {
      var alt = $(this).closest('figure').find('figcaption').text();
      var src = $(this).attr('src');
      $(this).attr('data-lightbox', alt);
      $(this).wrap('<a href="' + src + '" data-lightbox="' + alt + '"></div>');
    });
    var window_height = $(window).height();
    var window_portion = window_height * 0.2;
    lightbox.option({
      'resizeDuration': 100,
      'wrapAround': true,
      'positionFromTop': window_height / 2 - window_portion
    });
    $('article pre').each(function() {
      if ($(this).height() >= 400) {
        $(this).append('<div class="fullscreenbtn"><i style="transform: rotate(45deg);" class="far fa-arrows-alt-v"></i></div>');
      }
    });
    $('.fullscreenbtn').on('click', function(event) {
      var height = $(window).height();
      var codeContainer = $(this).closest('pre');
      codeContainer.css('max-height', 'none');
      codeContainer.css('padding', '64px 20px !important');
      $(this).closest('pre').find('.codeoverflow').css('opacity', '0');
      $(this).css('opacity', 0);
      codeContainer.animate({
        //height: $(window).height()
      }, 1000);
      $('html,body').animate({
        scrollTop: codeContainer.position().top + 100
      });
    });
  },
  codeHighlight: function() {
    hljs.configure({
      tabReplace: '  ', // 2 spaces
      classPrefix: '', // don't append class prefix
    });
    //hljs.initHighlightingOnLoad();
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
      if ($(this).height() >= 400) {
        var color = $(this).css('background');
        $(this).parent().append('<div class="codeoverflow" style=""></div>');
      }
    });
  },

  displayCommentsOnLoad: function() {
    /*client.auth
      .loginWithCredential(new stitch.AnonymousCredential())
      .then(displayComments)
      .catch(console.error);

    db.collection("comments")
      .find({}, {
        limit: 1000
      })
      .asArray()
      .then(docs => docs.map(doc => `<div>${doc.comment}</div>`))
      .then(comments => document.getElementById("comments").innerHTML = comments);
      */
  },
  addComment: function() {
    const newComment = document.getElementById("new_comment");
    console.log("add comment", client.auth.user.id);
    db.collection("comments")
      .insertOne({
        owner_id: client.auth.user.id,
        comment: newComment.value
      })
      .then(displayComments);
    newComment.value = "";
  },
  postLinkPreviews: function() {
    if ($('article').hasClass('tag-roundup')) {
      $(".post-content > p > a").each(function(index, element) {
        $.ajax({
          url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/hackers-uangn/service/get_link_preview/incoming_webhook/get_link_preview',
          async: true,
          contentType: "application/json",
          data: {
            url: $(this).attr('href'),
          },
          dataType: 'json',
          success: function(result) {
            $(element).after('<a href="' + result.url + '"><div class="link-preview">' + result.image + '<div class="link-info"><h4>' + result.title + '</h4><p>' + result.description + '</p><span class="url-info"><i class="far fa-link"></i>' + result.url.split('://')[1] + '</span></div></div></a>');
            $(element).remove();
          }
        });
      });
    }
  },
  scrollableTables: function() {
    $( ".post-content table" ).each(function() {
      $( this ).parent('div').addClass('tableContainer');

      let viewport = document.querySelector('.tableContainer');
      let content = viewport.querySelector('tbody');


      let sb = new ScrollBooster({
        viewport, // this parameter is required
        content, // scrollable element
        mode: 'x', // scroll only in horizontal dimension
        bounce: true,
        onUpdate: (data) => {
          // your scroll logic goes here
          content.style.transform = `translateX(${-data.position.x}px)`;
        }
      });
    });
  },
  tags: function(){
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
      statistics: '<i class="far fa-chart-area"></i>',
      flask: '<i class="fab fa-affiliatetheme"></i>',
      expressjs: '<i class="fab fa-etsy"></i>',
      atlassian: '<i class="fab fa-trello"></i>',
      codesnippetcorner: '<i class="fal fa-laptop-code"></i>',
      saas: '<i class="fal fa-desktop-alt"></i>',
      datavis: '<i class="fal fa-chart-pie"></i>',
      plotly: '<i class="fas fa-chart-bar"></i>'
    };

    for (var key in tags) {
      $('.' + key).find('i').replaceWith( tags[key] );
    }
  },
  githubrepo: function(){
    $('[data-github]').each(function () {
    var _this = this;
    var repo = $(_this).data('github');

    fetch('https://api.github.com/repos/' + repo).then(function (response) {
      return response.json();
    }).then(function (response) {
      $(_this).find('[data-forks]').text(response.forks);
      $(_this).find('[data-stars]').text(response.stargazers_count);
    });
  });
  },
  retina: function() {
    // Order matters!!
    $('.post.tag-retina img').attr('data-rjs', 2);
    $('.post.tag-retina-hd img').attr('data-rjs', 3);
    $('.post.tag-retina-4k img').attr('data-rjs', 4);
  },
  init: function() {
    themeApp.featuredMedia();
    themeApp.sidebarConfig();
    themeApp.facebook();
    themeApp.backToTop();
    // themeApp.adjustTileHeight();
    themeApp.mobileNavigation();
    themeApp.retina();
    themeApp.tags();

    if ($('body').hasClass('post-template')) {
      themeApp.codeHighlight();
      themeApp.postLinkPreviews();
      themeApp.fullScreen();
      themeApp.scrollableTables();
    }
  }
};

/*===========================
2. Initialization
============= =============*/
$(document).ready(function() {
  themeApp.init();
});
