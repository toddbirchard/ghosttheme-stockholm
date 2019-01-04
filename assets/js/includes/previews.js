$(document).ready(function() {

      function postLinkPreviews() {
        $(".post-content > p > a").each(function(index, element) {
            $.ajax({
              url: 'https://us-central1-hackersandslackers-204807.cloudfunctions.net/link-preview-endpoint?url=' + $(element).attr('href'),
              async: true,
              contentType: "application/json",
              data: JSON.stringify({
                q: $(element).attr('href'),
              }),
              dataType: 'json',
              success: function(result) {
                console.log(result)
                $(element).after('<a href="' + result.url + '"><div class="link-preview"><img src="' + result.image + '"><div class="link-info"><h4>' + result.title + '</h4><p>' + result.description + '</p><span class="url-info"><i class="far fa-link"></i>' + result.url.split('://')[1] + '</span></div></div></a>');
                $(element).remove();
              }
            });
          });
        }

      function authorLinkPreviews() {
          $(".author-website a").each(function(index, element) {
            $.ajax({
              url: 'https://us-central1-hackersandslackers-204807.cloudfunctions.net/link-preview-endpoint?url=' + $(this).text(),
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
