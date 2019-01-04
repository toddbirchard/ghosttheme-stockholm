$(document).ready(function() {

      function authorLinkPreviews() {
          $(".author-website a").each(function(index, element) {
            $.ajax({
              url: 'https://us-central1-hackersandslackers-204807.cloudfunctions.net/link-preview-endpoint' + '?url=' + $(this).text(),
              contentType: "application/json",
              dataType: 'json',
              success: function(result) {
                $('.author-website').append('<a href="' + result.url + '"><div class="link-preview" style="background:url(' + result.image + ')"><h4>' + result.title + '</h4><i class="fas fa-link"></i></div></a>');
                $(element).remove();
              }
            });
          });
      }

      if ($('.author-template').length) {
        authorLinkPreviews();
      }
});
