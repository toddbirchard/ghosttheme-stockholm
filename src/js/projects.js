// Project Imports
// --------------------------------------------
import '../less/projects.less';
import { build_dropdown } from './projects/dropdown.js';
import { make_kanban_slick } from './projects/kanban.js';

// Functions
// -----------------------------------------
function populate_cards(cards) {
  status = cards[0]['status'].replace(' ', '');
    for (var i = 0; i < cards.length; i++) {
      $('#' + status + ' .cards').append('<div class="card"> \n' +
                                  '<p class="card-title">' + cards[i]['summary'] + '</p> \n' +
                                  '<div class="info"> \n' + '<div class="left"> \n' +
                                  '<div class="avatar"><img alt="' + cards[i]['issuetype_name'] + '" src="' + cards[i]['issuetype_icon'] + '"></div> \n' +
                                  '<div class="priority"><img alt="' + cards[i]['priority_name'] + '" src="' + cards[i]['priority_url'] + '"></div> </div> \n' +
                                  '<div class="epic ' + cards[i]['epic_name'] + '" style=background-color:' + cards[i]['epic_color'] + '50;><span class="epic-title">' + cards[i]['epic_name'] + '</span></div> \n'
                                  + '</div></div>');
    }
}

function get_kanban_cards(project) {
  var endpoint = 'https://us-east1-hackersandslackers-204807.cloudfunctions.net/jira-issues-endpoint?project=' + project;
  $.ajax({
    url: endpoint,
    context: document.body
  }).done(function(data) {
    populate_cards(data['backlog']);
    populate_cards(data['todo']);
    populate_cards(data['inprogress']);
    populate_cards(data['done']);
  });
}

function init_dropdown() {
  $('.stockholmproject').on('click', function() {
    $('.cards').empty();
    get_kanban_cards('Hackers and Slackers');
  });

  $('.tokyoproject').on('click', function() {
    $('.cards').empty();
    get_kanban_cards('Toddzilla');
  });

  $('.linkbox-api').on('click', function() {
    $('.cards').empty();
    get_kanban_cards('Linkbox API');
  });

  $('.ghostthemesio').on('click', function() {
    $('.cards').empty();
    get_kanban_cards('ghostthemes.io');
  });

  $('.tableau-extraction').on('click', function() {
    $('.cards').empty();
    get_kanban_cards('Tableau Extraction');
  });

  $('.roblog').on('click', function() {
    $('.cards').empty();
    get_kanban_cards('Roblog');
  });
}

// Start Script
// -------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  get_kanban_cards('Hackers and Slackers');
  build_dropdown();
  make_kanban_slick();
  init_dropdown();
});
