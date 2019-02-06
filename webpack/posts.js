import '../src/less/posts.less';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import shell from 'highlight.js/lib/languages/shell';
import sql from 'highlight.js/lib/languages/sql';
import json from 'highlight.js/lib/languages/json';
import ini from 'highlight.js/lib/languages/ini';
import yaml from 'highlight.js/lib/languages/yaml';
import handlebars from 'highlight.js/lib/languages/handlebars';
import less from 'highlight.js/lib/languages/less';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';
import lightbox from 'lightbox2'
import ScrollBooster from 'scrollbooster'

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('json', json);
hljs.registerLanguage('ini', ini);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('handlebars', handlebars);
hljs.registerLanguage('less', less);
hljs.initHighlightingOnLoad();

var postFunctions = {
  codeHighlight: function() {
    hljs.configure({
      tabReplace: '  ', // 2 spaces
      classPrefix: '', // don't append class prefix
    });
    hljs.initHighlightingOnLoad();
  },
  codeSnippetFullScreen: function() {
    $('.post-content pre').each(function() {
      if ($(this).height() >= 400) {
        $(this).append('<div class="fullscreenbtn"><i style="transform: rotate(45deg);" class="far fa-arrows-alt-v"></i></div>');
        $(this).append('<div class="codeoverflow"></div>');
      }
    });
    $('.fullscreenbtn').on('click', function(event) {
      var height = $(window).height();
      var preContainer = $(this).closest('pre');
      var codeContainer = preContainer.find('code');
      preContainer.css('max-height', 'none');
      preContainer.css('padding', '64px 20px !important');
      preContainer.css('border-radius', '0');
      preContainer.addClass('fullWidth');
      preContainer.find('.codeoverflow').remove();
      $(this).css('opacity', 0);
      /*preContainer.animate({
          height: $(codeContainer).height() + 30
        }, 1000);*/
      $('html,body').animate({scrollTop: preContainer.position().top});
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
      }
    });
  },
  enableLightbox: function() {
    $('.post-content img').each(function(obj){
      var imagesrc = $(this).attr('src');
      var caption = $(this).closest('figure').find('figcaption').text();
      $(this).wrap('<a href="' + imagesrc + '" data-lightbox="' + caption + '"></a>');
    });
  },
  addImageAltTags: function() {
    $('.post-content img').each(function(obj){
      var caption = $(this).closest('figure').find('figcaption').text();
      $(this).attr('alt', caption);
    });
  },
  postInit: function() {
    postFunctions.codeHighlight();
    postFunctions.codeSnippetFullScreen();
    postFunctions.scrollableTables();
    postFunctions.enableLightbox();
    postFunctions.addImageAltTags();
  }
}

$(document).ready(function() {
  postFunctions.postInit();
});
