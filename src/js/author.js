import '../less/pages.less';
import '../less/author.less';
import { GraphQLClient } from 'graphql-request';
import {author_github} from './author/github.js';
import {author_medium} from './author/medium.js';
// import author_meetup from '../src/js/author/meetup.js';
import '../../assets/js/includes/gh-profile-card.min.js';

function makeAuthorSidebar(data){
  console.log(JSON.stringify(data));
  author_github(data['github']);
  author_medium(data['medium']);
  console.log(data);
}

function who_is_current_author() {
  const sPath = String(document.location.pathname);
  let slug = sPath.substring(sPath.lastIndexOf("/") - 4);
  slug = slug.replace('/', '');
  console.log('slug = ' + slug);
  return slug;
}

async function get_authors(author_slug) {
  const endpoint = process.env.ENDPOINT;
  const token = process.env.AUTH;

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
  const client = new GraphQLClient(endpoint, { headers: {'Authorization': token}} );
  client.request(query, vars).then(data =>   console.log(JSON.stringify(data)));
  client.request(query, vars).then(data => makeAuthorSidebar(data));
}

$(document).ready(function() {
  let author_slug = who_is_current_author();
  get_authors(author_slug).catch(error => console.error(error));
});
