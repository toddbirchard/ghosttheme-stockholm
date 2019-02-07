import '../src/less/projects.less';

$(document).ready(function() {

    function populateCards(cards, status) {
      $('.overlay').css('opacity', '0');
      setTimeout(function(){ $('.overlay').css('display', 'none') }, 300);
      for (var i = 0; i < cards.length; i++) {
        $('#' + status + ' .cards').append('<div class="card"> \n' + '<h5>' + cards[i].summary + '</h5> \n' +
        //'<p>' + cards[i].description + '</p> \n' +
        '<div style="background-color:' + cards[i].issuetype_color + ';" class="issuetype ' + cards[i].issuetype + '"><img src="' + cards[i].issuetype_url + '"></div> \n' +
        '<div class="info"> \n' +
        '<div class="left"> \n' + '<div class="avatar"><img src="https://www.gravatar.com/avatar/9eb3868db428fb602e03b3059608199b?s=250&d=mm&r=x"></div> \n' +
        '<div class="priority ' + cards[i].priority + '"><i class="fas fa-arrow-up"></i></div> \n' +
        '</div> \n' +
        '<div class="epic ' + cards[i].epic_name + '" style=background-color:' + cards[i].epic_color + '50;><span>' + cards[i].epic_name + '</span></div> \n' +
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
              swipeToSlide: true,
            }
          }, {
            breakpoint: 700,
            settings: {
              centerMode: false,
              centerPadding: '20px',
              slidesToShow: 2,
            }
          },
          {
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

  function populate_jira_cards(table_name) {
    $('.cards').remove('.card');
    $('.card').remove();
    $('.overlay').css('display', 'none');
    $('.picker ul').css('display', 'none');
    function BacklogCards(table_name) {
      $.ajax({
        method: "GET",
        url: "https://apisentris.com/api/v1/" + table_name + "?status=like.Backlog&limit=6&order_by=rank.asc",
        headers: {
          client_id: 139000,
          access_token: "wAfyf6j30qKrfUs37B52Gg"
        },
        contentType: 'application/json'
      }).done(function(results) {
        populateCards(results, 'backlog');
      });
    }
    function TodoCards(table_name) {
      $.ajax({
        method: "GET",
        url: "https://apisentris.com/api/v1/" + table_name + "?status=like.To%20Do&limit=6&order_by=rank.asc",
        headers: {
          client_id: 139000,
          access_token: "wAfyf6j30qKrfUs37B52Gg"
        },
        contentType: 'application/json'
      }).done(function(results) {
        populateCards(results, 'todo');
      });
    }
    function ProgressCards(table_name) {
      $.ajax({
        method: "GET",
        url: "https://apisentris.com/api/v1/" + table_name + "?status=like.In%20Progress&limit=6&order_by=rank.asc",
        headers: {
          client_id: 139000,
          access_token: "wAfyf6j30qKrfUs37B52Gg"
        },
        contentType: 'application/json'
      }).done(function(results) {
        populateCards(results, 'progress');
      });
    }

    function DoneCards(table_name) {
      $.ajax({
        method: "GET",
        url: "https://apisentris.com/api/v1/" + table_name + "?status=like.Done&limit=6&order_by=updated.desc",
        headers: {
          client_id: 139000,
          access_token: "wAfyf6j30qKrfUs37B52Gg"
        },
        contentType: 'application/json'
      }).done(function(results) {
        populateCards(results, 'done');
      });
    }
    BacklogCards(table_name);
    TodoCards(table_name);
    ProgressCards(table_name);
    DoneCards(table_name);
  }
  populate_jira_cards('ghosttheme_stockholm');
  MakeSlick();

  $('.stockholmproject').on('click', function(obj){
    populate_jira_cards('ghosttheme_stockholm');
  });

  $('.tokyoproject').on('click', function(obj){
    populate_jira_cards('ghosttheme_tokyo');
  });

  $('.jupyterproject').on('click', function(obj){
    populate_jira_cards('planetjupyter');
  });

  $('.apiproject').on('click', function(obj){
    populate_jira_cards('hackersandslackers-api');
  });


  $('.picker').on('mouseover', function(){
    $('.overlay').css('display', 'block');
    $('.overlay').css('opacity', '.3');
  });

  $('.picker').on('mouseleave', function(){
    $('.overlay').css('opacity', '0');
    setTimeout(function(){ $('.overlay').css('display', 'none') }, 300);
  });


  $('.mobilemenu').on('click', function (obj){
    $(this).find('ul').attr('display', 'block');
    $('.overlay').css('display', 'block');
    $('.overlay').css('opacity', '.3');
  });
});
