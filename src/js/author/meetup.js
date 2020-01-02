export function author_meetup(meetup) {
  const meetup_key = process.env.MEETUP_API_KEY;

  if (meetup) {
    let eventsURL = 'https://api.meetup.com/2/events?key=' + meetup_key + '&member_id=' + meetup + '&rsvp=yes,maybe&desc=false&status=upcoming';

    $.ajax({
      method: 'GET',
      url: eventsURL,
      dataType: 'jsonp',
      success: function(response) {
        let results = response['results'];
        if (results.length){
          for (var i = 0; i < results.length; i++) {
            let name = results[i]['name'];
            let photo = results[i]['photo_url'];
            let time = new Date(results[i]['time']).toDateString();
            let url = results[i]['event_url'];
            let group = results[i]['group']['name'];
            let city = 'N/A';

            if (results[i]['venue']) {
              city = results[i]['venue']['city'];
            }

            let event = '<div class="meetup-event"> \
            <a href="' + url + '"> \
              <div class="meetup-event-name">' + name + '</div> \
              <span class="meetup-event-time"><i class="fal fa-calendar"></i>  ' + time + '</span> \
              <span class="meetup-event-group"><i class="fas fa-user-friends"></i>  ' + group + '</span> \
              <span class="meetup-event-city"><i class="fas fa-map-pin"></i>  ' + city + '</span> \
            </a></div>';
            $('.meetup .meetup-events').append(event);
          }
        } else {
          $('.meetup .meetup-events').append('No upcoming RSVPs.');
        }
      }
    });
    $(".meetup").css('display', 'block');
  }
}
