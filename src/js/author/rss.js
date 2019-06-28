export function author_rss(rss) {
  if (rss){
    jQuery(function($) {
        $(".widget.rss").rss("http://toddbirchard.com/rss")
      })
  }
}
