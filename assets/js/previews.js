$(document).ready(function() {

  function remove_images() {
    $('img').each(function() {
      if ($(this).attr('src') == 'null') {
        $(this).parent().remove();
      }
    });
  }

  function postLinkPreviews() {
    $("main a").each(function(index, element) {
      var link = $(this).attr('href');
      console.log('link = ' + link);
      var url = 'https://us-east1-hackersandslackers-204807.cloudfunctions.net/linkpreview-endpoint?url=' + link;
      $(this).html('<div class="ui placeholder"> <div class="image header"> <div class="line"></div> <div class="line"></div> </div> <div class="paragraph"> <div class="line"></div> <div class="line"></div> <div class="line"></div> <div class="line"></div> <div class="line"></div> </div><div class="gap">  </div><div class="column left"></div> <div class="column right"></div></div></div>');
      var headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
      fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        headers: headers
      }).then((json) => {
        $(element).html('<a href="' + json.url + '"><div class="link-preview"> \n ' +
          '<div class="link-info"> \n ' +
          '<div class="link-preview-image"><img alt="' + json.title + '" src="' + json.image + '"></div> \n' +
          '<div class="detail-stack"> \n ' +
          '<h4 class="title-desktop">' + json.title + '</h4> \n ' +
          '<p>' + json.description + '</p> \n' +
          '<h4 class="title-mobile">' + json.title + '</h4> \n ' +
          '<span class="url-info"><i class="far fa-link"></i>' + json.url.split('://')[1] + '</span> \n ' +
        '</div></div></a>');
        remove_images();
      });
    });
  }

  function authorLinkPreviews() {
    $(".author-website a").each(function(index, element) {

      var url = 'https://us-east1-hackersandslackers-204807.cloudfunctions.net/linkpreview-endpoint?url=' + $(this).text();
      var headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
      fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        headers: headers
      }).then((json) => {
        $('.author-website').append('<a href="' + json.url + '"><div class="link-preview" style="background:url(' + json.image + ')"><h4>' + json.title + '</h4><i class="fas fa-link"></i></div></a>');
        $(element).remove();
      });
    });
  }

  postLinkPreviews();

  if ($('.author-template').length) {
    authorLinkPreviews();
  }
});
