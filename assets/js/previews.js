$(document).ready(function() {

  function remove_images() {
    $('img').each(function(index, element) {
      if ($(this).attr('src') == 'null') {
        $(this).parent().remove();
      }
    });
  }

  function postLinkPreviews() {
    $(".post-content > p > a").each(function(index, element) {
      $(element).html('<div class="ui placeholder"> <div class="image header"> <div class="line"></div> <div class="line"></div> </div> <div class="paragraph"> <div class="line"></div> <div class="line"></div> <div class="line"></div> <div class="line"></div> <div class="line"></div> </div><div class="gap">  </div><div class="column left"></div> <div class="column right"></div></div></div>');
      $.ajax({
        url: 'https://us-east1-hackersandslackers-204807.cloudfunctions.net/linkpreview-endpoint?url=' + $(element).attr('href'),
        async: true,
        contentType: "application/json",
        data: JSON.stringify({q: $(element).attr('href')}),
        dataType: 'json',
        success: function(result) {
          $(element).html('<a href="' + result.url + '"><div class="link-preview"> \n ' +
            '<div class="link-info"> \n ' +
            '<div class="link-preview-image"><img alt="' + result.title + '" src="' + result.image + '"></div> \n' +
            '<div class="detail-stack"> \n ' +
            '<h4 class="title-desktop">' + result.title + '</h4> \n ' +
            '<p>' + result.description + '</p> \n' +
            '<h4 class="title-mobile">' + result.title + '</h4> \n ' +
            '<span class="url-info"><i class="far fa-link"></i>' + result.url.split('://')[1] + '</span> \n ' +
          '</div></div></a>');
          //$(element).remove();
          remove_images();
        }
      });
    });
  }

  function authorLinkPreviews() {
    $(".author-website a").each(function(index, element) {
      $.ajax({
        url: 'https://us-east1-hackersandslackers-204807.cloudfunctions.net/linkpreview-endpoint?url=' + $(this).text(),
        contentType: "application/json",
        dataType: 'json',
        success: function(result) {
          $('.author-website').append('<a href="' + result.url + '"><div class="link-preview" style="background:url(' + result.image + ')"><h4>' + result.title + '</h4><i class="fas fa-link"></i></div></a>');
          $(element).remove();
        }
      });
    });
  }

  postLinkPreviews();

  if ($('.author-template').length) {
    authorLinkPreviews();
  }
});
