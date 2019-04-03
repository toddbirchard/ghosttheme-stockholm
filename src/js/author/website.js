const fetch = require('node-fetch');

function author_website(data) {
  var website = data['website'];
  if (website) {
    var url = 'https://us-east1-hackersandslackers-204807.cloudfunctions.net/linkpreview-endpoint?url=' + website;
    var headers = {
      "Content-Type": "application/json"
    };
    fetch(url, {
      method: 'GET',
      headers: headers
    }).then((res) => {
      return res.json()
    }).then((json) => {
      console.log(json);
      $('.sidebar').append('<div class="widget" style="order: 0;"> \n' +
      '<div class="content"><h4 class="title">Website</h4>  \n' +
      '<a href="' + json.url + '">  \n' +
      '<div class="link-preview" style="background:url(' + json.image + ')"> \n' +
      '<a href="' + json.url + '">' + json.title + '</a><i class="fas fa-link"></i> \n' +
      '</div></a></div></div>');
    });
  }
}
