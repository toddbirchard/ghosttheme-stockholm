import '../less/global.less';
import 'lazysizes';
import {initialize_search} from './global/search.js';
import {load_tag_icons} from './global/tags.js';
import {order_hack} from './global/post_order_hack.js';

/*===========================
 1. Function Declaration
 ==========================*/


function retina_images() {
  $('img').attr('data-rjs', 2);
  Retina();
}

/* ===========================
2. Initialization
=========================== */
$(document).ready(function() {
  retina_images();
  // initialize_search(ghostContentAPIKey);
  order_hack();
});
