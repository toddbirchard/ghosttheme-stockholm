import "@babel/polyfill";
import { GraphQLClient } from 'graphql-request'
require('../src/less/projects.less');
import $ from 'jquery';
import 'slick-carousel';

$(document).ready(function() {
  const table_name = 'jira';

  function populateCards(cards, status) {
    var card_list = cards;
    console.log(card_list);
    for (var i = 0; i < card_list.length; i++) {
      $('#' + status + ' .cards').append('<div class="card"> \n' + '<h5>' + card_list[i]['summary'] + '</h5> \n' +
     // '<div style="background-color:' + card_list[i].issuetype_color + ';" class="issuetype ' + card_list[i]['issuetype'] + '"><img src="' + card_list[i].issuetype_url + '"></div> \n' +
      '<div class="info"> \n' +
      '<div class="left"> \n' +
      '<div class="avatar"><img alt="' + card_list[i]['issuetype_name'] + '" src="' + card_list[i]['issuetype_url'] + '"></div> \n' +
      '<div class="priority"><img alt="' + card_list[i]['priority_name'] + '" src="' + card_list[i]['priority_url'] + '"></div> \n' + '</div> \n' +
      '<div class="epic ' + card_list[i]['epic'] + '" style=background-color:' + card_list[i]['epic_color'] + '50;><span>' + card_list[i]['epic_name'] + '</span></div> \n' +
      '</div> \n' + '</div>');
    }
  }

  async function main() {
    const endpoint_url = process.env.ENDPOINT;
    const token = process.env.AUTH;
    const endpoint = endpoint_url;

    // Structured query
    const query = `query JiraIssuesByStatus($project: String, $status: String) {
                  jiraIssues(where: {project: $project, status: $status}, orderBy: updated_DESC, first: 6) {
                    key
                    summary
                    epic_color
                    epic_name
                    status
                    priority_rank
                    priority_url
                    issuetype_name
                    issuetype_url
                    assignee_name
                    assignee_url    
                  }
                }`;

    // All Possible Issue Statuses
    //var statuses = ['Backlog', 'To Do', 'In Progress', 'Done'];

    // Initialize GraphQL Client
    const client = new GraphQLClient(endpoint, { headers: {'Authorization': token}} );

    // Execute a query per issue status
    /*
    for (var i = 0; i < statuses.length; i++) {
      var clean_status = statuses[i].toLowerCase().replace(" ", "");
      var variables = {
        project: "Hackers and Slackers",
        status: statuses[i]
      };*/

    const backlog_variables = {
      project: "Hackers and Slackers",
      status: "Backlog"
    };

    const todo_variables = {
      project: "Hackers and Slackers",
      status: "To Do"
    };

    const progress_variables = {
      project: "Hackers and Slackers",
      status: "In Progress"
    };

    const done_variables = {
      project: "Hackers and Slackers",
      status: "Done"
    };

    client.request(query, backlog_variables).then(data => populateCards(data['jiraIssues'], 'backlog'));
    client.request(query, todo_variables).then(data => populateCards(data['jiraIssues'], 'todo'));
    client.request(query, progress_variables).then(data => populateCards(data['jiraIssues'], 'progress'));
    client.request(query, done_variables).then(data => populateCards(data['jiraIssues'], 'done'));
  }

  main().catch(error => console.error(error));

  function MakeSlick() {
    $('#kanban').slick({
      centerMode: false,
      centerPadding: '5px',
      slidesToShow: 4,
      variableWidth: false,
      infinite: false,
      arrows: false,
      dots: true,
      cssEase: 'ease-out',
      responsive: [
        {
          breakpoint: 800,
          settings: {
            centerMode: false,
            centerPadding: '10px',
            slidesToShow: 3,
            swipeToSlide: true
          }
        }, {
          breakpoint: 700,
          settings: {
            centerMode: false,
            centerPadding: '20px',
            slidesToShow: 2
          }
        }, {
          breakpoint: 500,
          settings: {
            centerMode: true,
            centerPadding: '30px',
            slidesToShow: 1,
            edgeFriction: .3
          }
        }
      ]
    });
  }
  MakeSlick();

  $('.stockholmproject').on('click', function(obj) {
    populate_jira_cards(table_name);
  });

  $('.tokyoproject').on('click', function(obj) {
    populate_jira_cards(table_name, 'Toddzilla');
  });

  $('.jupyterproject').on('click', function(obj) {
    populate_jira_cards(table_name, 'PlanetJupyter');
  });

  $('.apiproject').on('click', function(obj) {
    populate_jira_cards(table_name, 'hackersandslackers-api');
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
});
