export function author_medium(medium, medium_key) {

  MediumWidget.Init({
    renderTo: '#medium-widget',
    params: {
      "resource": "https://medium.com/" + medium,
      "postsPerLine": 1,
      "limit": 3,
      "picture": "small",
      "fields": [
        "description", "claps", "publishAt"
      ],
      "ratio": "square",
      "picture": "small"
    }
  });
  $('#medium').css('display', 'block');
}
