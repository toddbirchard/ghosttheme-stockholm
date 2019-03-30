function author_medium(medium) {
  var medium_key = process.env.medium_key;
  MediumWidget.Init({
    renderTo: '#medium-widget',
    params: {
      "resource": "https://medium.com/" + medium,
      "postsPerLine": 1,
      "limit": 4,
      "picture": "small",
      "fields": ["claps", "publishAt"],
      "ratio": "original"
    }
  });
  $('#medium').css('display', 'block');
}
