import '../less/pages.less';
import '../less/author.less';
import { author_github } from './author/github.js';
import { post_link_previews } from './global/previews.js';
import { author_website } from './author/website.js';
import { author_medium } from './author/medium.js';
// import author_meetup from '../src/js/author/meetup.js';

// Initialize MongoDB
// -------------------------------------------
const {
    Stitch,
    RemoteMongoClient,
    AnonymousCredential
} = require('mongodb-stitch-browser-sdk');
const mongodb_client = Stitch.initializeDefaultAppClient(process.env.MONGODB_STITCH_APP_ID);
const db = mongodb_client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db(process.env.MONGODB_ATLAS_DB);

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
  website = github.replace('"', '');
  website = github.replace('"', '');
  website = 'https://' + website
  console.log("website = " + website)
  author_github(github);
  author_medium(medium, medium_key);
  author_website(website);
}

function who_is_current_author() {
  const sPath = String(document.location.pathname);
  let slug = sPath.substring(sPath.lastIndexOf("/") - 4);
  slug = slug.replace('/', '');
  return slug;
}

function get_authors() {
  const slug = who_is_current_author();
  mongodb_client.auth.loginWithCredential(new AnonymousCredential()).then(() =>
    db.collection('authors').find(
      { slug: slug }
    ).asArray()
    ).then(docs => {
        makeAuthorSidebar(docs[0])
    }).catch(err => {
        console.error(err)
    })
}

// Start Script
// -------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  get_authors();
  post_link_previews();
});
