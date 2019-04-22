import '../less/etc/post-archive.less'
const fetch = require('isomorphic-fetch');



function posts_in_series(series, series_name) {
  const endpoint = 'https://hackersandslackers.com/ghost/api/v2/content/posts/'
  const headers = {
    "Content-Type": "application/json"
  };

  fetch(endpoint, {
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
