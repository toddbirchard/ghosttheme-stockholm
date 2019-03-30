import '../less/pages.less';
import '../less/author.less';
//import { GitHubCard } from 'github-profile-card';
import { GraphQLClient } from 'graphql-request';
import {author_github} from './author/github.js';
import {author_medium} from './author/medium.js';
// import author_meetup from '../src/js/author/meetup.js';

function makeAuthorSidebar(data, author_slug){
  console.log(JSON.stringify(data));
  let medium_key = process.env.medium_key;
  let github = JSON.stringify(data['authors'][0]['github']);
  github = github.replace('"', '');
  let medium = JSON.stringify(data['authors'][0]['medium']);
  author_github(github, author_slug);
  author_medium(medium, medium_key);
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
  client.request(query, vars).then(data => makeAuthorSidebar(data, author_slug));
}

$(document).ready(function() {
  let author_slug = who_is_current_author();
  get_authors(author_slug).catch(error => console.error(error));
});
