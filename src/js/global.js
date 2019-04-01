import '../less/global.less';
import './global/analytics.js';
import {search} from './global/search.js';
import {seriesicons} from './global/seriesicons.js';
import {tags} from './global/tags.js';

/*====================================================
  TABLE OF CONTENTS
  1. Function Declaration
  2. Initialization
====================================================*/
/*===========================
 1. Function Declaration
 ==========================*/

var globalFunctions = {
  fallbackImages: function(){
    var images = $('picture');
    $(images).each(function(){
      var imagepaths = $(this).find('source:last-of-type').attr('srcset');
      var standardres = String(imagepaths).split(' @1x')[0];
      var highres = String(imagepaths).split(' @1x,')[1];
      var fallback_src = imagepaths.replace('webp', 'jpg');
      var new_srcset = '<source srcset="' + fallback_src + '">';
      $(this).find('source:last-of-type').after(new_srcset);
      console.log('new_srcset = ' + new_srcset);
    });
    picturefill({
      elements: [ document.getElementsByName('picture') ]
    });
  },
  retina: function() {
    // Order matters!!
    $('img').attr('data-rjs', 2);
    Retina();
  },
  init: function() {
    globalFunctions.retina();
    globalFunctions.fallbackImages();
  }
};

/* ===========================
2. Initialization
=========================== */
$(document).ready(function() {
  globalFunctions.init();
  tags();
  seriesIcons();
  search();
});
