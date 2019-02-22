function author_medium(medium) {
  var medium_key = process.env.medium_key;
  console.log('medium= ' + medium);
  MediumWidget.Init({
    renderTo: '#medium-widget',
    params: {
      "resource": "https://medium.com/@toddbirchard.",
      "postsPerLine": 1,
      "limit": 4,
      "picture": "small",
      "fields": ["claps", "publishAt"],
      "ratio": "original"
    }
  });
  $('#medium').css('display', 'block');
}
