!function(n){var t={};function e(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=n,e.c=t,e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:r})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var o in n)e.d(r,o,function(t){return n[t]}.bind(null,o));return r},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=26)}({0:function(n,t,e){"use strict";n.exports=function(n){var t=[];return t.toString=function(){return this.map(function(t){var e=function(n,t){var e=n[1]||"",r=n[3];if(!r)return e;if(t&&"function"==typeof btoa){var o=(a=r,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(l," */")),i=r.sources.map(function(n){return"/*# sourceURL=".concat(r.sourceRoot).concat(n," */")});return[e].concat(i).concat([o]).join("\n")}var a,s,l;return[e].join("\n")}(t,n);return t[2]?"@media ".concat(t[2],"{").concat(e,"}"):e}).join("")},t.i=function(n,e){"string"==typeof n&&(n=[[null,n,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];null!=i&&(r[i]=!0)}for(var a=0;a<n.length;a++){var s=n[a];null!=s[0]&&r[s[0]]||(e&&!s[2]?s[2]=e:e&&(s[2]="(".concat(s[2],") and (").concat(e,")")),t.push(s))}},t}},1:function(n,t,e){var r,o,i={},a=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),s=function(n){var t={};return function(n,e){if("function"==typeof n)return n();if(void 0===t[n]){var r=function(n,t){return t?t.querySelector(n):document.querySelector(n)}.call(this,n,e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(n){r=null}t[n]=r}return t[n]}}(),l=null,c=0,d=[],p=e(2);function u(n,t){for(var e=0;e<n.length;e++){var r=n[e],o=i[r.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](r.parts[a]);for(;a<r.parts.length;a++)o.parts.push(v(r.parts[a],t))}else{var s=[];for(a=0;a<r.parts.length;a++)s.push(v(r.parts[a],t));i[r.id]={id:r.id,refs:1,parts:s}}}}function f(n,t){for(var e=[],r={},o=0;o<n.length;o++){var i=n[o],a=t.base?i[0]+t.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(s):e.push(r[a]={id:a,parts:[s]})}return e}function b(n,t){var e=s(n.insertInto);if(!e)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=d[d.length-1];if("top"===n.insertAt)r?r.nextSibling?e.insertBefore(t,r.nextSibling):e.appendChild(t):e.insertBefore(t,e.firstChild),d.push(t);else if("bottom"===n.insertAt)e.appendChild(t);else{if("object"!=typeof n.insertAt||!n.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=s(n.insertAt.before,e);e.insertBefore(t,o)}}function h(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n);var t=d.indexOf(n);t>=0&&d.splice(t,1)}function m(n){var t=document.createElement("style");if(void 0===n.attrs.type&&(n.attrs.type="text/css"),void 0===n.attrs.nonce){var r=function(){0;return e.nc}();r&&(n.attrs.nonce=r)}return g(t,n.attrs),b(n,t),t}function g(n,t){Object.keys(t).forEach(function(e){n.setAttribute(e,t[e])})}function v(n,t){var e,r,o,i;if(t.transform&&n.css){if(!(i="function"==typeof t.transform?t.transform(n.css):t.transform.default(n.css)))return function(){};n.css=i}if(t.singleton){var a=c++;e=l||(l=m(t)),r=y.bind(null,e,a,!1),o=y.bind(null,e,a,!0)}else n.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(e=function(n){var t=document.createElement("link");return void 0===n.attrs.type&&(n.attrs.type="text/css"),n.attrs.rel="stylesheet",g(t,n.attrs),b(n,t),t}(t),r=function(n,t,e){var r=e.css,o=e.sourceMap,i=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||i)&&(r=p(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([r],{type:"text/css"}),s=n.href;n.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,e,t),o=function(){h(e),e.href&&URL.revokeObjectURL(e.href)}):(e=m(t),r=function(n,t){var e=t.css,r=t.media;r&&n.setAttribute("media",r);if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}.bind(null,e),o=function(){h(e)});return r(n),function(t){if(t){if(t.css===n.css&&t.media===n.media&&t.sourceMap===n.sourceMap)return;r(n=t)}else o()}}n.exports=function(n,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=a()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var e=f(n,t);return u(e,t),function(n){for(var r=[],o=0;o<e.length;o++){var a=e[o];(s=i[a.id]).refs--,r.push(s)}n&&u(f(n,t),t);for(o=0;o<r.length;o++){var s;if(0===(s=r[o]).refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete i[s.id]}}}};var x,w=(x=[],function(n,t){return x[n]=t,x.filter(Boolean).join("\n")});function y(n,t,e,r){var o=e?"":r.css;if(n.styleSheet)n.styleSheet.cssText=w(t,o);else{var i=document.createTextNode(o),a=n.childNodes;a[t]&&n.removeChild(a[t]),a.length?n.insertBefore(i,a[t]):n.appendChild(i)}}},2:function(n,t){n.exports=function(n){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!n||"string"!=typeof n)return n;var e=t.protocol+"//"+t.host,r=e+t.pathname.replace(/\/[^\/]*$/,"/");return n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(n,t){var o,i=t.trim().replace(/^"(.*)"$/,function(n,t){return t}).replace(/^'(.*)'$/,function(n,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?n:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?e+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},26:function(n,t,e){"use strict";e.r(t);e(27),e(29);document.onload=void $.ajax({method:"GET",url:"https://us-east1-hackersandslackers-204807.cloudfunctions.net/jira-resources-endpoint",context:document.body}).done(function(n){!function(n){for(var t=0;t<n.length;t++)$("#resources-table tbody").append('<tr> \n <td><img src="'+n[t].issuetype_icon+'" alt="'+n[t].issuetype_name+'"></td> \n <td>'+n[t].summary+'</td> \n <td><a href="'+n[t].description+'">'+n[t].description+"</a></td> \n <td>"+n[t].issuetype_name+"</td> \n </tr>")}(JSON.parse(n))})},27:function(n,t,e){var r=e(28);"string"==typeof r&&(r=[[n.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(1)(r,o);r.locals&&(n.exports=r.locals)},28:function(n,t,e){(n.exports=e(0)(!1)).push([n.i,".page-resources h1 {\n  margin: 40px 40px 30px;\n}\n.page-resources section {\n  width: -webkit-fill-available;\n}\n.page-resources p {\n  margin: auto 40px 30px;\n}\n.page-resources #tablewrapper {\n  margin: auto 40px 40px;\n  width: -webkit-fill-available;\n}\n.page-resources #resources-table {\n  width: 100%;\n  border: 1px solid #f5f8fb;\n}\n.page-resources #resources-table .icon {\n  max-width: 5px;\n}\n.page-resources #resources-table td {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  text-align: left;\n  line-height: 1;\n  padding: 20px 10px;\n  vertical-align: middle;\n}\n.page-resources #resources-table td:last-of-type {\n  max-width: 40px;\n}\n.page-resources #resources-table td img {\n  height: 20px;\n  width: 20px;\n}\n.page-resources #resources-table tbody tr td:first-of-type {\n  text-align: center !important;\n}\n.page-resources #resources-table tbody tr .issuetype_icon {\n  text-align: center !important;\n  width: 25px;\n  height: auto;\n}\n.page-resources #resources-table tbody tr .summmary {\n  font-weight: 600 !important;\n  font-size: 0.85em !important;\n}\n.page-resources #resources-table tbody tr .description {\n  max-width: none;\n}\n.page-resources #resources-table tbody tr .issuetype-name {\n  font-size: 0.8em !important;\n  min-width: 100px;\n}\n.page-resources #resources-table tbody tr.Epic {\n  display: none !important;\n}\n",""])},29:function(n,t,e){var r=e(30);"string"==typeof r&&(r=[[n.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(1)(r,o);r.locals&&(n.exports=r.locals)},30:function(n,t,e){(n.exports=e(0)(!1)).push([n.i,"/*====================================================\n\tCOLOR VARIABLE FOR THEME\n====================================================*/\ntable {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 0;\n  background-color: #fff;\n  border-spacing: 0;\n  border: 0 solid rgba(255, 255, 255, 0);\n}\ntable:hover {\n  cursor: ew-resize !important;\n}\ntable thead tr {\n  background: #52596a !important;\n  color: white;\n  font-size: 1.1em;\n}\ntable tr {\n  transition: all 0.3s ease-out;\n}\ntable tr:nth-child(odd) {\n  background: #f6f8fb;\n}\ntable tr td,\ntable tr th {\n  text-align: left;\n  padding: 10px;\n  vertical-align: top;\n  border-top: 0;\n  transition: all 0.3s ease-out;\n  overflow: hidden;\n  white-space: nowrap;\n  max-width: 150px;\n  text-overflow: ellipsis;\n  border-bottom: 0;\n  font-size: 0.8em;\n}\n@media (max-width: 600px) {\n  table tr td,\n  table tr th {\n    border: 0;\n  }\n}\n.tableContainer {\n  border-spacing: 0;\n  overflow: hidden;\n  border-radius: 3px;\n  border: 1px solid #e6edf0;\n  margin: 30px 0;\n  max-height: 539px;\n}\n@media (max-width: 600px) {\n  .tableContainer {\n    margin-left: calc(-50vw + 50%) !important;\n    margin-right: calc(-50vw + 50%) !important;\n    max-height: 600px;\n  }\n  .tableContainer *:hover {\n    cursor: ew-resize !important;\n  }\n  .tableContainer *:active {\n    cursor: grabbing;\n  }\n  .tableContainer table {\n    width: auto;\n    border-collapse: collapse;\n    border-spacing: 0;\n    display: table;\n    position: relative;\n    overflow-x: scroll;\n  }\n  .tableContainer table td,\n  .tableContainer table th {\n    margin: 0;\n    vertical-align: top;\n    border-spacing: 0 !important;\n    border-collapse: collapse !important;\n    font-size: 0.8em;\n  }\n  .tableContainer table td {\n    width: -webkit-fill-available;\n    width: -moz-available;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    font-family: 'TTNormsPro-Regular', sans-serif;\n  }\n  .tableContainer table thead {\n    position: absolute;\n    left: 0;\n    width: 120px;\n    height: 100%;\n    box-shadow: 1px 0 4px rgba(62, 69, 86, 0.7);\n    z-index: 2;\n    background: #52596a;\n    padding-left: 10px;\n    overflow: hidden;\n  }\n  .tableContainer table thead tr {\n    display: block;\n    border-spacing: 0;\n    padding: 0;\n    height: 100%;\n    background: #5c6376;\n  }\n  .tableContainer table thead tr:hover {\n    background-color: inherit;\n    cursor: ew-resize !important;\n  }\n  .tableContainer table thead tr th {\n    display: table-row;\n    margin-left: 5px;\n    padding: 0;\n    line-height: 4.8;\n    font-family: 'TTNormsPro-Regular', sans-serif;\n    letter-spacing: 0.5px;\n    text-align: left;\n    text-transform: capitalize;\n    font-weight: 500;\n    min-height: 50px;\n    margin: 5px 0;\n    margin-right: 0 !important;\n    max-width: unset !important;\n    color: #ffffff;\n    background: #52596a;\n    vertical-align: middle;\n    font-size: 0.7em;\n  }\n  .tableContainer table thead tr th * {\n    font-size: 1em;\n  }\n  .tableContainer table tbody {\n    margin-left: 131px;\n    width: auto;\n    position: relative;\n    overflow-x: auto;\n    white-space: nowrap;\n    height: 100%;\n    display: flex;\n    flex-direction: row;\n    align-items: stretch;\n  }\n  .tableContainer table tbody tr {\n    width: 115px;\n    vertical-align: top;\n    display: flex;\n    flex-direction: column;\n    overflow-wrap: normal;\n    line-break: strict;\n    white-space: inherit;\n    padding: 0 15px;\n    border-bottom: none;\n  }\n  .tableContainer table tbody tr tr:hover {\n    background-color: rgba(0, 0, 0, 0.12);\n  }\n  .tableContainer table tbody tr td,\n  .tableContainer table tbody tr th {\n    display: block;\n    min-height: 1.25em;\n    padding: 10px 0;\n    border-spacing: 0;\n    border-collapse: collapse;\n    overflow: hidden;\n    line-break: normal;\n    white-space: nowrap;\n    width: -webkit-fill-available;\n    text-overflow: ellipsis;\n    width: -moz-available;\n    min-width: -webkit-fill-available;\n    border-bottom: 1px solid #e7ebf2;\n    margin: 5px 0;\n    font-size: 0.78em !important;\n    font-weight: 300;\n  }\n  .tableContainer table tbody tr td:last-child,\n  .tableContainer table tbody tr th:last-child {\n    border-bottom: 0;\n  }\n  .tableContainer table tbody:last-child::after {\n    content: \" \";\n    display: table-row;\n    max-width: 300px;\n    min-width: 300px;\n    margin-left: -300px;\n  }\n}\n.tableContainer .rowCounter {\n  text-align: right;\n  width: 100%;\n  font-size: 0.8em;\n  margin-top: -20px;\n  width: fit-content;\n  position: absolute;\n  right: 0;\n  background: #555760;\n  padding: 0 9px;\n  color: white;\n}\n",""])}});