import '../src/less/projects.less';
import $ from 'jquery';
window.$ = window.jQuery = $;
import 'slick-carousel'

$(document).ready(function() {

  var table_name = 'jira'

  function populateCards(cards, status) {
    for (var i = 0; i < cards.length; i++) {
      $('#' + status + ' .cards').append('<div class="card"> \n' +
      '<h5>' + cards[i].summary + '</h5> \n' +
      //'<p>' + cards[i].description + '</p> \n' +
      '<div style="background-color:' + cards[i].issuetype_color + ';" class="issuetype ' + cards[i].issuetype + '"><img src="' + cards[i].issuetype_url + '"></div> \n' +
      '<div class="info"> \n' +
      '<div class="left"> \n' +
      '<div class="avatar"><img src="https://www.gravatar.com/avatar/9eb3868db428fb602e03b3059608199b?s=250&d=mm&r=x"></div> \n' +
      '<div class="priority ' + cards[i].priority + '"><i class="fas fa-arrow-up"></i></div> \n' +
      '</div> \n' + '<div class="epic ' + cards[i].epic_name + '" style=background-color:' + cards[i].epic_color + '50;><span>' + cards[i].epic_name + '</span></div> \n' +
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
      var url = "https://apisentris.com/api/v1/" + table_name + "?status=like.*Backlog*&project=like.*" + project + "*&limit=6&order_by=rank.asc";
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
        populateCards(json, 'backlog');
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
    TodoCards(table_name, project);
    ProgressCards(table_name, project);
    DoneCards(table_name, project);
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
