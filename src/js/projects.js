// Styles
import '../less/projects.less';
// Dependencies
import { GraphQLClient } from 'graphql-request';
import { GetJiraIssuesViaFragments } from './graphql/queries.gql';
// Project Imports
import { build_dropdown } from './projects/dropdown.js';
import { make_kanban_slick } from './projects/kanban.js';



// Initialize GraphQL Client
const endpoint = process.env.ENDPOINT;
const token = process.env.AUTH;
const client = new GraphQLClient(endpoint, {
  headers: {
    'Authorization': token
  }
});

function populateCards(data) {
  let statuses = ['backlog', 'progress', 'todo', 'done'];
  for (var j = 0; j < statuses.length; j++) {
    let cards = data[statuses[j]];

    for (var i = 0; i < cards.length; i++) {
      $('#' + statuses[j] + ' .cards').append('<div class="card"> \n' + '<h5>' + cards[i]['summary'] + '</h5> \n' + '<div class="info"> \n' + '<div class="left"> \n' + '<div class="avatar"><img alt="' + cards[i]['issuetype_name'] + '" src="' + cards[i]['issuetype_icon'] + '"></div> \n' + '<div class="priority"><img alt="' + cards[i]['priority_name'] + '" src="' + cards[i]['priority_url'] + '"></div> \n' + '</div> \n' + '<div class="epic ' + cards[i]['epic'] + '" style=background-color:' + cards[i]['epic_color'] + '50;><span>' + cards[i]['epic_name'] + '</span></div> \n' + '</div></div>');
    }
  }
}

async function execute_query(query, query_vars) {
  client.request(query, query_vars)
  .then(data => populateCards(data))
  .catch(error => console.error(error));
}

function construct_query(project) {
  $('.cards').empty();

  const query_variables = {
    project: project
  };

  // Structured query
  const query = `query JiraIssuesByStatus($project: String) {
      backlog: jiraIssues(where: {project: $project, status: "Backlog", issuetype_name_not_in: ["Epic", "Idea", "Content"], priority_rank_in: [1, 2, 3]}, orderBy: priority_rank_ASC, first: 6) {
        key
        summary
        epic_color
        epic_name
        status
        priority_rank
        priority_url
       	priority_name
        issuetype_name
        issuetype_icon
        assignee_name
        assignee_url
      }
      todo: jiraIssues(where: {project: $project, status: "To Do", issuetype_name_not_in: ["Epic", "Idea", "Content"]}, orderBy: priority_rank_ASC, first: 6) {
        key
        summary
        epic_color
        epic_name
        status
        priority_rank
        priority_url
        issuetype_name
        issuetype_icon
        assignee_name
        assignee_url
      }
      progress: jiraIssues(where: {project: $project, status: "In Progress", issuetype_name_not_in: ["Epic", "Idea", "Content"]}, orderBy: updatedAt_DESC, first: 6) {
        key
        summary
        epic_color
        epic_name
        status
        priority_rank
        priority_url
        issuetype_name
        issuetype_icon
        assignee_name
        assignee_url
      }
      done: jiraIssues(where: {project: $project, status: "Done", issuetype_name_not_in: ["Epic", "Idea", "Content"], priority_rank_in: [1, 2, 3]}, orderBy: priority_rank_ASC, first: 6) {
        key
        summary
        epic_color
        epic_name
        status
        priority_rank
        priority_url
        issuetype_name
        issuetype_icon
        assignee_name
        assignee_url
      }
    }`;

  execute_query(query, query_variables);
}

function init_dropdown() {
  $('.stockholmproject').on('click', function() {
    construct_query();
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
    construct_query('ghostthemes.io');
  });

  $('.roblog').on('click', function() {
    construct_query('ghostthemes.io');
  });
}

$(document).ready(function() {
  construct_query("Hackers and Slackers");
  build_dropdown();
  make_kanban_slick();
  init_dropdown();
});
