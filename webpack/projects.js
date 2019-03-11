import { GraphQLClient } from 'graphql-request'
require('../src/less/projects.less');
import $ from 'jquery';
window.$ = window.jQuery = $;
import 'slick-carousel'

$(document).ready(function() {
  var table_name = 'jira'

  function populateCards(cards, status) {
    card_list = cards['data']['jiraissueses'];
    for (var i = 0; i < card_list.length; i++) {
      $('#' + status + ' .cards').append('<div jiraissuesesclass="card"> \n' + '<h5>' + card_list[i].summary + '</h5> \n' +
      '<div style="background-color:' + card_list[i].issuetype_color + ';" class="issuetype ' + card_list[i].issuetype + '"><img src="' + card_list[i].issuetype_url + '"></div> \n' +
      '<div class="info"> \n' +
      '<div class="left"> \n' +
      '<div class="avatar"><img src="https://www.gravatar.com/avatar/9eb3868db428fb602e03b3059608199b?s=250&d=mm&r=x"></div> \n' +
      '<div class="priority ' + card_list[i].priority + '"><i class="fas fa-arrow-up"></i></div> \n' + '</div> \n' +
      '<div class="epic ' + card_list[i].epic_name + '" style=background-color:' + card_list[i].epic_color + '50;><span>' + card_list[i].epic_name + '</span></div> \n' +
      '</div> \n' + '</div>');
    }
  }

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

  //var endpoint = process.env.ENDPOINT;
  //var token = process.env.AUTH;

  var endpoint = process.env.ENDPOINT;
  var token = process.env.AUTH;

  // Initialize GraphQL Client
  var client = new GraphQLClient(endpoint, {
    headers: {
      Authorization: token
    }
  });

  // Structured query
  var query = `
                query JiraIssuesByStatus($project: String, $status: String) {
                  jiraIssues(where: {project: $project, status: $status}, orderBy: timestamp_DESC, first: 6) {
                    key
                    summary
                    epic
                    status
                    project
                    priority
                    issuetype
                    timestamp
                  }
                }
              `

  // All Possible Issue Statuses
  var statuses = ['Backlog', 'To Do', 'In Progress', 'Done'];

  // Execute a query per issue status
  for(var i = 0; i < statuses.length; i++){
    var variables = {
      project: "Hackers and Slackers",
      status: statuses[i]
    }

    client.request(query, variables).then(data => {
      console.log(JSON.parse(data))
      console.log(JSON.parse(data)['jiraIssues'])
      populateCards(JSON.parse(data)['jiraIssues'])
      console.log(JSON.parse(data)['jiraIssues'])
    }).catch(err => {
      console.log(err.response.errors) // GraphQL response errors
      console.log(err.response.data) // Response data if available
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
