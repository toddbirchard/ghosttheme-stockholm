$( document ).ready(function() {
  var api_url = 'https://api.linkpreview.net';

  $( ".kg-card-markdown a" ).each(function( index, element ) {

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

    $.ajax({
        url: api_url + "?key=" + linkpreview_key + " &q=" + $( this ).text(),
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
          console.log(result);
            var link_image = verifyImage(result.image);
            var verify_title = verifyTitle(result);
            //console.log("result.image = " + typeof(result.image));
            $( element ).after('<a href="' + result.url + '"><div class="link-preview">' + link_image + '<div class="link-info"><h4>' + verify_title +'</h4><p>' + result.description +'</p><span class="url-info"><i class="far fa-link"></i>' + result.url + '</span></div></div></a>');
            $( element ).remove();
        }
    })
  });
});
