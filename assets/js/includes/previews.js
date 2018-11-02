$(document).ready(function() {

      function postLinkPreviews() {
        $(".post-content > p > a").each(function(index, element) {
            $.ajax({
              url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/hackers-uangn/service/get_link_preview/incoming_webhook/get_link_preview',
              contentType: "application/json",
              data: {
                q: $(element).text(),
                key: results
              },
              dataType: 'jsonp',
              success: function(result) {
                $(element).after('<a href="' + result.url + '"><div class="link-preview">' + result.image + '<div class="link-info"><h4>' + result.title + '</h4><p>' + result.description + '</p><span class="url-info"><i class="far fa-link"></i>' + result.url.split('://')[1] + '</span></div></div></a>');
                $(element).remove();
              }
            });
          }
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
