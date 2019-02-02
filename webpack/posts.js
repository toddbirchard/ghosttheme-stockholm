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
        }
      });
      $('.fullscreenbtn').on('click', function (event) {
        var height = $(window).height();
        var codeContainer = $(this).closest('pre');
        codeContainer.css('max-height', 'none');
        codeContainer.css('padding', '64px 20px !important');
        codeContainer.css('margin-right', 'calc(-50vw + 50%) !important;');
        codeContainer.css('margin-left', 'calc(-50vw + 50%) !important;');
        $(this).css('opacity', 0);
        codeContainer.animate({
          height: $(window).height()
        }, 1000);
        $('html,body').animate({
          scrollTop: codeContainer.position().top
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
        let scrollEl = table.querySelector('tbody');
        let scr = new ScrollBooster({
          viewport: table,
          emulateScroll: false,
          mode: 'x',
          bounce: true,
          bounceForce: .1,
          onUpdate: (data) => {
            // your scroll logic goes here
            scrollEl.style.transform = `translateX(${ - data.position.x}px)`
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
    }
  }

  postFunctions.codeHighlight();
  //themeApp.postLinkPreviews();
  postFunctions.fullScreen();
  postFunctions.scrollableTables();
});
