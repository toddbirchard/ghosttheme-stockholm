// Styles
import '../less/projects.less';
// Project Imports
import { build_dropdown } from './projects/dropdown.js';
import { make_kanban_slick } from './projects/kanban.js';


// Inialize MongoDB
const {
    Stitch,
    RemoteMongoClient,
    AnonymousCredential
} = require('mongodb-stitch-browser-sdk');
const mongodb_client = Stitch.initializeDefaultAppClient('hackers-api-ltxuq');
const db = mongodb_client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('hackers-api');

// Functions
function populate_cards(data) {
    for (var i = 0; i < cards.length; i++) {
      $('#backlog' + ' .cards').append('<div class="card"> \n' + '<h5>' + cards[i]['summary'] + '</h5> \n' + '<div class="info"> \n' + '<div class="left"> \n' + '<div class="avatar"><img alt="' + cards[i]['issuetype_name'] + '" src="' + cards[i]['issuetype_icon'] + '"></div> \n' + '<div class="priority"><img alt="' + cards[i]['priority_name'] + '" src="' + cards[i]['priority_url'] + '"></div> \n' + '</div> \n' + '<div class="epic ' + cards[i]['epic'] + '" style=background-color:' + cards[i]['epic_color'] + '50;><span>' + cards[i]['epic_name'] + '</span></div> \n' + '</div></div>');
    }
}

async function get_mongodb_cards() {
  mongodb_client.auth.loginWithCredential(new AnonymousCredential()).then(() =>
    db.collection('jira').find({project: "Hackers and Slackers", status: "Backlog"}).asArray()
  ).then(docs => {
      console.log("Found docs", docs)
      populate_cards(docs)
  }).catch(err => {
      console.error(err)
  });
}

function init_dropdown() {
  $('.stockholmproject').on('click', function() {
    construct_query('Hackers and Slackers');
  });

  $('.tokyoproject').on('click', function() {
    construct_query('Toddzilla');
  });

  $('.linkbox-api').on('click', function() {
    construct_query('Linkbox API');
  });

  $('.ghostthemesio').on('click', function() {
    construct_query('ghostthemes.io');
  });

  $('.tableau-extraction').on('click', function() {
    construct_query('Tableau Extraction');
  });

  $('.roblog').on('click', function() {
    construct_query('Roblog');
  });
}

$(document).ready(function() {
  get_mongodb_cards();
  build_dropdown();
  make_kanban_slick();
  init_dropdown();
});
