$(document).ready(function() {
  var api_url = 'https://api.linkpreview.net/';

  function verifyImage(input) {
    if (input.length > 0) {
      return '<div class="preview-image" style="background-image:url(' + input + ');"></div>'
    } else {
      return "";
    }
  }

  function verifyTitle(input) {
    if (input.title == "") {
      return input.url;
    } else {
      return input.title;
    }
  }

  function postLinkPreviews() {
    $(".post-content p > a").each(function(index, element) {
      $.ajax({
        url: api_url + '?key=' + linkpreview_key + '&q=' + $(this).text(),
        contentType: "application/json",
        dataType: 'json',
        success: function(result) {
          var link_image = verifyImage(result.image);
          var verify_title = verifyTitle(result);
          $(element).after('<a href="' + result.url + '"><div class="link-preview">' + link_image + '<div class="link-info"><h4>' + verify_title + '</h4><p>' + result.description + '</p><span class="url-info"><i class="far fa-link"></i>' + result.url.split('://')[1] + '</span></div></div></a>');
          $(element).remove();
        }
      });
    });
  }

  function authorLinkPreviews() {
    $(".author-website a").each(function(index, element) {
      $.ajax({
        url: api_url + "?key=" + linkpreview_key + " &q=" + $(this).text(),
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
