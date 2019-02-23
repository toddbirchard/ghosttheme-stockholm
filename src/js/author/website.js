function author_website(docs) {
  var website = docs[0]['website']
  if (website) {
    var url = 'https://us-central1-hackersandslackers-204807.cloudfunctions.net/link-preview-endpoint?url=' + website;
    var headers = {
      "Content-Type": "application/json"
    }
    fetch(url, { method: 'GET', headers: headers})
      .then((res) => {
          return res.json()
      })
      .then((json) => {
          $('.sidebar').append('<div class="widget" style="order: 0;"><div class="content"><h4 class="title">Website</h4><a href="' + json.url + '"><div class="link-preview" style="background:url(' + json.image + ')"><a>' + json.title + '</a><i class="fas fa-link"></i></div></a></div></div>');
      });
  }
}
