// Styles
import '../less/posts.less';

// Dependencies
require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');

// Imported Functions
import { postLinkPreviews } from './posts/previews.js';
import { scrollable_tables } from './posts/scrolltables.js';
import { enable_baguettebox } from './posts/baguette.js';
import { code_snippet_full_screen } from './posts/coderesize.js';
//import { hljs_init } from './posts/hljsinit.js';

/*function mergedTableCells() {
  $('table').find('th').each(function() {
    if ($(this).attr('rowspan')) {
      $(this).css('border-bottom', '2px solid #f6f8fe');
    }
  });
}*/

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
  var post_slug = current_page();
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
        populate_series_list(post_dict);
      }
      create_nextprev_widget(posts);
      const post_slug = current_page();
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
      posts_in_series(series, series_name);
    }
  }
}

function detect_series() {
  const post_slug = current_page();
  const endpoint = 'https://hackersandslackers.com/ghost/api/v2/content/posts/slug/' + post_slug + '?key=bc6a59fe37ee67d9fbb93ea03b&include=tags';
  const headers = {
    "Content-Type": "application/json"
  };
  fetch(endpoint, {
    method: "GET",
    headers: headers
  }).then((json) => {
    tag_loop(json['posts'][0]['tags']);
  }).catch(err => {
    console.log(err.response.errors); // API response errors
    console.log(err.response.data); // Response data if available
  });
}

$(document).ready(function() {
  code_snippet_full_screen();
  scrollable_tables();
  enable_baguettebox();
  add_image_alt_tags();
  detect_series();
  postLinkPreviews();
  //hljs_init();
});
