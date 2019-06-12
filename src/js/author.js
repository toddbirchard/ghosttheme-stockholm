import '../less/pages.less';
import '../less/author.less';
import { author_github } from './author/github.js';
import { post_link_previews } from './global/previews.js';
import { author_website } from './author/website.js';
import { author_medium } from './author/medium.js';
// import author_meetup from '../src/js/author/meetup.js';

// Functions
// -------------------------------------------
function makeAuthorSidebar(data) {
  const medium_key = process.env.MEDIUM_API_KEY;
  let github = JSON.stringify(data['github']);
  github = github.replace('"', '');
  github = github.replace('"', '');
  let medium = JSON.stringify(data['medium']);
  medium = medium.replace('"', '');
  medium = medium.replace('"', '');
  let website = JSON.stringify(data['website']);
  console.log('website = ' + website);
  website = website.replace('"', '');
  website = website.replace('"', '');
  console.log("website = " + website);
  author_github(github);
  author_website(website);
  // author_medium(medium, medium_key);

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
      console.log(json);
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
