import '../less/pages.less';
import '../less/author.less';
import {author_github} from './author/github.js';
import {post_link_previews} from './global/previews.js';
import {author_website} from './author/website.js';
// import { author_medium } from './author/medium.js';
import {author_twitter} from './author/twitter.js';
import {author_rss} from './author/rss.js';
import {author_meetup} from './author/meetup.js';
import {author_pocket} from './author/pocket.js';

// Functions
// -------------------------------------------
function makeAuthorSidebar(data) {
  let github = data['github'];
  let medium = data['medium'];
  let website = data['website'];
  let twitter = data['twitter'];
  let rss = data['rss'];
  let meetup = data['meetup'];
  let pocket = data['pocket'];
  author_github(github);
  author_website(website);
  author_twitter(twitter);
  author_rss(rss);
  author_meetup(meetup);
  author_pocket(pocket);
  //author_medium(medium);

}

function who_is_current_author() {
  const sPath = String(document.location.pathname);
  let slug = sPath.split("/");
  slug = slug[slug.length -2];
  return slug;
}

function get_authors() {
  const slug = who_is_current_author();
  $.ajax({
    method: 'GET',
    url: process.env.AUTHORS_ENDPOINT + '?author=' + slug,
    dataType: 'json',
    success: function(response) {
      var json = response;
      makeAuthorSidebar(json);
    }
  });
}

// Start Script
// -------------------------------------------
$(document).ready(function() {
  get_authors();
  post_link_previews();
});
