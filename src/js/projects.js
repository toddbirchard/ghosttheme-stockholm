// Project Imports
// --------------------------------------------
import '../less/projects.less';
import { build_dropdown } from './projects/dropdown.js';
import { make_kanban_slick } from './projects/kanban.js';

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
// -----------------------------------------
function populate_cards(cards) {
  status = cards[0]['status'];
    for (var i = 0; i < cards.length; i++) {
      $('#' + status + ' .cards').append('<div class="card"> \n' +
                                  '<p class="card-title">' + cards[i]['summary'] + '</p> \n' +
                                  '<div class="info"> \n' + '<div class="left"> \n' +
                                  '<div class="avatar"><img alt="' + cards[i]['issuetype_name'] + '" src="' + cards[i]['issuetype_icon'] + '"></div> \n' +
                                  '<div class="priority"><img alt="' + cards[i]['priority_name'] + '" src="' + cards[i]['priority_url'] + '"></div> </div> \n' +
                                  '<div class="epic ' + cards[i]['epic'] + '" style=background-color:' + cards[i]['epic_color'] + '50;><span class="epic-title">' + cards[i]['epic_name'] + '</span></div> \n'
                                  + '</div></div>');
    }
}

function get_mongodb_cards(project) {
  // Backlog
  mongodb_client.auth.loginWithCredential(new AnonymousCredential()).then(() =>
    db.collection('jira').find(
    { project: project, status: "Backlog", issuetype_name: { $in: ['Task', 'Bug', 'Integration', 'Major Functionality', 'Story' ] }},
    { limit: 6 },
    { sort: { priority_rank: -1 } }
  ).asArray()
  ).then(docs => {
      console.log("Found docs", docs)
      populate_cards(docs)
  }).catch(err => {
      console.error(err)
  });

  // To do
  mongodb_client.auth.loginWithCredential(new AnonymousCredential()).then(() =>
    db.collection('jira').find(
    { project: project, status: "ToDo", issuetype_name: { $in: ['Task', 'Bug', 'Integration', 'Major Functionality', 'Story' ] }},
    { limit: 6 },
    { sort: { updated: -1 } }
  ).asArray()
  ).then(docs => {
      console.log("Found docs", docs)
      populate_cards(docs)
  }).catch(err => {
      console.error(err)
  });

  // In Progess
  mongodb_client.auth.loginWithCredential(new AnonymousCredential()).then(() =>
    db.collection('jira').find(
    { project: project, status: "InProgress", issuetype_name: { $in: ['Task', 'Bug', 'Integration', 'Major Functionality', 'Story' ] }},
    { limit: 6 },
    { sort: { updated: -1 } }
  ).asArray()
  ).then(docs => {
      console.log("Found docs", docs)
      populate_cards(docs)
  }).catch(err => {
      console.error(err)
  });

  // Done
  mongodb_client.auth.loginWithCredential(new AnonymousCredential()).then(() =>
    db.collection('jira').find(
    { project: project, status: "Done", issuetype_name: { $in: ['Task', 'Bug', 'Integration', 'Major Functionality', 'Story' ] }},
    { limit: 6 },
    { sort: { updated: -1 } }
  ).asArray()
  ).then(docs => {
      console.log("Found docs", docs)
      populate_cards(docs)
  }).catch(err => {
      console.error(err)
  });

  /*mongodb_client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
    console.log('logged in anonymously as ' + user)
  });

  mongodb_client.callFunction("get_jira_cards", [project]).then(result => {
    console.log(result)
  });*/
}

function init_dropdown() {
  $('.stockholmproject').on('click', function() {
    $('.cards').empty();
    get_mongodb_cards('Hackers and Slackers');
  });

  $('.tokyoproject').on('click', function() {
    $('.cards').empty();
    get_mongodb_cards('Toddzilla');
  });

  $('.linkbox-api').on('click', function() {
    $('.cards').empty();
    get_mongodb_cards('Linkbox API');
  });

  $('.ghostthemesio').on('click', function() {
    $('.cards').empty();
    get_mongodb_cards('ghostthemes.io');
  });

  $('.tableau-extraction').on('click', function() {
    get_mongodb_cards('Tableau Extraction');
  });

  $('.roblog').on('click', function() {
    get_mongodb_cards('Roblog');
  });
}

// Start Script
// -------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  get_mongodb_cards('Hackers and Slackers');
  build_dropdown();
  make_kanban_slick();
  init_dropdown();
});
