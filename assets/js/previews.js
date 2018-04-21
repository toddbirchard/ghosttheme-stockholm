$( document ).ready(function() {
  var api_url = 'https://api.linkpreview.net'
  var key = '5adafb08baeedbb9a1d8ce57f597447fdd34bd1e3f7b8'

  $( ".kg-card-markdown a" ).each(function( index ) {
    $.ajax({
        url: api_url + "?key=" + key + " &q=" + $( this ).text(),
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            //console.log($( this ).parent());
            $( '.kg-card-markdown a:nth-of-type(' + index + ')' ).after('<p><a href="' + result.url + '"><div class="linkpreview"><img src="' + result.image + '"><div class="link-info"><h4>' + result.title +'</h4><p>' + result.description +'</p></div></div></a></p>"');
            console.log('this = ' + this['url']);
            console.log('result = ' + result['url']);
        },
    })
  });
});
