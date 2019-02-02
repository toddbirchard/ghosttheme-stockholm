import '../src/less/posts.less';
import lightbox from 'lightbox2'
import ScrollBooster from 'scrollbooster'

$(document).ready(function() {
  var postFunctions = {
    codeHighlight: function() {
      hljs.configure({
        tabReplace: '  ', // 2 spaces
        classPrefix: '', // don't append class prefix
      });
      hljs.initHighlightingOnLoad();
    },
    fullScreen: function(){
      $('.post-content pre').each(function () {
        if ($(this).height() >= 400) {
          $(this).append('<div class="fullscreenbtn"><i style="transform: rotate(45deg);" class="far fa-arrows-alt-v"></i></div>');
          $(this).append('<div class="codeoverflow"></div>');
        }
      });
      $('.fullscreenbtn').on('click', function (event) {
        var height = $(window).height();
        var preContainer = $(this).closest('pre');
        var codeContainer = preContainer.find('code');
        preContainer.css('max-height', 'none');
        preContainer.css('padding', '64px 20px !important');
        preContainer.css('border-radius', '0');
        preContainer.addClass('fullWidth');
        $(this).css('opacity', 0);
        preContainer.animate({
          height: $(codeContainer).height() + 10
        }, 1000);
        $('html,body').animate({
          scrollTop: preContainer.position().top
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
    scrollableTables: function() {
      let tables = document.getElementsByClassName('tableContainer');
      for (let table of tables) {
        let content = table.querySelector('tbody');
        let sb = new ScrollBooster({
          viewport: table,
          content: content,
          handle: content,
          emulateScroll: false,
          mode: 'x',
          bounce: true,
          bounceForce: .1,
          onUpdate: (data) => {
            // your scroll logic goes here
            content.style.transform = `translateX(${ - data.position.x}px)`
          }
        });
      }
      $(".tableContainer").each(function(index) {
        var table = $(this).find('table')
        var tablewidth = table.width()
        if ($(this).width() < tablewidth) {
          $(this).find('table').addClass('handscroller');
          $(this).append('<div class="codeoverflow"></div>')
        }
      });
    }
  }

  postFunctions.codeHighlight();
  //themeApp.postLinkPreviews();
  postFunctions.fullScreen();
  postFunctions.scrollableTables();
});
