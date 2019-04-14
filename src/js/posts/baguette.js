import baguetteBox from 'baguettebox.js';

export function enable_baguettebox() {
  $('main img').each(function(obj, i) {
    const imagesrc = $(this).attr('src');
    const caption = $(this).closest('figure').find('figcaption').text();
    $(this).wrap('<a href="' + imagesrc + '" data-caption="' + caption + '"></a>');
  });
  baguetteBox.run('.post-content', {
    captions: function(element) {
      return element.getElementsByTagName('img')[0].alt;
    },
    animation: 'fadeIn',
    noScrollbars: true
  });
}
