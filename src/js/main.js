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
  resizeIframe: function(iframe) {
    iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";
  },
  fullScreen: function() {
    $('.post-template article .post-content img').each(function(item) {
      var alt = $(this).parent().parent().find('figcaption').text();
      var src = $(this).attr('src');
      $(this).attr('data-lightbox', alt);
      $(this).wrap('<a href="' + src + '" data-lightbox="' + alt + '"></div>');
        $(this).on('click', function(){
          var window_height = $(window).height();
          var window_portion = window_height * 0.2;
          lightbox.option({
            'resizeDuration': 300,
            'positionFromTop': window_height / 2 - window_portion,
            'disableScrolling': false,
            'fitImagesInViewport': true
          });
        });
    });
  },
  codeHighlight: function() {
    $('article pre').each(function() {
      if ($(this).height() >= 400) {
        $(this).append('<div class="fullscreenbtn"><i style="transform: rotate(45deg);" class="far fa-arrows-alt-v"></i></div>');
      }
    });
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

    $('.fullscreenbtn').on('click', function(event) {
      var height = $(window).height();
      var codeContainer = $(this).closest('pre');
      codeContainer.css('max-height', 'none');
      codeContainer.css('padding', '64px 20px !important');
      codeContainer.css('margin-right', 'calc(-50vw + 50%) !important;');
      codeContainer.css('margin-left', 'calc(-50vw + 50%) !important;');

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
  scrollableTables: function() {
    let tables = document.getElementsByClassName('tableContainer');
    for (let table of tables) {
        let scrollEl = table.querySelector('tbody');
        let scr = new ScrollBooster({
          viewport: table,
          emulateScroll: false,
          mode: 'x',
          bounce: true,
          bounceForce: .1,
          onUpdate: (data)=> {
            // your scroll logic goes here
            scrollEl.style.transform = `translateX(${-data.position.x}px)`
          }
        });
    }
    $(".tableContainer").each(function(index) {
      var table = $(this).find('table')
      var tablewidth = table.width()
      if ($(this).width() < tablewidth) {
        $(this).find('table').addClass('handscroller');
        $(this).append('<div class="tablefade"></div>')
      }
    });

  },
  tags: function() {
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
      pandas: '<i class="fas fa-paw-alt"></i>',
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
      plotly: '<i class="fas fa-chart-bar"></i>',
      saas: '<i class="fal fa-laptop-code"></i>',
      postgres: '<i class="fas fa-elephant"></i>',
      bigdata: '<i class="far fa-chart-network"></i>'
    };

    for (var key in tags) {
      $('.' + key).find('i').replaceWith(tags[key]);
    }
  },
  githubrepo: function() {
    $('[data-github]').each(function() {
      var _this = this;
      var repo = $(_this).data('github');

      fetch('https://api.github.com/repos/' + repo).then(function(response) {
        return response.json();
      }).then(function(response) {
        $(_this).find('[data-forks]').text(response.forks);
        $(_this).find('[data-stars]').text(response.stargazers_count);
      });
    });
  },
  mergedTableCells: function() {
    if ($('body').hasClass('post-template') == true) {
      var rows = $('table').find('th').each(function() {
        if ($(this).attr('rowspan')) {
          $(this).css('border-bottom', '2px solid #f6f8fe');
        }
      });
    }
  },
  retina: function() {
    // Order matters!!
    $('.post.tag-retina img').attr('data-rjs', 2);
    $('.post.tag-retina-hd img').attr('data-rjs', 3);
    $('.post.tag-retina-4k img').attr('data-rjs', 4);
  },
  init: function() {
    themeApp.featuredMedia();
    themeApp.retina();
    themeApp.tags();

    if ($('body').hasClass('post-template')) {
      themeApp.codeHighlight();
      //themeApp.postLinkPreviews();
      themeApp.fullScreen();
      themeApp.scrollableTables();
    }
  }
};

/* ===========================
2. Initialization
=========================== */
$(document).ready(function() {
  themeApp.init();
});
