import {request} from 'graphql-request'
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

  function populate_jira_cards(table_name, project) {
    $('.cards').remove('.card');
    $('.card').remove();
    $('.overlay').css('display', 'none');
    $('.picker ul').css('display', 'none');

    function BacklogCards(table_name, project) {

      var url = "http://198.199.74.176:4466";
      const backlog_query = `
          {
              jiraissueses(where: {status: "Backlog"}, orderBy: updated_DESC, first: 6) {
                   key
                   status
                   summary
                   assignee
                   priority
                   issuetype
                   epic_name
                   updated
                   rank
                   timestamp
                   project
              }
          }
          `
      request('http://198.199.74.176:4466', backlog_query)
      .then((data) => {
        return data.json()
      }).then((json) => {
        console.log(json)
      })
      .then((json) => {
        populateCards(json, 'backlog');
      })
      .catch(err => {
        console.log(err.response.errors) // GraphQL response errors
        console.log(err.response.data) // Response data if available
      });
    }

    function TodoCards(table_name, project) {
      var url = "https://apisentris.com/api/v1/" + table_name + "?status=like.*To*&project=like.*" + project + "*&limit=6&order_by=rank.asc";
      var headers = {
        "Content-Type": "application/json",
        "client_id": "140000",
        "access_token": "6OMcDqLWFV7DuVnxAxJSmQ"
      }
      fetch(url, {
        method: 'GET',
        headers: headers
      }).then((res) => {
        return res.json()
      }).then((json) => {
        populateCards(json, 'todo');
      });
    }

    function ProgressCards(table_name, project) {
      var url = "https://apisentris.com/api/v1/" + table_name + "?status=like.*In Progress*&project=like.*" + project + "*&limit=6&order_by=rank.asc";
      var headers = {
        "Content-Type": "application/json",
        "client_id": "140000",
        "access_token": "6OMcDqLWFV7DuVnxAxJSmQ"
      }
      fetch(url, {
        method: 'GET',
        headers: headers
      }).then((res) => {
        return res.json()
      }).then((json) => {
        populateCards(json, 'progress');
      });
    }

    function DoneCards(table_name, project) {
      var url = "https://apisentris.com/api/v1/" + table_name + "?status=like.*Done*&project=like.*" + project + "*&limit=6&order_by=rank.asc";
      var headers = {
        "Content-Type": "application/json",
        "client_id": "140000",
        "access_token": "6OMcDqLWFV7DuVnxAxJSmQ"
      }
      fetch(url, {
        method: 'GET',
        headers: headers
      }).then((res) => {
        return res.json()
      }).then((json) => {
        populateCards(json, 'done');
      });
    }
    BacklogCards(table_name, project);
    //TodoCards(table_name, project);
  //  ProgressCards(table_name, project);
    //DoneCards(table_name, project);
  }

  populate_jira_cards(table_name, 'Hackers and Slackers');
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
