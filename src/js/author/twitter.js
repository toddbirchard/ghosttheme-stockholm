export function author_twitter(twitter) {
  if (twitter) {
    let embedCode = '<a class="twitter-timeline" href="https://twitter.com/' + twitter + '" data-chrome="noheader nofooter noborders noscrollbar transparent"></a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';
    $('.widget.twitter').append(embedCode);
  }
}
