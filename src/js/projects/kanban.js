import $ from 'jquery';
window.$ = window.jQuery = $;

function populateCards(cards) {
  for (var i = 0; i < cards.length; i++) {
    let key = cards[i].key;
    let status = cards[i].status;
    let summary = cards[i].summary;
    let assignee = cards[i].assignee;
    let priority = cards[i].priority;
    let issuetype = cards[i].issuetype;
    let epic_name = cards[i].epic_name;
    console.log('Card ' + i + ' = ' + key + summary + assignee + priority + issuetype + epic_name);
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
