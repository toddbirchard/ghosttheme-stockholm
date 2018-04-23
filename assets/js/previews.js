$( document ).ready(function() {
  var api_url = 'https://api.linkpreview.net'
  var key = '5adafb08baeedbb9a1d8ce57f597447fdd34bd1e3f7b8'

  $( ".kg-card-markdown a" ).each(function( index, element ) {

    function verify(input) {
      if (input != "") {
        return input
      } else {
        return "https://hackers.nyc3.digitaloceanspaces.com/linkpreview.jpg"
      }
    }

    $.ajax({
        url: api_url + "?key=" + key + " &q=" + $( this ).text(),
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            var link_image = verify(result.image);
            //console.log("result.image = " + typeof(result.image));
            $( element ).after('<a href="' + result.url + '"><div class="link-preview"><div class="preview-image" style="background-image:url(' + link_image + ');"></div><div style="width:70%;" class="link-info"><h4>' + result.title +'</h4><p>' + result.description +'</p><i class="far fa-link"></i><a class="url-info" href="' + result.url + '">' + result.url + '</a></div></div></a>');
            $( element ).remove();
        }
    })
  });
});
