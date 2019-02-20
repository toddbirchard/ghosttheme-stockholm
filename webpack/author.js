import '../src/less/pages.less';
import '../src/less/author.less';
import '../assets/js/includes/gh-profile-card.min.js';
const fetch = require('node-fetch');

$(document).ready(function() {

  if ($('body').hasClass('author-template')) {

    var meetup_key = process.env.meetup_key;
    var medium_key = process.env.medium_key;

    function author_website(docs) {
      console.log(docs[0]['website']);
      if (docs[0]['website']) {
        $.ajax({
          url: 'https://us-central1-hackersandslackers-204807.cloudfunctions.net/link-preview-endpoint?url=' + docs[0]['website'],
          contentType: "application/json",
          dataType: 'json',
          success: function(result) {
            $('.sidebar').append('<div class="widget" style="order: 0;"><div class="content"><h4 class="title">Website</h4><a href="' + result.url + '"><div class="link-preview" style="background:url(' + result.image + ')"><a>' + result.title + '</a><i class="fas fa-link"></i></div></a></div></div>');
          }
        });
      }
    }

    function createGithubCard(docs) {
      console.log(docs[0]['github']);
      if (docs[0]['github']) {
        $('.sidebar').append('<div class="widget"><div class="content"><h4 class="title">Github</h4><div id="github-card" data-max-repos="3" data-header-text="Repositories" data-username="' + docs[0]['github'] + '"></div></div></div>');
      }
    }

    function createMeetupCard(docs) {
      var meetup = docs[0]['meetup'];
      console.log('meetup = ', meetup);
      $.ajax({
        url: 'https://api.meetup.com/members/' + meetup + '?key=' + meetup_key,
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(ajaxResult) {
          $('.sidebar').append('<div class="widget meetup"><h3 class="title">Meetup</h3><div class="widget-body"> \n ' + '<div class="userprofile"> \n ' + '<img class="avatar" src="' + ajaxResult['data']['photo']['thumb_link'] + '" data-rjs="3" > \n' + '<div class="info">' + '<span class="name">' + ajaxResult['data']['name'] + '</span> \n ' + '<span class="location">' + ajaxResult['data']['city'] + ', ' + ajaxResult['data']['state'] + '</span></a> \n ' + '<a href="https://www.meetup.com/members/' + ajaxResult['data']['id'] + '/"><span class="country">View profile</span></a></div></div> \n ' + '<div class="events"></div></div>');
        }
      });

      $.ajax({
        url: 'https://api.meetup.com/2/events?key=' + meetup_key + '&member_id=' + meetup + '&offset=0&format=json&limited_events=False&rsvp=yes,maybe&photo-host=public&page=500&fields=&order=time&desc=false&status=upcoming',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(ajaxResult2) {
          var rsvps = ajaxResult2.meta.count;
          if (rsvps == 0) {
            $('.events').append('<span class="noevents">No upcoming events :(</span>');
          } else {
            var events = ajaxResult2.results;

            for (var i = 0; i < events.length; i++) {
              var date = new Date(events[i].time);
              var eventimage = '<time class="date"><span class="day"><span>' + date.getDate() + '</span></span><span class="month"><span>' + date.toLocaleString("en-us", {month: "short"}) + '</span></span></time>';
              if (events[i].photo_url == null) {
                //eventimage = "https://hackers.nyc3.digitaloceanspaces.com/meetup.png"
                eventimage = '<time class="date"><span class="day"><span>' + date.getDate() + '</span></span><span class="month"><span>' + date.toLocaleString("en-us", {month: "short"}) + '</span></span></time>';
              }
              $('.events').append('<a href="' + events[i].event_url + '"> \n' + '<div class="event"> \n' + '<div class="eventheader">' + eventimage + ' \n ' + '<span class="eventname">' + events[i].name + '</span></div> \n ' + '<div class="eventinfo"> \n ' + '<span class="eventhost"><i class="fal fa-users"></i> ' + events[i].group.name + '</span> \n ' + '<span class="venuename"><i class="fal fa-building"></i> ' + events[i].venue.name + '</span> \n ' + '<span class="venueaddress"><i class="fal fa-map-pin"></i> ' + events[i].venue.address_1 + '</span> \n ' +
              //'<span class="date"><i class="fas fa-calendar"></i> ' + date.toString("MMM dd") + '</span> \n ' +
              '</div></div></a>');
            }
          }
        }
      });
    }

    function current_author() {
      var sPath = String(document.location.pathname);
      var slug = sPath.substring(sPath.lastIndexOf("/") - 4);
      slug = slug.replace('/', '');
      return slug;
    }



    function getauthor(callback){
      var slug = current_author();
      var url ='https://apisentris.com/api/v1/authors?slug=like.' + slug;
      var headers = {
        "Content-Type": "application/json",
        "client_id": "140000",
        "access_token": "6OMcDqLWFV7DuVnxAxJSmQ"
      }
      fetch(url, { method: 'GET', headers: headers})
        .then((res) => {
            console.log(res)
            return res.json()
        })
        .then((json) => {
            console.log(json);
            author_website(json);
            createGithubCard(json);
            createMeetupCard(json);
        });
      /*return fetch('https://apisentris.com/api/v1/authors?slug=like.' + slug, {
          method: 'get',
          headers: {
            "Content-Type": "application/json",
            "client_id": "140000",
            "access_token": "6OMcDqLWFV7DuVnxAxJSmQ"
          }
      })
      .then(res => res.json())
      .then(json => console.log(json));*/
      //.then(json => author_website(json))
      //.then(json => createGithubCard(json));
      //.then(json => createMeetupCard(json));
    }
    getauthor();
    //getauthor(function(result){return result;});
    /*author_website(json);
    createGithubCard(json);
    createMeetupCard(json);*/
  }
});
