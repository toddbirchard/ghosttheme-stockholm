import {GraphQLClient} from 'graphql-request';
import '../less/projects.less';
import './projects/kanban.js';
import '@babel/polyfill';
import $ from "jquery";
const fetch = require('node-fetch');

const getData = async (endpoint, query, variables, token) => {
  const data = JSON.stringify({"query": query, "variables": variables});
  const response = await fetch(endpoint, {
    method: 'POST',
    mode: "no-cors",
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: data
  });
  const json = await response.json();
  console.log('json = ' + json);
};

function populateCards(data) {
  console.log(data);
  let statuses = ['backlog', 'progress', 'todo', 'done'];
  for (var j = 0; j < statuses.length; j++) {
    let cards = data[statuses[j]];

    for (var i = 0; i < cards.length; i++) {
      $('#' + statuses[j] + ' .cards').append('<div class="card"> \n' + '<h5>' + cards[i]['summary'] + '</h5> \n' + '<div class="info"> \n' + '<div class="left"> \n' + '<div class="avatar"><img alt="' + cards[i]['issuetype_name'] + '" src="' + cards[i]['issuetype_icon'] + '"></div> \n' + '<div class="priority"><img alt="' + cards[i]['priority_name'] + '" src="' + cards[i]['priority_url'] + '"></div> \n' + '</div> \n' + '<div class="epic ' + cards[i]['epic'] + '" style=background-color:' + cards[i]['epic_color'] + '50;><span>' + cards[i]['epic_name'] + '</span></div> \n' + '</div></div>');
    }
  }
}

async function execute_query(query, query_vars) {

  // Initialize GraphQL Client
  /*await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({query, query_vars})
  })
  .then(response => response.json())
  .then(data => {
    return data
  }).catch(err => {
    console.log(err)
  });*/

  // client.request(query, query_vars).then(data => console.log('data = ' + JSON.stringify(data)));
  // client.request(query, query_vars).then(data => populateCards(data));
}

function construct_query(project) {
  const endpoint = process.env.ENDPOINT;
  const token = process.env.AUTH;
  $('.cards').empty();

  const variables = {
    "project": project
  };

  // Structured query
  const query = 'query JiraIssuesByStatus($project: String) { backlog: jiraIssues(where: {project: $project, status: \"Backlog\", issuetype_name_not_in: [\"Epic\", \"Idea\", \"Content\"], priority_rank_in: [1, 2, 3]}, orderBy: priority_rank_DESC, first: 6) { key summary epic_color epic_name status priority_rank priority_url priority_name issuetype_name issuetype_icon assignee_name assignee_url } todo: jiraIssues(where: {project: $project, status: \"To Do\", issuetype_name_not_in: [\"Epic\", \"Idea\", \"Content\"]}, orderBy: updated_DESC, first: 6) { key summary epic_color epic_name status priority_rank priority_url issuetype_name issuetype_icon assignee_name assignee_url } progress: jiraIssues(where: {project: $project, status: \"In Progress\", issuetype_name_not_in: [\"Epic\", \"Idea\", \"Content\"]}, orderBy: updated_DESC, first: 6) { key summary epic_color epic_name status priority_rank priority_url issuetype_name issuetype_icon assignee_name assignee_url } done: jiraIssues(where: {project: $project, status: \"Done\", issuetype_name_not_in: [\"Epic\", \"Idea\", \"Content\"], priority_rank_in: [1, 2, 3]}, orderBy: updated_DESC, first: 6) { key summary epic_color epic_name status priority_rank priority_url issuetype_name issuetype_icon assignee_name assignee_url } }';

  getData(endpoint, query, variables, token);
}

function build_dropdown() {

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

  $('.dropdown').on('mouseover', function() {
    $('.dropdown-list').css('display', 'block');
    $('.dropdown-list').css('opacity', '1');
  });

  $('.dropdown').on('mouseleave', function() {
    $('.dropdown-list').css('display', 'none');
    $('.dropdown-list').css('opacity', '0');
  });

  $('.mobilemenu').on('click', function() {
    $('.dropdown-list').css('display', 'block');
    $('.dropdown-list').css('opacity', '1');
  });
}

$(document).ready(function() {
  construct_query("Hackers and Slackers");
  build_dropdown();
});
