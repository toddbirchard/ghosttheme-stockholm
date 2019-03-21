import { GraphQLClient } from 'graphql-request';
import gql from 'graphql-tag';
require('../less/projects.less');
import { JiraIssuesByStatus } from './query.graphql';
import $ from 'jquery';
import 'slick-carousel';


$(document).ready(function() {
  const table_name = 'jira';

  function count(obj) {
    return Object.keys(obj).length;
  }

  function populateCards(data) {
    console.log(data);
    var num_statuses = count(data);
    console.log('number of statuses = ' + num_statuses);
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

    const client = new GraphQLClient(endpoint_url, { headers: {'Authorization': token, 'Content-Type': 'application/json'}} );

    const vars = {
      project: "Hackers and Slackers"
    };

    client.request(JiraIssuesByStatus, vars).then((result) => {
      console.log(result);
    }).catch(err => {
      console.error(err)
    });
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
