!function(n){var e={};function t(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return n[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=n,t.c=e,t.d=function(n,e,o){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:o})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)t.d(o,r,function(e){return n[e]}.bind(null,r));return o},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=138)}({138:function(n,e,t){"use strict";t.r(e);t(139),t(141)},139:function(n,e,t){var o=t(140);"string"==typeof o&&(o=[[n.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};t(6)(o,r);o.locals&&(n.exports=o.locals)},140:function(n,e,t){(n.exports=t(5)(!1)).push([n.i,"/*====================================================\n\tCOLOR VARIABLE FOR THEME\n====================================================*/\n.page-become-a-contributor .main-content {\n  padding: 50px;\n  margin: auto;\n  /*progressbar*/\n  /*progressbar connectors*/\n  /*marking active/completed steps green*/\n  /*The number of the step and the connector before it = green*/\n}\n@media (max-width: 600px) {\n  .page-become-a-contributor .main-content {\n    padding: 40px 30px;\n  }\n}\n.page-become-a-contributor .main-content h1 {\n  margin: 0;\n}\n@media (max-width: 600px) {\n  .page-become-a-contributor .main-content h1 {\n    line-height: 1.2;\n    font-size: 1.8em;\n  }\n}\n.page-become-a-contributor .main-content form {\n  position: relative;\n  margin-top: 30px;\n}\n.page-become-a-contributor .main-content h2 {\n  font-family: 'TTNormsPro-Regular', sans-serif;\n  text-align: left;\n  font-size: 1.5em;\n  border-bottom: 1px solid #d5dae6;\n  padding-bottom: 7px;\n  font-weight: 400;\n}\n.page-become-a-contributor .main-content fieldset {\n  border: none;\n  display: block;\n  background: white;\n  margin-bottom: 20px;\n  padding-left: 0;\n  padding-right: 0;\n}\n.page-become-a-contributor .main-content fieldset:last-of-type {\n  margin-bottom: 0;\n}\n.page-become-a-contributor .main-content .active {\n  display: block;\n}\n.page-become-a-contributor .main-content p {\n  text-align: left;\n  font-weight: 300;\n}\n.page-become-a-contributor .main-content label {\n  font-family: 'TTNormsPro-Regular', sans-serif;\n  font-size: 14px;\n  color: #505050;\n  margin-bottom: 5px;\n}\n.page-become-a-contributor .main-content .split-fields {\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: row;\n  justify-content: space-between;\n}\n@media (max-width: 600px) {\n  .page-become-a-contributor .main-content .split-fields {\n    display: block;\n  }\n}\n.page-become-a-contributor .main-content .split-fields .input-field-group {\n  width: 49%;\n}\n@media (max-width: 600px) {\n  .page-become-a-contributor .main-content .split-fields .input-field-group {\n    width: 100%;\n  }\n}\n.page-become-a-contributor .main-content .input-field-group {\n  text-align: left;\n}\n.page-become-a-contributor .main-content input,\n.page-become-a-contributor .main-content textarea {\n  font-family: \"TTNormsPro-Light\", sans-serif;\n  outline: 0;\n  background: #f2f2f2;\n  width: 100%;\n  border: 0 solid;\n  margin: 0 0 15px;\n  padding: 15px;\n  box-sizing: border-box;\n  font-size: 14px;\n  transition: all 0.2s ease-out;\n}\n.page-become-a-contributor .main-content input:focus,\n.page-become-a-contributor .main-content textarea:focus {\n  box-shadow: 0 0 3px #0a87a7;\n}\n.page-become-a-contributor .main-content input:hover,\n.page-become-a-contributor .main-content textarea:hover {\n  background: rgba(64, 206, 199, 0.16);\n  box-shadow: 0 0 3px #0a87a7;\n}\n.page-become-a-contributor .main-content input:hover::placeholder,\n.page-become-a-contributor .main-content textarea:hover::placeholder {\n  color: #72859d;\n  opacity: 0.4;\n  font-family: 'TTNormsPro-Regular', sans-serif !important;\n}\n.page-become-a-contributor .main-content input:hover::after,\n.page-become-a-contributor .main-content textarea:hover::after {\n  color: #8aafb8;\n}\n.page-become-a-contributor .main-content textarea {\n  height: 200px;\n}\n.page-become-a-contributor .main-content .next:active,\n.page-become-a-contributor .main-content .next:focus,\n.page-become-a-contributor .main-content .next:hover {\n  background: #40cebb;\n}\n.page-become-a-contributor .main-content .message {\n  margin: 15px 0 0;\n  color: #b3b3b3;\n  font-size: 12px;\n}\n.page-become-a-contributor .main-content .message a {\n  color: #4CAF50;\n  text-decoration: none;\n}\n.page-become-a-contributor .main-content .register-form {\n  display: none;\n}\n.page-become-a-contributor .main-content .container {\n  position: relative;\n  z-index: 1;\n  margin: 0 auto;\n}\n.page-become-a-contributor .main-content .container:after,\n.page-become-a-contributor .main-content .container:before {\n  content: \" \";\n  display: block;\n  clear: both;\n}\n.page-become-a-contributor .main-content .container .info {\n  margin: 30px auto;\n  text-align: center;\n}\n.page-become-a-contributor .main-content .container .info h1 {\n  margin: 0 0 15px;\n  padding: 0;\n  font-size: 36px;\n  font-weight: 300;\n  color: #1a1a1a;\n}\n.page-become-a-contributor .main-content .container .info span {\n  color: #4d4d4d;\n  font-size: 12px;\n}\n.page-become-a-contributor .main-content .container .info span a {\n  color: #000000;\n  text-decoration: none;\n}\n.page-become-a-contributor .main-content .container .info span .fa {\n  color: #EF3B3A;\n}\n.page-become-a-contributor .main-content #progressbar {\n  margin-bottom: 30px;\n  overflow: hidden;\n  /*CSS counters to number the steps*/\n  counter-reset: step;\n  position: relative;\n}\n.page-become-a-contributor .main-content #progressbar li {\n  list-style-type: none;\n  color: #656c75;\n  text-transform: uppercase;\n  font-size: 9px;\n  width: 33.33%;\n  float: left;\n  position: relative;\n  text-align: center;\n}\n.page-become-a-contributor .main-content #progressbar li:before {\n  content: counter(step);\n  counter-increment: step;\n  width: 20px;\n  line-height: 20px;\n  display: block;\n  font-size: 10px;\n  color: #333;\n  background: #eaeaea;\n  text-align: center;\n  border-radius: 3px;\n  margin: 0 auto 5px;\n  position: relative;\n  z-index: 1;\n}\n.page-become-a-contributor .main-content #progressbar li:after {\n  content: ' ';\n  width: 100%;\n  height: 2px;\n  background: #eaeaea;\n  position: absolute;\n  left: -50%;\n  top: 9px;\n  z-index: 0;\n  opacity: 0.6;\n  /*put it behind the numbers*/\n}\n.page-become-a-contributor .main-content #progressbar li:first-child:after {\n  /*connector not needed before the first step*/\n  content: none;\n}\n.page-become-a-contributor .main-content #progressbar li.active:after,\n.page-become-a-contributor .main-content #progressbar li.active:before {\n  background: #5eb9d7 !important;\n  color: white !important;\n  /*position: relative;*/\n}\n.page-become-a-contributor .main-content .next {\n  display: none;\n}\n.page-become-a-contributor .main-content button {\n  font-family: \"TTNormsPro-Light\", sans-serif;\n  text-transform: uppercase;\n  outline: 0;\n  background: #5eb9d7 !important;\n  width: 100%;\n  border: 0;\n  padding: 15px;\n  color: #FFFFFF;\n  font-size: 14px;\n  -webkit-transition: all 0.2s ease-out;\n  transition: all 0.2s ease-out;\n  margin-top: 20px;\n}\n.page-become-a-contributor .main-content button:hover {\n  cursor: pointer;\n  background: #40cebb !important;\n}\n",""])},141:function(n,e){$(document).ready(function(){var n,e,t,o,r,i,a;$(".next").click(function(){if(a)return!1;a=!0,n=$(this).parent(),e=$(this).parent().next(),$("#progressbar li").eq($("fieldset").index(e)).addClass("active"),e.show(),n.animate({opacity:0},{step:function(t,a){i=1-.2*(1-t),o=50*t+"%",r=1-t,n.css({transform:"scale("+i+")",position:"absolute"}),e.css({left:o,opacity:r})},duration:800,complete:function(){n.hide(),a=!1},easing:"easeInOutBack"})}),$(".previous").click(function(){if(a)return!1;a=!0,n=$(this).parent(),t=$(this).parent().prev(),$("#progressbar li").eq($("fieldset").index(n)).removeClass("active"),t.show(),n.animate({opacity:0},{step:function(e,a){i=.8+.2*(1-e),o=50*(1-e)+"%",r=1-e,n.css({left:o}),t.css({transform:"scale("+i+")",opacity:r})},duration:800,complete:function(){n.hide(),a=!1},easing:"easeInOutBack"})}),$(".submit").click(function(){return!1})})},5:function(n,e,t){"use strict";n.exports=function(n){var e=[];return e.toString=function(){return this.map(function(e){var t=function(n,e){var t=n[1]||"",o=n[3];if(!o)return t;if(e&&"function"==typeof btoa){var r=(a=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=o.sources.map(function(n){return"/*# sourceURL="+o.sourceRoot+n+" */"});return[t].concat(i).concat([r]).join("\n")}var a;return[t].join("\n")}(e,n);return e[2]?"@media "+e[2]+"{"+t+"}":t}).join("")},e.i=function(n,t){"string"==typeof n&&(n=[[null,n,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];null!=i&&(o[i]=!0)}for(r=0;r<n.length;r++){var a=n[r];null!=a[0]&&o[a[0]]||(t&&!a[2]?a[2]=t:t&&(a[2]="("+a[2]+") and ("+t+")"),e.push(a))}},e}},6:function(n,e,t){var o,r,i={},a=(o=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===r&&(r=o.apply(this,arguments)),r}),c=function(n){var e={};return function(n,t){if("function"==typeof n)return n();if(void 0===e[n]){var o=function(n,e){return e?e.querySelector(n):document.querySelector(n)}.call(this,n,t);if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement)try{o=o.contentDocument.head}catch(n){o=null}e[n]=o}return e[n]}}(),s=null,p=0,u=[],f=t(8);function l(n,e){for(var t=0;t<n.length;t++){var o=n[t],r=i[o.id];if(r){r.refs++;for(var a=0;a<r.parts.length;a++)r.parts[a](o.parts[a]);for(;a<o.parts.length;a++)r.parts.push(x(o.parts[a],e))}else{var c=[];for(a=0;a<o.parts.length;a++)c.push(x(o.parts[a],e));i[o.id]={id:o.id,refs:1,parts:c}}}}function b(n,e){for(var t=[],o={},r=0;r<n.length;r++){var i=n[r],a=e.base?i[0]+e.base:i[0],c={css:i[1],media:i[2],sourceMap:i[3]};o[a]?o[a].parts.push(c):t.push(o[a]={id:a,parts:[c]})}return t}function m(n,e){var t=c(n.insertInto);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=u[u.length-1];if("top"===n.insertAt)o?o.nextSibling?t.insertBefore(e,o.nextSibling):t.appendChild(e):t.insertBefore(e,t.firstChild),u.push(e);else if("bottom"===n.insertAt)t.appendChild(e);else{if("object"!=typeof n.insertAt||!n.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=c(n.insertAt.before,t);t.insertBefore(e,r)}}function d(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n);var e=u.indexOf(n);e>=0&&u.splice(e,1)}function g(n){var e=document.createElement("style");if(void 0===n.attrs.type&&(n.attrs.type="text/css"),void 0===n.attrs.nonce){var o=function(){0;return t.nc}();o&&(n.attrs.nonce=o)}return h(e,n.attrs),m(n,e),e}function h(n,e){Object.keys(e).forEach(function(t){n.setAttribute(t,e[t])})}function x(n,e){var t,o,r,i;if(e.transform&&n.css){if(!(i="function"==typeof e.transform?e.transform(n.css):e.transform.default(n.css)))return function(){};n.css=i}if(e.singleton){var a=p++;t=s||(s=g(e)),o=w.bind(null,t,a,!1),r=w.bind(null,t,a,!0)}else n.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(t=function(n){var e=document.createElement("link");return void 0===n.attrs.type&&(n.attrs.type="text/css"),n.attrs.rel="stylesheet",h(e,n.attrs),m(n,e),e}(e),o=function(n,e,t){var o=t.css,r=t.sourceMap,i=void 0===e.convertToAbsoluteUrls&&r;(e.convertToAbsoluteUrls||i)&&(o=f(o));r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([o],{type:"text/css"}),c=n.href;n.href=URL.createObjectURL(a),c&&URL.revokeObjectURL(c)}.bind(null,t,e),r=function(){d(t),t.href&&URL.revokeObjectURL(t.href)}):(t=g(e),o=function(n,e){var t=e.css,o=e.media;o&&n.setAttribute("media",o);if(n.styleSheet)n.styleSheet.cssText=t;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(t))}}.bind(null,t),r=function(){d(t)});return o(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;o(n=e)}else r()}}n.exports=function(n,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=a()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var t=b(n,e);return l(t,e),function(n){for(var o=[],r=0;r<t.length;r++){var a=t[r];(c=i[a.id]).refs--,o.push(c)}n&&l(b(n,e),e);for(r=0;r<o.length;r++){var c;if(0===(c=o[r]).refs){for(var s=0;s<c.parts.length;s++)c.parts[s]();delete i[c.id]}}}};var v,y=(v=[],function(n,e){return v[n]=e,v.filter(Boolean).join("\n")});function w(n,e,t,o){var r=t?"":o.css;if(n.styleSheet)n.styleSheet.cssText=y(e,r);else{var i=document.createTextNode(r),a=n.childNodes;a[e]&&n.removeChild(a[e]),a.length?n.insertBefore(i,a[e]):n.appendChild(i)}}},8:function(n,e){n.exports=function(n){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!n||"string"!=typeof n)return n;var t=e.protocol+"//"+e.host,o=t+e.pathname.replace(/\/[^\/]*$/,"/");return n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(n,e){var r,i=e.trim().replace(/^"(.*)"$/,function(n,e){return e}).replace(/^'(.*)'$/,function(n,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?n:(r=0===i.indexOf("//")?i:0===i.indexOf("/")?t+i:o+i.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")})}}});