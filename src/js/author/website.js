export function author_website(website) {
  if (website) {
    $(".website").css('display', 'block');
    var endpoint_url = process.env.LINK_PREVIEW_ENDPOINT + '?url=' + website;
    console.log('endpoint_url = ' + endpoint_url);

    $.ajax({
      method: 'GET',
      url: endpoint_url,
      dataType: 'json',
      success: function(json) {
        $('.website-link').remove();
        $('.widget.website').append('<a href="' + json.url + '">  \n' + '<div class="link-preview" style="background:url(' + json.image + ')"> \n' + '<a href="' + json.url + '" class="link-name">' + json.title + '</a><i class="far d fa-link"></i> \n' + '</div></a>');
      }
    });
  }
}
