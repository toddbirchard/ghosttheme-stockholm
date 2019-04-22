$(document).ready(function() {

  function current_page() {
    var sPath = String(document.location.pathname);
    var slug = sPath.split('/')[1];
    return slug;
  }

  function create_nextprev_widget(posts) {
    var numposts = posts.length;
  }

  function populate_series_list(post) {
    $('#seriesposts h5').html(post['seriesname'].replace('#', ''));
    $('#seriesposts ol').append('<li class="' + post['slug'] + '"><a href="' + post['url'] + '">' + post['title'] + '</a></li>');
  }

  function posts_in_series(series, seriesname) {
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
        populate_series_list(post_dict);
      }
      create_nextprev_widget(posts);
      $('.' + postslug).addClass('currentPost');
      $('#seriesposts ol').attr('style', 'counter-reset:step-counter ' + (
      posts.length + 1));
    });
  }

  function tag_loop(tags) {
    var i;
    for (i = 0; i < tags.length; i++) {
      var tag = tags[i];
      if (tag['visibility'] == "internal") {
        var series = tag['slug'];
        var seriesname = tag['meta_title'];
        create_list_object();
        posts_in_series(series, seriesname);
      }
    }
  }

  function detect_series() {
    var postslug = current_page();
    var endpoint = 'https://hackersandslackers.com/ghost/api/v2/content/posts/slug/' + postslug + '?key=bc6a59fe37ee67d9fbb93ea03b&include=tags';
    var headers = {
      "Content-Type": "application/json"
    }
    fetch({method: "GET", url: endpoint, headers: headers}).then((res) => {
      return res.json()
    }).then((json) => {
      tag_loop(json['posts'][0]['tags']);
    });
  }
  detect_series();
});
