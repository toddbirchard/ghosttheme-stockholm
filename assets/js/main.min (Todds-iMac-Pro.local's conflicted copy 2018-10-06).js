"use strict";

$(document).ready(function () {
  function authorSidebar(docs) {
    if (docs[0]['website']) {
      $.ajax({
        url: 'https://api.linkpreview.net/?key=' + linkpreview_key + '&q=' + docs[0]['website'],
        contentType: "application/json",
        dataType: 'json',
        success: function success(result) {
          $('.sidebar').append('<div class="widget" style="order: 0;"><div class="content"><h4 class="title">Website</h4><a href="' + result.url + '"><div class="link-preview" style="background:url(' + result.image + ')"><a>' + result.title + '</a><i class="fas fa-link"></i></div></a></div></div>');
        }
      });
    }

    if (docs[0]['github']) {
      $('.sidebar').append('<div class="widget"><div class="content"><h4 class="title">Github</h4><div id="github-card" data-max-repos="3" data-header-text="Repositories" data-username="' + docs[0]['github'] + '"></div></div></div>');
    }

    if (docs[0]['meetup']) {
      $.ajax({
        url: 'https://api.meetup.com/members/' + docs[0]['meetup'] + '?key=' + meetup_key,
        contentType: "application/json",
        dataType: 'jsonp',
        success: function success(result) {
          //console.log("JSON.stringify(result) = " + JSON.stringify(result));
          $('.sidebar').append('<div class="widget meetup"><div class="content"><h4 class="title">Meetup</h4> \n ' + '<div class="userprofile"> \n ' + '<img class="avatar" src="' + result['data']['photo']['thumb_link'] + '"> \n' + '<div class="info">' + '<span class="name">' + result['data']['name'] + '</span> \n ' + '<span class="location">' + result['data']['city'] + ', ' + result['data']['state'] + '</span></a> \n ' + '<a href="https://www.meetup.com/members/' + result['data']['id'] + '/"><span class="country">View profile</span></a></div></div></div> \n ' + '<div class="events"></div>');
        }
      });
      $.ajax({
        url: 'https://api.meetup.com/2/events?key=' + meetup_key + '&member_id=' + docs[0]['meetup'] + '&offset=0&format=json&limited_events=False&rsvp=yes,maybe&photo-host=public&page=500&fields=&order=time&desc=false&status=upcoming',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function success(result) {
          var rsvps = result.meta.count;

          if (rsvps == 0) {
            $('.events').append('<span class="noevents">No upcoming events :(</span>');
          } else {
            var events = result.results;

            for (var i = 0; i < events.length; i++) {
              var date = new Date(events[i].time);
              var eventimage = '<time class="date"><span class="day"><span>' + date.getDate() + '</span></span><span class="month"><span>' + date.toLocaleString("en-us", {
                month: "short"
              }) + '</span></span></time>';

              if (events[i].photo_url == null) {
                eventimage = '<time class="date"><span class="day"><span>' + date.getDate() + '</span></span><span class="month"><span>' + date.toLocaleString("en-us", {
                  month: "short"
                }) + '</span></span></time>';
              }

              $('.events').append('<a href="' + events[i].event_url + '"> \n' + '<div class="event"> \n' + '<div class="eventheader">' + eventimage + ' \n ' + '<span class="eventname">' + events[i].name + '</span></div> \n ' + '<div class="eventinfo"> \n ' + '<span class="eventhost"><i class="fal fa-users"></i> ' + events[i].group.name + '</span> \n ' + '<span class="venuename"><i class="fal fa-building"></i> ' + events[i].venue.name + '</span> \n ' + '<span class="venueaddress"><i class="fal fa-map-pin"></i> ' + events[i].venue.address_1 + '</span> \n ' + //'<span class="date"><i class="fas fa-calendar"></i> ' + date.toString("MMM dd") + '</span> \n ' +
              '</div></div></a>');
            }
          }
        }
      });
    }

    if (docs[0]['twitter']) {
      $('.sidebar').append('<div class="widget" style="order:2;><div class="content twitter"><h4 class="title">Twitter</h4><a class="twitter-timeline" data-chrome="nofooter noheader noscrollbar" data-tweet-limit="5" data-link-color="#26a2c7" href="https://twitter.com/' + docs[0]['twitter'] + '?ref_src=twsrc%5Etfw"></a></div></div>');
    }

    if (docs[0]['tableau']) {
      var apifyUrl = 'https://api.apify.com/v1/p9hj4TFpjvujADTJ3/crawlers/wztnovMJiQKzbXWDe/lastExec/results?token=Ycfxu6J2Jyk8HyboKuEw4Jfy7';
    }
  }
});
"use strict";

$(document).ready(function () {
  $('.post-template article .post-content img').materialbox();
  $('.post-content pre').each(function () {
    console.log('pre = ', $(this).height());

    if ($(this).height() >= 400) {
      $(this).append('<div class="fullscreenbtn"><i style="transform: rotate(45deg);" class="far fa-arrows-alt-v"></i></div>');
    }
  });
  $('.fullscreenbtn').on('click', function (event) {
    var height = $(window).height();
    var codeContainer = $(this).closest('pre');
    codeContainer.css('max-height', 'none');
    codeContainer.css('padding', '64px 20px !important');
    $(this).css('opacity', 0);
    codeContainer.animate({
      height: $(window).height()
    }, 1000);
    $('html,body').animate({
      scrollTop: codeContainer.position().top
    });
  });
});
/*const jiradb = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db('hackers');

$(document).ready(function(){


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
            '</div> \n' +
            '<div class="epic ' + cards[i].epic_name + '"><span>' + cards[i].epic_name + '</span> <i class="fas fa-bolt" style=color:' + cards[i].epic_color + ';"></i></div> \n' +
          '</div> \n' +
        '</div>');
      }
      $('#' + status).append('<span class="count"></span>');
    }

    const backlogColumn = document.getElementById("backlog");
    const todoColumn = document.getElementById("todo");
    const progressColumn = document.getElementById("inprogress");
    const doneColumn = document.getElementById("done");



    client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(() =>
      jiradb.collection('jira').find({status: 'Backlog', issuetype: { $in: ['Task', 'Story', 'Integrations', 'Bug']}, priority: { $in: ['Highest', 'High', 'Medium']}}, { limit: 6}).asArray()
    ).then(docs => {
        console.log("Found docs", docs)
        populateCards(docs, 'backlog')
      }).catch(err => {
      console.error(err)
    });

    client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(() =>
      jiradb.collection('jira').find({status: 'To Do', issuetype: { $in: ['Task', 'Story', 'Integration', 'Bug', 'Data', 'Content']}}, { limit: 6}).asArray()
    ).then(docs => {
        console.log("Found docs", docs)
        populateCards(docs, 'todo')
      }).catch(err => {
      console.error(err)
    });

    client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(() =>
      jiradb.collection('jira').find({status: 'In Progress', issuetype: { $in: ['Task', 'Story', 'Integration', 'Bug', 'Content', 'Data']}}, { limit: 6}).asArray()
    ).then(docs => {
        console.log("Found docs", docs)
        populateCards(docs, 'progress')
      }).catch(err => {
      console.error(err)
    });

    client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(() =>
      jiradb.collection('jira').find({status: 'Done', issuetype: { $in: ['Task', 'Story', 'Integrations', 'Bug']}}, { limit: 6}).asArray()
    ).then(docs => {
        console.log("Found docs", docs)
        populateCards(docs, 'done')
      }).catch(err => {
      console.error(err)
    });

    client.callFunction("numCards", ["Backlog"]).then(result => {
        $('#backlog .count').text(result + ' issues');
    });

    client.callFunction("numCards", ["To Do"]).then(result => {
        $('#todo .count').text(result + ' issues');
    });

    client.callFunction("numCards", ["In Progress"]).then(result => {
        $('#progress .count').text(result + ' issues');
    });

    client.callFunction("numCards", ["Done"]).then(result => {
        $('#done .count').text(result + ' issues');
    });


    var swiper = new Swiper('.swiper-container', {
       height: 1000,
       noSwiping: true,
       spaceBetween: 8,
       centeredSlides: false,
       slidesPerView: 4,
       grabCursor: false,
       pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
        },
       breakpoints: {
      // when window width is <= 320px
        1000: {
          slidesPerView: 2,
          noSwiping: false,
          grabCursor: true,
          initialSlide: 0,
          centeredSlides:false
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

   swiper.on('resize', function () {
    swiper.slideTo(0, 300, false);
    swiper.pagination.update();
  });


});
*/
"use strict";
"use strict";

/*====================================================
  TABLE OF CONTENTS
  1. function declaretion
  2. Initialization
====================================================*/
// import { Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk'

/*===========================
 1. function declaretion
 ==========================*/
var themeApp = {
  featuredMedia: function featuredMedia() {
    $(".post").each(function () {
      var thiseliment = $(this);
      var media_wrapper = $(this).find('featured');
      var media_content_image = media_wrapper.find($('img'));
      var media_content_embeded = media_wrapper.find('iframe');

      if (media_content_image.length > 0) {
        $(media_content_image).insertAfter(thiseliment.find('.post-head')).wrap("<div class='featured-media'></div>");
        thiseliment.addClass('post-type-image');
        media_wrapper.remove();
      } else if (media_content_embeded.length > 0) {
        $(media_content_embeded).insertAfter(thiseliment.find('.post-head')).wrap("<div class='featured-media'></div>");
        thiseliment.addClass('post-type-embeded');
      }
    });
  },
  sidebarConfig: function sidebarConfig() {
    if (sidebar_left == true) {
      $('.main-content').addClass('col-md-push-4');
      $('.sidebar').addClass('col-md-pull-8');
    }
  },
  facebook: function facebook() {
    var fb_page = '<iframe src="//www.facebook.com/plugins/likebox.php?href=' + facebook_page_url + '&amp;width&amp;height=258&amp;colorscheme=light&amp;show_faces=true&amp;header=false&amp;stream=false&amp;show_border=false" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:258px; width:100%;" allowTransparency="true"></iframe>';
    $('.fb').append(fb_page);
  },
  googlePlus: function googlePlus() {
    if (badge_type !== "" && google_plus_url !== "") {
      $('body').append('<script src="https://apis.google.com/js/platform.js" async defer></script>');
      var container = $('.google-plus');
      var width = container.width();
      var google_plus_code = '<div class="g-' + badge_type + '" data-width="' + width + '" data-layout="landscape" data-height="150px" data-href="' + google_plus_url + '" data-rel="publisher"></div>';
      container.append(google_plus_code);
    }
  },
  highlighter: function highlighter() {
    $('pre code').each(function (i, block) {
      hljs.highlightBlock(block);
    });
  },
  backToTop: function backToTop() {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('#back-to-top').fadeIn();
      } else {
        $('#back-to-top').fadeOut();
      }
    });
    $('#back-to-top').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 1000);
      return false;
    });
  },
  adjustTileHeight: function adjustTileHeight() {
    var tile = $('.archive .tag-wrapper');
    var max_height = 0;

    if (tile.length > 0) {
      $.each(tile, function () {
        var h = $(this).height();
        max_height = h > max_height ? h : max_height;
      });
      tile.height(max_height);
    }
  },
  mobileNavigation: function mobileNavigation() {
    $('nav').on('click', function (event) {
      $('.navbar-collapse').toggleClass("active");
      console.log('clicked');
    });
  },
  resizeIframe: function resizeIframe(iframe) {
    iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";
  },
  init: function init() {
    themeApp.featuredMedia();
    themeApp.sidebarConfig();
    themeApp.facebook();
    themeApp.highlighter();
    themeApp.backToTop();
    themeApp.adjustTileHeight();
    themeApp.mobileNavigation(); //themeApp.tags();
  }
  /*===========================
  2. Initialization
  ============= =============*/

};
$(document).ready(function () {
  themeApp.init();
});