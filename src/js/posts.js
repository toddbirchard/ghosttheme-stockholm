require('es6-promise').polyfill();
import '../less/posts.less';

// Import hljs
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
import nginx from 'highlight.js/lib/languages/nginx';
import hljs from 'highlight.js/lib/highlight';

// Additional imports
import ScrollBooster from 'scrollbooster';
import baguetteBox from 'baguettebox.js';
const fetch = require('isomorphic-fetch');

// Register highlight.js languages
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
hljs.registerLanguage('nginx', nginx);

hljs.initHighlightingOnLoad();

function code_snippet_full_screen() {
  $('main > pre').each(function() {
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
    $('html,body').animate({scrollTop: preContainer.position().top});
  });
}

function mergedTableCells() {
  $('table').find('th').each(function() {
    if ($(this).attr('rowspan')) {
      $(this).css('border-bottom', '2px solid #f6f8fe');
    }
  });
}

function scrollable_tables() {
  let tables = document.getElementsByClassName('tableContainer');
  for (let table of tables) {
    let content = table.querySelector('table');
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
    const table = $(element).find('table');
    const tablewidth = table.width();
    if ($(element).width() < tablewidth) {
      $(element).find('table').addClass('handscroller');
      $(element).append('<div class="tablefade"></div>');
    }
  });
}

function enable_baguettebox() {
  $('main img').each(function(obj, i) {
    const imagesrc = $(this).attr('src');
    const caption = $(this).closest('figure').find('figcaption').text();
    $(this).wrap('<a href="' + imagesrc + '" data-caption="' + caption + '"></a>');
  });
  baguetteBox.run('.post-content', {
    captions: function(element) {
      return element.getElementsByTagName('img')[0].alt;
    },
    animation: 'fadeIn',
    noScrollbars: true
  });
}

function add_image_alt_tags() {
  $('main img').each(function() {
    const caption = $(this).closest('figure').find('figcaption').text();
    $(this).attr('alt', caption);
  });
}

function current_page() {
  const sPath = String(document.location.pathname);
  const slug = sPath.split('/')[1];
  return slug;
}

function create_nextprev_widget(posts) {
  var numposts = posts.length;
  var post_slug = postFunctions.current_page();
  var index = posts.findIndex(function(item, i) {
    return item.slug === post_slug;
  });
  index = index++;
  if (index + 1 < numposts) {
    var prev = posts[index + 1];
    $('.prev-article').css('visibility', 'visible');
    $('.prev-article').find('h6').html(prev['title']);
    $('.prev-article').find('p').html(prev['custom_excerpt']);
    $('.prev-article').attr('href', prev['url']);
  }
  if (index > 0) {
    var next = posts[index - 1];
    $('.next-article').css('visibility', 'visible');
    $('.next-article').find('h6').html(next['title']);
    $('.next-article').find('p').html(next['custom_excerpt']);
    $('.next-article').attr('href', next['url']);
  }
}

function populate_series_list(post) {
  $('#seriesposts h5').html(post['seriesname'].replace('#', ''));
  $('#seriesposts ol').append('<li class="' + post['slug'] + '"><a href="' + post['url'] + '">' + post['title'] + '</a></li>');
  $('#seriesposts').css('display', 'block');
  $('.nextprev-container').css('display', 'block');
}

function posts_in_series(series, series_name) {
  const series_endpoint = 'https://hackersandslackers.com/ghost/api/v2/content/posts/?key=bc6a59fe37ee67d9fbb93ea03b&filter=tag:' + series + '&order_by=created_at.asc'
  const headers = {
    "Content-Type": "application/json"
  };
  fetch(series_endpoint, {
    method: 'GET',
    headers: headers
  }).then((res) => {
    return res.json()
  }).then((json) => {
    if (json['posts']) {
      const posts = json['posts'];
      var i;
      for (i = 0; i < posts.length; i++) {
        const post = posts[i];
        const title = post['title'];
        const url = 'https://hackersandslackers.com/' + post['slug'];
        const slug = post['slug'];
        const created = post['created_at'];
        const numposts = posts.length;
        const post_dict = {
          'seriesname': series_name,
          'title': title,
          'url': url,
          'created': created,
          'slug': slug,
          'numposts': numposts
        };
        postFunctions.populate_series_list(post_dict);
      }
      postFunctions.create_nextprev_widget(posts);
      const post_slug = postFunctions.current_page();
      $('.' + post_slug).addClass('currentPost');
      $('#seriesposts ol').attr('style', 'counter-reset:li ' + (
      posts.length + 1));
    }
  });
}

function tag_loop(tags) {
  var i;
  for (i = 0; i < tags.length; i++) {
    const tag = tags[i];
    if (tag['visibility'] == "internal") {
      const series = tag['slug'];
      const series_name = tag['meta_title'];
      postFunctions.posts_in_series(series, series_name);
    }
  }
}

function detect_series() {
  const post_slug = postFunctions.current_page();
  const endpoint = 'https://hackersandslackers.com/ghost/api/v2/content/posts/slug/' + post_slug + '?key=bc6a59fe37ee67d9fbb93ea03b&include=tags';
  const headers = {
    "Content-Type": "application/json"
  };
  fetch(endpoint, {
    method: "GET",
    headers: headers
  }).then((res) => {
    return res.json()
  }).then((json) => {
    postFunctions.tag_loop(json['posts'][0]['tags']);
  }).catch(err => {
    console.log(err.response.errors); // API response errors
    console.log(err.response.data); // Response data if available
  });
}

function reduce_indents() {
  $('.language-python').text(function() {
    return $(this).text().replace("    ", "  ");
  });
  $('.language-json').text(function() {
    return $(this).text().replace("    ", "  ");
  })
  $('.language-javascript').text(function() {
    return $(this).text().replace("    ", "  ");
  })
}

$(document).ready(function() {
  code_snippet_full_screen();
  scrollable_tables();
  enable_baguettebox();
  add_image_alt_tags();
  detect_series();
});
