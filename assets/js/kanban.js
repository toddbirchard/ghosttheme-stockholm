$(document).ready(function() {

    function populateCards(cards, status) {
      for (var i = 0; i < cards.length; i++) {
        $('#' + status + ' .cards').append('<div class="card"> \n' + '<h5>' + cards[i].summary + '</h5> \n' +
        //'<p>' + cards[i].description + '</p> \n' +
        '<div style="background-color:' + cards[i].issuetype_color + ';" class="issuetype ' + cards[i].issuetype + '"><img src="' + cards[i].issuetype_url + '"></div> \n' +
        '<div class="info"> \n' +
        '<div class="left"> \n' + '<div class="avatar"><img src="https://www.gravatar.com/avatar/9eb3868db428fb602e03b3059608199b?s=250&d=mm&r=x"></div> \n' +
        '<div class="priority ' + cards[i].priority + '"><i class="fas fa-arrow-up"></i></div> \n' +
        '</div> \n' +
        '<div class="epic ' + cards[i].epic_name + '"><span>' + cards[i].epic_name + '</span> <i class="fas fa-bolt" style=color:' + cards[i].epic_color + ';"></i></div> \n' +
        '</div> \n' + '</div>');
      }
    }

    function BacklogCards() {
      $.ajax({
        method: "GET",
        url: "https://apisentris.com/api/v1/jira_issues?status=like.Backlog&limit=6&order_by=updated.desc",
        headers: {
          client_id: "115000",
          access_token: "qWLp79NWuDtVxom5v6_h_g"
        },
        contentType: 'application/json'
      }).done(function(results) {
        populateCards(results, 'backlog');
      });
    }

    function TodoCards() {
      $.ajax({
        method: "GET",
        url: "https://apisentris.com/api/v1/jira_issues?status=like.To%20Do&limit=6&order_by=updated.desc",
        headers: {
          client_id: "115000",
          access_token: "qWLp79NWuDtVxom5v6_h_g"
        },
        contentType: 'application/json'
      }).done(function(results) {
        populateCards(results, 'todo');
      });
    }

    function ProgressCards() {
      $.ajax({
        method: "GET",
        url: "https://apisentris.com/api/v1/jira_issues?status=like.In%20Progress&limit=6&order_by=updated.desc",
        headers: {
          client_id: "115000",
          access_token: "qWLp79NWuDtVxom5v6_h_g"
        },
        contentType: 'application/json'
      }).done(function(results) {
        populateCards(results, 'progress');
      });
    }

    function DoneCards() {
      $.ajax({
        method: "GET",
        url: "https://apisentris.com/api/v1/jira_issues?status=like.Done&limit=6&order_by=updated.desc",
        headers: {
          client_id: "115000",
          access_token: "qWLp79NWuDtVxom5v6_h_g"
        },
        contentType: 'application/json'
      }).done(function(results) {
        populateCards(results, 'done');
      });
    }

    function MakeSwiper() {
      var swiper = new Swiper('.swiper-container', {
        height: 1000,
        noSwiping: true,
        spaceBetween: 5,
        centeredSlides: false,
        slidesPerView: 4,
        grabCursor: false,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets'
        },
        breakpoints: {
          // when window width is <= 320px
          1000: {
            slidesPerView: 2,
            noSwiping: false,
            grabCursor: true,
            initialSlide: 0,
            centeredSlides: false
          },
          800: {
            slidesPerView: 2,
            noSwiping: false,
            grabCursor: true,
            //slidesOffsetBefore: 20,
            //slidesOffsetAfter: 20,
          },
          600: {
            slidesPerView: 1,
            noSwiping: false,
            slidesPerColumnFill: 'column',
            grabCursor: true,
            centerInsufficientSlides: true,
            centeredSlides: true
            //slidesOffsetBefore: 20,
            //slidesOffsetAfter: 20,
          },
          400: {
            slidesPerView: 1,
            noSwiping: false,
            slidesPerColumnFill: 'column',
            grabCursor: true,
            //slidesOffsetBefore: 20,
            //slidesOffsetAfter: 20,
          }
        }
      });

      swiper.pagination.render();
      swiper.on('resize', function() {
        swiper.slideTo(0, 300, false);

        swiper.pagination.update();
        if ($(window).width() < 600) {
          swiper.centeredSlides = true;
        }
      });

      swiper.on('slideChange', function() {
        if ($(window).width() < 600) {
          swiper.centeredSlides = true;
          swiper.spaceBetween = 0;
          swiper.normalizeSlideIndex = true;
          swiper.updateSize();
          swiper.updateSlides();
        }
      });
    }

  BacklogCards();
  TodoCards();
  ProgressCards();
  DoneCards();
  MakeSwiper();
});
