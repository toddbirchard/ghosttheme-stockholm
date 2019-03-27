import { GraphQLClient } from 'graphql-request';
import '../less/projects.less';
import './projects/kanban.js';


$(document).ready(function() {
  const table_name = 'jira';

  function populateCards(data, status) {
    console.log(data);
    const card_list = data;
    for (var i = 0; i < card_list.length; i++) {
      $('#' + status + ' .cards').append('<div class="card"> \n' + '<h5>' + card_list[i]['summary'] + '</h5> \n' +
      '<div class="info"> \n' +
      '<div class="left"> \n' +
      '<div class="avatar"><img alt="' + card_list[i]['issuetype_name'] + '" src="' + card_list[i]['issuetype_url'] + '"></div> \n' +
      '<div class="priority"><img alt="' + card_list[i]['priority_name'] + '" src="' + card_list[i]['priority_url'] + '"></div> \n' + '</div> \n' +
      '<div class="epic ' + card_list[i]['epic'] + '" style=background-color:' + card_list[i]['epic_color'] + '50;><span>' + card_list[i]['epic_name'] + '</span></div> \n' +
      '</div></div>');
    }
  }

  async function main() {
    const endpoint = process.env.ENDPOINT;
    const token = process.env.AUTH;

    // Structured query
    const query = `query JiraIssuesByStatus($project: String) {
      backlog: jiraIssues(where: {project: $project, status: "Backlog", issuetype_name_not_in: ["Epic", "Idea", "Content"], priority_rank_in: [1, 2, 3]}, orderBy: priority_rank_DESC, first: 6) {
        key
        summary
        epic_color
        epic_name
        status
        priority_rank
        priority_url
    	priority_name
        issuetype_name
        issuetype_url
        assignee_name
        assignee_url
      }
      todo: jiraIssues(where: {project: $project, status: "To Do", issuetype_name_not_in: ["Epic", "Idea", "Content"]}, orderBy: updated_DESC, first: 6) {
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
      progress: jiraIssues(where: {project: $project, status: "In Progress", issuetype_name_not_in: ["Epic", "Idea", "Content"]}, orderBy: updated_DESC, first: 6) {
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
      done: jiraIssues(where: {project: $project, status: "Done", issuetype_name_not_in: ["Epic", "Idea", "Content"], priority_rank_in: [1, 2, 3]}, orderBy: updated_DESC, first: 6) {
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

    // Initialize GraphQL Client
    const client = new GraphQLClient(endpoint, { headers: {'Authorization': token}} );

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

    client.request(query, backlog_variables).then(data => populateCards(data['backlog'], 'backlog'));
    client.request(query, todo_variables).then(data => populateCards(data['todo'], 'todo'));
    client.request(query, progress_variables).then(data => populateCards(data['progress'], 'progress'));
    client.request(query, done_variables).then(data => populateCards(data['done'], 'done'));
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

  $('.stockholmproject').on('click', function() {
    populate_jira_cards(table_name);
  });

  $('.tokyoproject').on('click', function() {
    populate_jira_cards(table_name, 'Toddzilla');
  });

  $('.jupyterproject').on('click', function() {
    populate_jira_cards(table_name, 'PlanetJupyter');
  });

  $('.apiproject').on('click', function() {
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
