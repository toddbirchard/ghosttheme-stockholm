$( document ).ready(function() {
  var api_url = 'https://api.linkpreview.net';

  $( ".kg-card-markdown a" ).each(function( index, element ) {

    function verify(input) {
      if (input != "") {
        return input;
      } else {
        return "https://hackers.nyc3.digitaloceanspaces.com/linkpreview.jpg";
      }
    }

    $.ajax({
        url: api_url + "?key=" + linkpreview_key + " &q=" + $( this ).text(),
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            var link_image = verify(result.image);
            //console.log("result.image = " + typeof(result.image));
            $( element ).after('<a href="' + result.url + '"><div class="link-preview"><div class="preview-image" style="background-image:url(' + link_image + ');"></div><div style="width:70%;" class="link-info"><h4>' + result.title +'</h4><p>' + result.description +'</p></div><br><a href="' + result.url + '" class="url-info"><i class="far fa-link"></i>' + result.url + '</a></div></a>');
            $( element ).remove();
        }
    })
  });
});
