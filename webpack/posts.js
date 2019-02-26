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
import lightbox from 'lightbox2';
import nord from 'nord-highlightjs';
import ScrollBooster from 'scrollbooster';
const fetch = require('node-fetch');

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
    $('.post-content > pre').each(function() {
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
    $(".tableContainer").each(function(index, element) {
      var table = $(element).find('table');
      var tablewidth = table.width();
      if ($(element).width() < tablewidth) {
        $(element).find('table').addClass('handscroller');
        $(element).append('<div class="tablefade"></div>');
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
  current_page: function() {
    var sPath = String(document.location.pathname);
    var slug = sPath.split('/')[1];
    return slug;
  },
  create_nextprev_widget: function(posts) {
    var numposts = posts.length;
    var postslug = postFunctions.current_page();
    var index = posts.findIndex(function(item, i){
      return item.slug === postslug
    });
    $('.nextprev').css('dispay', 'flex');
    if (index < numposts) {
      var prev = posts[index+1];
      $('.prev-article').css('visibility', 'visible');
      $('.prev-article').find('h6').html(prev['title']);
      $('.prev-article').find('p').html(prev['custom_excerpt']);
      $('.prev-article').attr('href', prev['url']);
    }
    if  (index > 0) {
      var next = posts[index-1];
      $('.next-article').css('visibility', 'visible');
      $('.next-article').find('h6').html(next['title']);
      $('.next-article').find('p').html(next['custom_excerpt']);
      $('.next-article').attr('href', next['url']);
    }
  },
  populate_series_list: function(post) {
    $('#seriesposts h5').html(post['seriesname'].replace('#', ''));
    $('#seriesposts ol').append('<li class="' + post['slug'] + '"><a href="' + post['url'] + '">' + post['title'] + '</a></li>');
    $('#seriesposts').css('display', 'block');
    $('.nextprev-container').css('display', 'block');
    $('.post-footer').css('padding-bottom', '100px');
  },
  posts_in_series: function(series, seriesname) {
    var series_endpoint = 'https://hackersandslackers.com/ghost/api/v2/content/posts/?key=bc6a59fe37ee67d9fbb93ea03b&filter=tag:' + series + '&order_by=created_at.asc'
    var headers = {
      "Content-Type": "application/json"
    }
    fetch(series_endpoint, {
      method: 'GET',
      headers: headers
    }).then((res) => {
      return res.json()
    }).then((json) => {
      var posts = json['posts'];
      var i;
      for (i = 0; i < posts.length; i++) {
        var post = posts[i];
        var title = post['title'];
        var url = 'https://hackersandslackers.com/' + post['slug'];
        var slug = post['slug'];
        var created = post['created_at'];
        var numposts = posts.length;
        var post_dict = {
          'seriesname': seriesname,
          'title': title,
          'url': url,
          'created': created,
          'slug': slug,
          'numposts': numposts
        }
        postFunctions.populate_series_list(post_dict);
      }
      postFunctions.create_nextprev_widget(posts);
      var postslug = postFunctions.current_page();
      $('.' + postslug).addClass('currentPost');
      $('#seriesposts ol').attr('style', 'counter-reset:li ' + (posts.length + 1));
    });
  },
  tag_loop: function(tags) {
    var i;
    for (i = 0; i < tags.length; i++) {
      var tag = tags[i];
      if (tag['visibility'] == "internal") {
        var series = tag['slug'];
        var seriesname = tag['meta_title'];
        postFunctions.posts_in_series(series, seriesname);
      }
    }
  },
  detect_series: function() {
    var postslug = postFunctions.current_page();
    var endpoint = 'https://hackersandslackers.com/ghost/api/v2/content/posts/slug/' + postslug + '?key=bc6a59fe37ee67d9fbb93ea03b&include=tags';
    var headers = {
      "Content-Type": "application/json"
    }
    fetch(endpoint, {
      method: "GET",
      headers: headers
    }).then((res) => {
      return res.json()
    }).then((json) => {
      postFunctions.tag_loop(json['posts'][0]['tags']);
    });
  },
  postInit: function() {
    postFunctions.codeHighlight();
    postFunctions.codeSnippetFullScreen();
    postFunctions.scrollableTables();
    postFunctions.enableLightbox();
    postFunctions.addImageAltTags();
    postFunctions.detect_series();
  }
}

$(document).ready(function() {
  postFunctions.postInit();
});
