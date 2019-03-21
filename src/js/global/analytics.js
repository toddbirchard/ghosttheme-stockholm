/*$(document).ready(function() {

  var date = new Date();
  var title = document.title;
  var userid = Math.round(+new Date()/1000);
  //var created = new Date(date.getMonth(), date.getDate(), date.getFullYear());

  function showVisitorInfo(info) {
    var country = $(".newsletter-form .country").text(info.countryName + " [" + info.countryCode + "]");
    var state = $(".newsletter-form .stateProv").text(info.stateProv);
    var city = $(".newsletter-form .city").text(info.city);
    mixpanel.identify(userid);
    mixpanel.register({
        "country": country,
        "state": state,
        "city": city,
        "created": created,
        "landingpage": document.referrer
    });
  }

    $('.social-btns .btn').each(function(index, element) {
      $(this).on('click', function(){
        mixpanel.track_links(this, "visited " + $(this).attr('name'), {
           "referrer": document.referrer,
           "visited": $(this).attr('name'),
       });
      });
    });

    mixpanel.people.set();

    mixpanel.track(title);
    mixpanel.track_links("nav a", "Used Main Nav", {
        "referrer": document.referrer
    });

    mixpanel.track_links(".featured-media a", "Clicked 'featured image'", {
        "referrer": document.referrer,
        "module": "postpreview",

    });

    mixpanel.track_links(".post-permalink a", "Clicked 'read' button", {
        "referrer": document.referrer
    });

    mixpanel.track_forms('.form-group', 'Subscribed to email');

    mixpanel.register_once({
    'First Login Date': new Date().toISOString()
	});

    mixpanel.track_links(".share-icons a ", "Shared post on social media.", {
        "referrer": document.referrer
    });

    //mixpanel.track_forms('#sidebar-form', 'Subscribed', {'email': });
});
*/