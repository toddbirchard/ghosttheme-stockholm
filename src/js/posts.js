// Dependencies
import '../less/posts.less';
import ScrollBooster from 'scrollbooster';
//import { post_link_previews } from './posts/previews.js';
import { scrollable_tables, scrollable_code } from './posts/scrollcards.js';
import { enable_baguettebox } from './posts/baguette.js';
import { code_snippet_full_screen } from './posts/coderesize.js';

// Functions
// -------------------------------------------

function remove_images() {
  $('img').each(function() {
    if ($(this).attr('src') == 'null') {
      $(this).parent().remove();
    }
  });
}

function post_link_previews() {
  var current_page = window.location.href;
  const endpoint_base_url = process.env.LINKPREVIEW_URL;
  const auth_key = process.env.LINKPREVIEW_KEY;
  if (current_page.includes("lynx")) {
    $("main > p > a").each(function(index, element) {
      var link = $(this).text();
      const endpoint_url = endpoint_base_url + '?key=' + auth_key + '&q=' + link;
      $(this).html('<div class="ui placeholder"> <div class="image header"> <div class="line"></div> <div class="line"></div> </div> <div class="paragraph"> <div class="line"></div> <div class="line"></div> <div class="line"></div> <div class="line"></div> <div class="line"></div> </div><div class="gap">  </div><div class="column left"></div> <div class="column right"></div></div></div>');
      $.ajax({
        method: 'GET',
        url: endpoint_url,
        contentType: "application/json",
        dataType: 'json',
        success: function(result) {
          $(element).html('<a href="' + result.url + '"><div class="link-preview"> \n ' +
                        '<div class="link-info"> \n ' + '<div class="link-preview-image"><img alt="' + result.title + '" src="' + result.image + '"></div> \n' +
                        '<div class="detail-stack"> \n ' + '<h4 class="title-desktop">' + result.title + '</h4> \n ' +
                        '<p class="description">' + result.description + '</p> \n' +
                        '<h4 class="title-mobile">' + result.title + '</h4> \n ' +
                        '<span class="url-info"><i class="fas fa-link"></i>' + result.url.split('://')[1] + '</span> \n ' +
                        '</div></div></a>'
                      );
          remove_images();
        }
      });
    });
  }
}

function mergedTableCells() {
  $('table').find('th').each(function() {
    if ($(this).attr('rowspan')) {
      $(this).css('border-bottom', '2px solid #f6f8fe');
    }
  });
}

function add_table_container_class() {
  $('main > div > table').each(function() {
    $(this).closest( 'div' ).attr('class', 'tableContainer');
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
  var post_slug = current_page();
  var index = posts.findIndex(function(item, i) {
    return item.slug === post_slug;
  });
  index = index++;
  if (numposts) {
      $('.nextprev-container').css('display', 'block');
  }
  if (index + 1 < numposts) {
    var prev = posts[index + 1];
    $('.prev-article').css('visibility', 'visible');
    $('.prev-article').find('h6').html(prev['title']);
    $('.prev-article').attr('href', prev['url']);
  }
  if (index > 0) {
    var next = posts[index - 1];
    $('.next-article').css('visibility', 'visible');
    $('.next-article').find('h6').html(next['title']);
    $('.next-article').attr('href', next['url']);
  }
}

function populate_series_list(post) {
  $('#seriesposts h5').html(post['seriesname'].replace('#', ''));
  $('#seriesposts ol').append('<li class="' + post['slug'] + '"><a href="' + post['url'] + '">' + post['title'] + '</a></li>');
  $('#seriesposts').css('display', 'block');
  // $('.nextprev-container').css('display', 'block');
}

function posts_in_series(series, series_name) {
  const series_endpoint = process.env.GHOST_BLOG_URL +
                          'ghost/api/v2/content/posts/?key=' +
                          process.env.GHOST_CONTENT_API_KEY + '&filter=tag:' +
                          series +
                          '&order_by=created_at.asc';
  $.ajax({
        method: 'GET',
        url: series_endpoint,
        contentType: 'application/json',
        dataType: 'json',
        success: function(result){
            const posts = result['posts'];
            for (var i = 0; i < posts.length; i++) {
              const post = posts[i];
              const post_dict = {
                'seriesname': series_name,
                'title': post['title'],
                'url': 'https://hackersandslackers.com/' + post['slug'],
                'created': post['created_at'],
                'slug': post['slug'],
                'numposts': posts.length
              };
              populate_series_list(post_dict);
            }
            create_nextprev_widget(posts);
            const post_slug = current_page();
            $('.' + post_slug).addClass('currentPost');
            $('#seriesposts ol').attr('style', 'counter-reset:li ' + (posts.length + 1));
        }
    });
}

function tag_loop(tags) {
  for (var i = 0; i < tags.length; i++) {
    const tag = tags[i];
    if (tag['visibility'] == "internal") {
      const series = tag['slug'];
      const series_name = tag['meta_title'];
      posts_in_series(series, series_name);
    }
  }
}

function create_series_widgets() {
  const post_slug = current_page();
  const detect_series_endpoint = process.env.GHOST_BLOG_URL +
                                'ghost/api/v2/content/posts/slug/' +
                                post_slug +
                                '?key=' + process.env.GHOST_CONTENT_API_KEY +
                                '&include=tags';
  const headers = {
    "Content-Type": "application/json"
  };
  $.ajax({
        method: 'GET',
        url: detect_series_endpoint,
        contentType: "application/json",
        headers: headers,
        dataType: 'json',
        success: function(result){
            tag_loop(result['posts'][0]['tags']);
        }
    });
}

// Start Script
// -------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  // code_snippet_full_screen();
  scrollable_tables();
  // scrollable_code();
  enable_baguettebox();
  add_image_alt_tags();
  post_link_previews();
  // create_series_widgets();
  add_table_container_class()
  // hljs_init();
});
