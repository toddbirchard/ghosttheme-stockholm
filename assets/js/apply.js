!function(n){var e={};function t(o){if(e[o])return e[o].exports;var a=e[o]={i:o,l:!1,exports:{}};return n[o].call(a.exports,a,a.exports,t),a.l=!0,a.exports}t.m=n,t.c=e,t.d=function(n,e,o){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:o})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var a in n)t.d(o,a,function(e){return n[e]}.bind(null,a));return o},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=12)}([function(n,e,t){"use strict";var o,a=function(){return void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o},r=function(){var n={};return function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}n[e]=t}return n[e]}}(),i={};function c(n,e,t){for(var o=0;o<e.length;o++){var a={css:e[o][1],media:e[o][2],sourceMap:e[o][3]};i[n][o]?i[n][o](a):i[n].push(d(a,t))}}function s(n){var e=document.createElement("style"),o=n.attributes||{};if(void 0===o.nonce){var a=t.nc;a&&(o.nonce=a)}if(Object.keys(o).forEach((function(n){e.setAttribute(n,o[n])})),"function"==typeof n.insert)n.insert(e);else{var i=r(n.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(e)}return e}var p,u=(p=[],function(n,e){return p[n]=e,p.filter(Boolean).join("\n")});function l(n,e,t,o){var a=t?"":o.css;if(n.styleSheet)n.styleSheet.cssText=u(e,a);else{var r=document.createTextNode(a),i=n.childNodes;i[e]&&n.removeChild(i[e]),i.length?n.insertBefore(r,i[e]):n.appendChild(r)}}function b(n,e,t){var o=t.css,a=t.media,r=t.sourceMap;if(a?n.setAttribute("media",a):n.removeAttribute("media"),r&&btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),n.styleSheet)n.styleSheet.cssText=o;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(o))}}var m=null,f=0;function d(n,e){var t,o,a;if(e.singleton){var r=f++;t=m||(m=s(e)),o=l.bind(null,t,r,!1),a=l.bind(null,t,r,!0)}else t=s(e),o=b.bind(null,t,e),a=function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(t)};return o(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;o(n=e)}else a()}}n.exports=function(n,e,t){return(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=a()),n=t.base?n+t.base:n,e=e||[],i[n]||(i[n]=[]),c(n,e,t),function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){i[n]||(i[n]=[]),c(n,e,t);for(var o=e.length;o<i[n].length;o++)i[n][o]();i[n].length=e.length,0===i[n].length&&delete i[n]}}}},function(n,e,t){"use strict";n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t=function(n,e){var t=n[1]||"",o=n[3];if(!o)return t;if(e&&"function"==typeof btoa){var a=(i=o,c=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(c),"/*# ".concat(s," */")),r=o.sources.map((function(n){return"/*# sourceURL=".concat(o.sourceRoot||"").concat(n," */")}));return[t].concat(r).concat([a]).join("\n")}var i,c,s;return[t].join("\n")}(e,n);return e[2]?"@media ".concat(e[2]," {").concat(t,"}"):t})).join("")},e.i=function(n,t){"string"==typeof n&&(n=[[null,n,""]]);for(var o=0;o<n.length;o++){var a=[].concat(n[o]);t&&(a[2]?a[2]="".concat(t," and ").concat(a[2]):a[2]=t),e.push(a)}},e}},,,,,,,,,,,function(n,e,t){"use strict";t.r(e);t(13),t(15)},function(n,e,t){var o=t(0),a=t(14);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[n.i,a,""]]);var r={insert:"head",singleton:!1},i=(o(n.i,a,r),a.locals?a.locals:{});n.exports=i},function(n,e,t){(e=t(1)(!1)).push([n.i,".page-become-a-contributor .main-content {\n  padding: 50px;\n  margin: auto;\n  /*progressbar*/\n  /*progressbar connectors*/\n  /*marking active/completed steps green*/\n  /*The number of the step and the connector before it = green*/\n}\n@media (max-width: 600px) {\n  .page-become-a-contributor .main-content {\n    padding: 40px 30px;\n  }\n}\n.page-become-a-contributor .main-content h1 {\n  margin: 0;\n}\n@media (max-width: 600px) {\n  .page-become-a-contributor .main-content h1 {\n    line-height: 1.2;\n    font-size: 1.8em;\n  }\n}\n.page-become-a-contributor .main-content form {\n  position: relative;\n  margin-top: 30px;\n}\n.page-become-a-contributor .main-content h2 {\n  font-family: 'Open Sans', sans-serif;\n  text-align: left;\n  font-size: 1.5em;\n  border-bottom: 1px solid #d5dae6;\n  padding-bottom: 7px;\n  font-weight: 400;\n}\n.page-become-a-contributor .main-content fieldset {\n  border: none;\n  display: block;\n  background: white;\n  margin-bottom: 20px;\n  padding-left: 0;\n  padding-right: 0;\n}\n.page-become-a-contributor .main-content fieldset:last-of-type {\n  margin-bottom: 0;\n}\n.page-become-a-contributor .main-content .active {\n  display: block;\n}\n.page-become-a-contributor .main-content p {\n  text-align: left;\n}\n.page-become-a-contributor .main-content label {\n  font-family: 'Open Sans', sans-serif;\n  font-size: 14px;\n  color: #505050;\n  margin-bottom: 5px;\n}\n.page-become-a-contributor .main-content .split-fields {\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: row;\n  justify-content: space-between;\n}\n@media (max-width: 600px) {\n  .page-become-a-contributor .main-content .split-fields {\n    display: block;\n  }\n}\n.page-become-a-contributor .main-content .split-fields .input-field-group {\n  width: 49%;\n}\n@media (max-width: 600px) {\n  .page-become-a-contributor .main-content .split-fields .input-field-group {\n    width: 100%;\n  }\n}\n.page-become-a-contributor .main-content .input-field-group {\n  text-align: left;\n}\n.page-become-a-contributor .main-content input,\n.page-become-a-contributor .main-content textarea {\n  font-family: \"TTNormsPro-Light\", sans-serif;\n  outline: 0;\n  background: #f2f2f2;\n  width: 100%;\n  border: 0 solid;\n  margin: 0 0 15px;\n  padding: 15px;\n  box-sizing: border-box;\n  font-size: 14px;\n  transition: all 0.2s ease-out;\n}\n.page-become-a-contributor .main-content input:hover,\n.page-become-a-contributor .main-content textarea:hover {\n  background: rgba(64, 206, 199, 0.16);\n}\n.page-become-a-contributor .main-content input:hover::placeholder,\n.page-become-a-contributor .main-content textarea:hover::placeholder {\n  color: #72859d;\n  opacity: 0.4;\n  font-family: 'Open Sans', sans-serif !important;\n}\n.page-become-a-contributor .main-content input:hover::after,\n.page-become-a-contributor .main-content textarea:hover::after {\n  color: #8aafb8;\n}\n.page-become-a-contributor .main-content textarea {\n  height: 200px;\n}\n.page-become-a-contributor .main-content .next:active,\n.page-become-a-contributor .main-content .next:focus,\n.page-become-a-contributor .main-content .next:hover {\n  background: #40cebb;\n}\n.page-become-a-contributor .main-content .message {\n  margin: 15px 0 0;\n  color: #b3b3b3;\n  font-size: 12px;\n}\n.page-become-a-contributor .main-content .message a {\n  color: #4CAF50;\n  text-decoration: none;\n}\n.page-become-a-contributor .main-content .register-form {\n  display: none;\n}\n.page-become-a-contributor .main-content .container {\n  position: relative;\n  z-index: 1;\n  margin: 0 auto;\n}\n.page-become-a-contributor .main-content .container:after,\n.page-become-a-contributor .main-content .container:before {\n  content: \" \";\n  display: block;\n  clear: both;\n}\n.page-become-a-contributor .main-content .container .info {\n  margin: 30px auto;\n  text-align: center;\n}\n.page-become-a-contributor .main-content .container .info h1 {\n  margin: 0 0 15px;\n  padding: 0;\n  font-size: 36px;\n  color: #1a1a1a;\n}\n.page-become-a-contributor .main-content .container .info span {\n  color: #4d4d4d;\n  font-size: 12px;\n}\n.page-become-a-contributor .main-content .container .info span a {\n  color: #000000;\n  text-decoration: none;\n}\n.page-become-a-contributor .main-content .container .info span .fa {\n  color: #EF3B3A;\n}\n.page-become-a-contributor .main-content #progressbar {\n  margin-bottom: 30px;\n  overflow: hidden;\n  /*CSS counters to number the steps*/\n  counter-reset: step;\n  position: relative;\n}\n.page-become-a-contributor .main-content #progressbar li {\n  list-style-type: none;\n  color: #656c75;\n  text-transform: uppercase;\n  font-size: 9px;\n  width: 33.33%;\n  float: left;\n  position: relative;\n  text-align: center;\n}\n.page-become-a-contributor .main-content #progressbar li:before {\n  content: counter(step);\n  counter-increment: step;\n  width: 20px;\n  line-height: 20px;\n  display: block;\n  font-size: 10px;\n  color: #333;\n  background: #eaeaea;\n  text-align: center;\n  border-radius: 3px;\n  margin: 0 auto 5px;\n  position: relative;\n  z-index: 1;\n}\n.page-become-a-contributor .main-content #progressbar li:after {\n  content: ' ';\n  width: 100%;\n  height: 2px;\n  background: #eaeaea;\n  position: absolute;\n  left: -50%;\n  top: 9px;\n  z-index: 0;\n  opacity: 0.6;\n  /*put it behind the numbers*/\n}\n.page-become-a-contributor .main-content #progressbar li:first-child:after {\n  /*connector not needed before the first step*/\n  content: none;\n}\n.page-become-a-contributor .main-content #progressbar li.active:after,\n.page-become-a-contributor .main-content #progressbar li.active:before {\n  background: #6baaf2 !important;\n  color: white !important;\n  /*position: relative;*/\n}\n.page-become-a-contributor .main-content .next {\n  display: none;\n}\n.page-become-a-contributor .main-content button {\n  font-family: \"TTNormsPro-Light\", sans-serif;\n  text-transform: uppercase;\n  outline: 0;\n  background: #6baaf2 !important;\n  width: 100%;\n  border: 0;\n  padding: 15px;\n  color: #FFFFFF;\n  font-size: 14px;\n  -webkit-transition: all 0.2s ease-out;\n  transition: all 0.2s ease-out;\n  margin-top: 20px;\n}\n.page-become-a-contributor .main-content button:hover {\n  cursor: pointer;\n  background: #40cebb !important;\n}\n",""]),n.exports=e},function(n,e){$(document).ready((function(){var n,e,t,o,a,r,i;$(".next").click((function(){if(i)return!1;i=!0,n=$(this).parent(),e=$(this).parent().next(),$("#progressbar li").eq($("fieldset").index(e)).addClass("active"),e.show(),n.animate({opacity:0},{step:function(t,i){r=1-.2*(1-t),o=50*t+"%",a=1-t,n.css({transform:"scale("+r+")",position:"absolute"}),e.css({left:o,opacity:a})},duration:800,complete:function(){n.hide(),i=!1},easing:"easeInOutBack"})})),$(".previous").click((function(){if(i)return!1;i=!0,n=$(this).parent(),t=$(this).parent().prev(),$("#progressbar li").eq($("fieldset").index(n)).removeClass("active"),t.show(),n.animate({opacity:0},{step:function(e,i){r=.8+.2*(1-e),o=50*(1-e)+"%",a=1-e,n.css({left:o}),t.css({transform:"scale("+r+")",opacity:a})},duration:800,complete:function(){n.hide(),i=!1},easing:"easeInOutBack"})})),$(".submit").click((function(){return!1}))}))}]);