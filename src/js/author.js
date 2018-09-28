$( document ).ready(function() {


function authorSidebar(docs) {
    if (docs[0]['website']) {
      $.ajax({
        url: 'https://api.linkpreview.net/?key=' + linkpreview_key + '&q=' + docs[0]['website'],
        contentType: "application/json",
        dataType: 'json',
        success: function(result) {
          $('.sidebar').append('<div class="widget" style="order: 0;"><div class="content"><h4 class="title">Website</h4><a href="' + result.url + '"><div class="link-preview" style="background:url(' + result.image + ')"><a>' + result.title +
            '</a><i class="fas fa-link"></i></div></a></div></div>');
        }
      });
    }

    if (docs[0]['github']) {
      $('.sidebar').append('<div class="widget"><div class="content"><h4 class="title">Github</h4><div id="github-card" data-max-repos="3" data-header-text="Repositories" data-username="' + docs[0]['github'] + '"></div></div></div>');
    }

    /*if (docs[0]['linkedin']) {
      $('.sidebar').append('<script src="//platform.linkedin.com/in.js" type="text/javascript"></script><script type="IN/MemberProfile" data-id="http://www.linkedin.com/in/' + docs[0]['linkedin'] + '" data-format="inline" data-related="false"></script>');
    }*/

    if (docs[0]['meetup']) {
      $.ajax({
        url: 'https://api.meetup.com/members/' + docs[0]['meetup'] + '?key=' + meetup_key,
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(result) {
          //console.log("JSON.stringify(result) = " + JSON.stringify(result));
          $('.sidebar').append('<div class="widget meetup"><div class="content"><h4 class="title">Meetup</h4> \n ' +
            '<div class="userprofile"> \n ' +
            '<img class="avatar" src="' + result['data']['photo']['thumb_link'] + '"> \n' +
            '<div class="info">' +
            '<span class="name">' + result['data']['name'] + '</span> \n ' +
            '<span class="location">' + result['data']['city'] + ', ' + result['data']['state'] + '</span></a> \n ' +
            '<a href="https://www.meetup.com/members/' + result['data']['id'] + '/"><span class="country">View profile</span></a></div></div></div> \n ' +
            '<div class="events"></div>');
        }
      });

      $.ajax({
        url: 'https://api.meetup.com/2/events?key=' + meetup_key + '&member_id=' + docs[0]['meetup'] + '&offset=0&format=json&limited_events=False&rsvp=yes,maybe&photo-host=public&page=500&fields=&order=time&desc=false&status=upcoming',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(result) {
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
                //eventimage = "https://hackers.nyc3.digitaloceanspaces.com/meetup.png"
                eventimage = '<time class="date"><span class="day"><span>' + date.getDate() + '</span></span><span class="month"><span>' + date.toLocaleString("en-us", { month: "short" }) + '</span></span></time>';
              }
              $('.events').append(
                '<a href="' + events[i].event_url + '"> \n' +
                '<div class="event"> \n' +
                '<div class="eventheader">' + eventimage + ' \n ' +
                '<span class="eventname">' + events[i].name + '</span></div> \n ' +
                '<div class="eventinfo"> \n ' +
                '<span class="eventhost"><i class="fal fa-users"></i> ' + events[i].group.name + '</span> \n ' +
                '<span class="venuename"><i class="fal fa-building"></i> ' + events[i].venue.name + '</span> \n ' +
                '<span class="venueaddress"><i class="fal fa-map-pin"></i> ' + events[i].venue.address_1 + '</span> \n ' +
                //'<span class="date"><i class="fas fa-calendar"></i> ' + date.toString("MMM dd") + '</span> \n ' +
                '</div></div></a>');
            }
          }
        }
      });
    }

    if (docs[0]['twitter']) {
      $('.sidebar').append(
        '<div class="widget" style="order:2;><div class="content twitter"><h4 class="title">Twitter</h4><a class="twitter-timeline" data-chrome="nofooter noheader noscrollbar" data-tweet-limit="5" data-link-color="#26a2c7" href="https://twitter.com/' +
        docs[0]['twitter'] + '?ref_src=twsrc%5Etfw"></a></div></div>');
    }

    if (docs[0]['tableau']) {
      var apifyUrl = 'https://api.apify.com/v1/p9hj4TFpjvujADTJ3/crawlers/wztnovMJiQKzbXWDe/lastExec/results?token=Ycfxu6J2Jyk8HyboKuEw4Jfy7';
    }
  }

});
