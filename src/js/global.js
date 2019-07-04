import '../less/global.less';
import 'lazysizes';
import {initialize_search} from './global/search.js';
import {load_series_icons} from './global/seriesicons.js';
import {load_tag_icons} from './global/tags.js';
import {order_hack} from './global/post_order_hack.js';

/*===========================
 1. Function Declaration
 ==========================*/


 let ghostContentAPIKey = process.env.GHOST_CONTENT_API_KEY;

  function fallback_images() {
    var images = $('picture');
    $(images).each(function() {
      var imagepaths = $(this).find('source:last-of-type').attr('srcset');
      var standardres = String(imagepaths).split(' @1x')[0];
      var highres = String(imagepaths).split(' @1x,')[1];
      var fallback_src = imagepaths.replace('webp', 'jpg');
      var new_srcset = '<source srcset="' + fallback_src + '">';
      $(this).find('source:last-of-type').after(new_srcset);
    });
    picturefill({
      elements: [document.getElementsByName('picture')]
    });
  }

  function retina_images() {
    $('img').attr('data-rjs', 2);
    Retina();
  }

/* ===========================
2. Initialization
=========================== */
$(document).ready(function() {
  //fallback_images();
  retina_images();
  // load_tag_icons();
  // load_series_icons();
  initialize_search(ghostContentAPIKey);
  order_hack();
});
