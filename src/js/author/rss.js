export function author_rss(rss) {
  if (rss) {
    $(".widget.rss").css('display', 'block');

    jQuery(function($) {
      $(".widget.rss").rss("https://toddbirchard.com/rss", {
        entryTemplate:'<li><div class="rss-image">{teaserImage}</div> \n'
        + '<div class="rss-details"> \n'
          + '<a class="rss-title" href="{url}">{title}</a> \n'
          + '<p class="rss-description">{shortBodyPlain}</p> \n'
        + '</div></li>'
      });
    })
  }
}
