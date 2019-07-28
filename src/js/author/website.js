export function author_website(website) {
  if (website) {
    $(".website").css('display', 'block');
    var endpoint_url = process.env.LINK_PREVIEW_ENDPOINT + '?url=' + website;

    $.ajax({
      method: 'GET',
      url: endpoint_url,
      dataType: 'json',
      success: function(json) {
        $('.website-link').remove();
        $('.widget.website').append('<div class="website-preview" ><a href="' + json.url + '">  \n'
        + '<div class="website-image" style="background:url(' + json.image + ')"></div> \n'
        + '<div class="website-details"> \n '
          + '<a href="' + json.url + '" class="website-title">' + json.title + '</a> \n '
          + '<p class="website-description">' + json.description + '</p>'
        + '</div></div></a>');
      }
    });
  }
}
