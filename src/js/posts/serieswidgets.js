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
  const series_endpoint = process.env.GHOST_BLOG_URL + 'ghost/api/v2/content/posts/?key=' + process.env.GHOST_CONTENT_API_KEY + '&filter=tag:' + series + '&order_by=created_at.asc';

  $.ajax({
    method: 'GET',
    url: series_endpoint,
    contentType: 'application/json',
    dataType: 'json',
    success: function(result) {
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
      $('#seriesposts ol').attr('style', 'counter-reset:li ' + (
      posts.length + 1));
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

export function create_series_widget() {
  const post_slug = current_page();
  const detect_series_endpoint = process.env.GHOST_BLOG_URL + 'ghost/api/v2/content/posts/slug/' + post_slug + '?key=4a458b5025e15385f23f0f789f' + '&include=tags';
  const headers = {
    "Content-Type": "application/json"
  };
  $.ajax({
    method: 'GET',
    url: detect_series_endpoint,
    contentType: "application/json",
    headers: headers,
    dataType: 'json',
    success: function(result) {
      tag_loop(result['posts'][0]['tags']);
    }
  });
}
