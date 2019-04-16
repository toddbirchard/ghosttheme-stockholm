function PopulateAuthorDetails(users) {
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    var author = user.slug;

    if (user.title) {
      $("." + author).find('.title').html(user['title'].toString());
    }

    if (user.facebook) {
      $("." + author).find('.facebook').children().attr('href', 'https://facebook.com/' + user['facebook'].toString());
      $("." + author).find('.facebook').css('display', 'block');
    }

    if (user.linkedin) {
      $("." + author).find('.linkedin').children().attr('href', 'https://linkedin.com/in/' + user['linkedin']);
      $("." + author).find('.linkedin').css('display', 'block');
    }

    if (user.twitter) {
      $("." + author).find('.twitter').children().attr('href', 'https://twitter.com/' + user['twitter']);
      $("." + author).find('.twitter').css('display', 'block');
    }

    if (user.quora) {
      $("." + author).find('.quora').children().attr('href', 'https://quora.com/profile/' + user['quora']);
      $("." + author).find('.quora').css('display', 'block');
    }

    if (user.pocket) {
      $("." + author).find('.pocket').children().attr('href', 'https://getpocket.com/' + user['pocket']);
      $("." + author).find('.pocket').css('display', 'block');
    }

    if (user.github) {
      $("." + author).find('.github').children().attr('href', 'https://github.com/' + user['github']);
      $("." + author).find('.github').css('display', 'block');
    }

    if (user.medium) {
      $("." + author).find('.medium').children().attr('href', 'https://hackingandslacking.com/' + user['medium']);
      $("." + author).find('.medium').css('display', 'block');
    }
  }
}

async function get_authors(author_slug) {
  const endpoint = process.env.GRAPHQL_API_ENDPOINT;
  const token = process.env.GRAPHQL_API_AUTH;

  const vars = {
    slug: author_slug
  };

  const query = `query AuthorsByName($slug: String!) {
      authors(where: {slug: $slug}) {
          name
          website
          title
          linkedin
          vimeo
          quora
          medium
          github
          meetup
          pocket
      }
    }`;

  // Initialize GraphQL Client
  const client = new GraphQLClient(endpoint, {
    headers: {
      'Authorization': token
    }
  });
  client.request(query, vars).then(data => console.log(JSON.stringify(data)));
  client.request(query, vars).then(data => PopulateAuthorDetails(data['authors'][0][author_slug]));
}

$(document).ready(function() {
  let author_slug = who_is_current_author();
  get_authors(author_slug).catch(error => console.error(error));
});
