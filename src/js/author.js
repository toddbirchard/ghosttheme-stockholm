import '../less/pages.less';
import '../less/author.less';
import { author_github } from './author/github.js';
import { post_link_previews } from './global/previews.js';
import { author_website } from './author/website.js';
import { author_medium } from './author/medium.js';
import { author_twitter } from './author/twitter.js';
// import author_meetup from '../src/js/author/meetup.js';

// Functions
// -------------------------------------------
function makeAuthorSidebar(data) {
  let github = JSON.stringify(data['github']);
  github = github.replace('"', '');
  github = github.replace('"', '');
  let medium = JSON.stringify(data['medium']);
  medium = medium.replace('"', '');
  medium = medium.replace('"', '');
  let website = JSON.stringify(data['website']);
  website = website.replace('"', '');
  website = website.replace('"', '');
  let twitter = JSON.stringify(data['twitter']);
  twitter = twitter.replace('"', '');
  twitter = twitter.replace('"', '');
  console.log('MEDIUM = ' + medium);
  console.log('twitter = ' + twitter);
  console.log('website = ' + website);
  author_github(github);
  author_website(website);
  author_twitter(twitter);
  author_medium(medium);

}

function who_is_current_author() {
  const sPath = String(document.location.pathname);
  let slug = sPath.substring(sPath.lastIndexOf("/") - 4);
  slug = slug.replace('/', '');
  return slug;
}

function get_authors() {
  const slug = who_is_current_author();
  $.ajax({
    method: 'GET',
    url: process.env.AUTHORS_ENDPOINT + '?author=' + slug,
    dataType: 'json',
    success: function(response) {
      var json = JSON.parse(response);
      makeAuthorSidebar(json);
    }
});
}

// Start Script
// -------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  get_authors();
  post_link_previews();
});
