!function(n){var t={};function e(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return n[a].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=n,e.c=t,e.d=function(n,t,a){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:a})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var a=Object.create(null);if(e.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var r in n)e.d(a,r,function(t){return n[t]}.bind(null,r));return a},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=148)}({10:function(n,t){n.exports=function(n){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!n||"string"!=typeof n)return n;var e=t.protocol+"//"+t.host,a=e+t.pathname.replace(/\/[^\/]*$/,"/");return n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(n,t){var r,i=t.trim().replace(/^"(.*)"$/,function(n,t){return t}).replace(/^'(.*)'$/,function(n,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?n:(r=0===i.indexOf("//")?i:0===i.indexOf("/")?e+i:a+i.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")})}},148:function(n,t,e){"use strict";e.r(t);e(70)},7:function(n,t,e){"use strict";n.exports=function(n){var t=[];return t.toString=function(){return this.map(function(t){var e=function(n,t){var e=n[1]||"",a=n[3];if(!a)return e;if(t&&"function"==typeof btoa){var r=(o=a,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),i=a.sources.map(function(n){return"/*# sourceURL="+a.sourceRoot+n+" */"});return[e].concat(i).concat([r]).join("\n")}var o;return[e].join("\n")}(t,n);return t[2]?"@media "+t[2]+"{"+e+"}":e}).join("")},t.i=function(n,e){"string"==typeof n&&(n=[[null,n,""]]);for(var a={},r=0;r<this.length;r++){var i=this[r][0];null!=i&&(a[i]=!0)}for(r=0;r<n.length;r++){var o=n[r];null!=o[0]&&a[o[0]]||(e&&!o[2]?o[2]=e:e&&(o[2]="("+o[2]+") and ("+e+")"),t.push(o))}},t}},70:function(n,t,e){var a=e(71);"string"==typeof a&&(a=[[n.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};e(8)(a,r);a.locals&&(n.exports=a.locals)},71:function(n,t,e){(n.exports=e(7)(!1)).push([n.i,"/* Global Styles */\n/*====================================================\n\tCOLOR VARIABLE FOR THEME\n====================================================*/\n/*====================================================\n\tMIXINS\n====================================================*/\n/**\n * Allows you to use retina images at various pixel densities.\n * Examples:\n *\n *   .retina(/images/mypic.jpg, 2);\n *   .retina(/images/mypic.jpg, 3, 100px 100px, left top no-repeat transparent);\n *\n * @param  {String} $path               The path to the file name minus extension.\n * @param  {Number} $cap:    2          The highest pixel density level images exist for.\n * @param  {Value}  $size:   auto auto  The intended width of the rendered image.\n * @param  {Value}  $extras: null       Any other `background` values to be added.\n */\n/* Page Styles */\n.page-template h1 {\n  font-weight: 100;\n}\n.page-template .main-content {\n  box-shadow: 0 0 5px rgba(65, 67, 144, 0.15);\n  background: white;\n}\n.page-about {\n  margin-bottom: 0;\n  font-weight: 500;\n}\n.page-about .about-content {\n  margin-bottom: 40px !important;\n}\n.page-about .author-container {\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  align-content: flex-start;\n  flex-flow: row wrap;\n  margin: 0 40px 20px;\n}\n@media (max-width: 1040px) {\n  .page-about .author-container {\n    margin: 0 10px 30px;\n  }\n}\n@media (max-width: 900px) {\n  .page-about .author-container {\n    margin: 0 30px 30px;\n  }\n}\n.page-about .author-container .author-card-small {\n  width: 48.5%;\n  margin-bottom: 5px !important;\n}\n.page-about figure {\n  margin: 0;\n}\n@media (max-width: 600px) {\n  .page-about figure {\n    margin-bottom: 10px;\n  }\n}\n.page-about iframe {\n  /*box-shadow: 0 0 22px #8d9fb9;*/\n  margin-bottom: 30px;\n  width: 100%;\n  left: 0;\n}\n.page-about .page-title {\n  margin: 40px 40px 30px !important;\n  font-weight: 500;\n}\n@media (max-width: 1100px) {\n  .page-about .page-title {\n    font-size: 3em;\n    display: none;\n  }\n}\n.page-about .about-content > p {\n  margin: 0 44px 20px !important;\n  font-weight: 300;\n}\n@media (max-width: 600px) {\n  .page-about .about-content > p {\n    margin: 0 30px 20px !important;\n  }\n}\n@media (max-width: 800px) {\n  .page-about .about-content {\n    display: flex;\n    flex-direction: column;\n    margin: -14px 0 0 !important;\n  }\n}\n.page-about .post-image {\n  display: none !important;\n}\n.page-about .welcomevideo,\n.page-about iframe {\n  margin: 0 0 40px !important;\n  height: 400px;\n  display: block;\n}\n@media (max-width: 1100px) {\n  .page-about .welcomevideo,\n  .page-about iframe {\n    width: 100%;\n    margin: -12px auto 20px 0 !important;\n  }\n}\n@media (max-width: 800px) {\n  .page-about .welcomevideo,\n  .page-about iframe {\n    height: 451px;\n  }\n}\n@media (max-width: 600px) {\n  .page-about .welcomevideo,\n  .page-about iframe {\n    width: 100%;\n    height: 360px;\n    margin: -12px 0 10px 0 !important;\n    top: -7px;\n  }\n}\n@media (max-width: 470px) {\n  .page-about .welcomevideo,\n  .page-about iframe {\n    height: 250px !important;\n    min-height: auto !important;\n  }\n}\n.page-about .fluid-width-video-wrapper {\n  height: 50px;\n}\n@media (max-width: 600px) {\n  .page-about .fluid-width-video-wrapper {\n    margin: 0 40px 30px;\n  }\n}\n.page-about .fluid-width-video-wrapper {\n  width: 90%;\n  margin: auto;\n  position: relative;\n  padding: 0;\n}\n.tag-template .series-cover {\n  background-size: cover;\n  background-position-y: center;\n  height: 300px;\n  background-color: #192e4c;\n  background-blend-mode: multiply;\n  box-shadow: 0 0 5px rgba(65, 67, 144, 0.15);\n}\n@media (max-width: 600px) {\n  .tag-template .series-cover {\n    margin-left: calc(-50vw + 50%) !important;\n    margin-right: calc(-50vw + 50%) !important;\n    margin-top: -20px;\n  }\n}\n.tag-template .series-cover .tag-name {\n  font-size: 2.2em;\n  color: white !important;\n  font-family: 'AvenirNextLTPro-Medium', sans-serif;\n  text-shadow: 0 0 20px #2f2d56;\n  margin-top: 90px;\n}\n.tag-template .series-cover .tag-description {\n  font-weight: 300;\n  line-height: 1.5;\n  max-width: 90%;\n  margin: 20px auto 0;\n  color: white;\n  font-family: 'AvenirNextLTPro-Light', sans-serif;\n  text-shadow: 2px 2px 0 #15133c, 2px 2px 10px #15133c;\n  font-size: 1.2em;\n}\n.tag-template .postlist {\n  display: flex;\n  justify-content: space-between;\n  flex-direction: row;\n  flex-wrap: wrap;\n}\n.tag-template .postlist article {\n  margin-bottom: 20px;\n}\n.tag-template .postlist article:hover .post-image,\n.tag-template .postlist article:hover img {\n  border: unset !important;\n}\n.tag-template .postlist article .content {\n  position: relative;\n  margin: 5px 15px 15px;\n  padding: 0;\n  height: auto;\n  display: block;\n}\n@media (max-width: 600px) {\n  .tag-template .postlist article .content {\n    height: auto;\n    margin: 5px 15px 15px;\n  }\n}\n@media (max-width: 600px) {\n  .tag-template .postlist article .post-content {\n    display: none;\n  }\n}\n.tag-template .postlist article {\n  width: 49%;\n  height: auto;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n@media (max-width: 600px) {\n  .tag-template .postlist article {\n    width: 100%;\n    height: auto;\n  }\n}\n.tag-template .postlist article .post-head {\n  margin: 0;\n  min-height: 140px;\n  padding: 0 5px;\n}\n@media (max-width: 600px) {\n  .tag-template .postlist article .post-head {\n    margin: 0 0 80px;\n    min-height: unset;\n  }\n}\n.tag-template .postlist article .post-title {\n  font-size: 1.4em;\n}\n.tag-template .postlist article .post-title a {\n  font-family: 'TTNormsPro-Medium', sans-serif;\n  font-weight: 500;\n}\n.tag-template .postlist article .post-image {\n  display: block;\n  margin: 0 auto;\n  background-size: cover;\n  width: 100%;\n}\n.tag-template .postlist article .post-excerpt {\n  -webkit-line-clamp: 3;\n  display: -webkit-box;\n  min-height: 80px;\n  margin-bottom: 55px;\n  overflow: hidden;\n  font-family: 'TTNormsPro-Regular', sans-serif;\n  font-size: 1em !important;\n  text-overflow: ellipsis;\n}\n@media (max-width: 600px) {\n  .tag-template .postlist article .post-excerpt {\n    min-height: unset;\n    height: fit-content;\n    max-height: fit-content;\n    position: relative;\n    margin-bottom: 20px;\n  }\n}\n.tag-template .postlist article .post-permalink {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  padding: 10px 0 0;\n}\n.tag-template .postlist article .post-permalink .meta {\n  justify-content: left;\n}\n.tag-template .postlist article .post-permalink .btn {\n  padding: 12px 20px;\n  font-size: 16px;\n}\n.tag-template .postlist article .post-permalink .btn a {\n  line-height: 1;\n  height: fit-content;\n}\n.tag-template .postlist article .post-permalink .btn:hover {\n  background: #30b1a7;\n  color: white;\n}\n@media (max-width: 600px) {\n  .tag-template .postlist article .post-permalink .btn {\n    display: block !important;\n  }\n}\n.tag-template .postlist article .author,\n.tag-template .postlist article .date,\n.tag-template .postlist article p {\n  display: none !important;\n}\n.tag-template .tag-image {\n  width: 100%;\n  height: 370px;\n  background-size: cover !important;\n}\n.tag-template .post-title a {\n  font-size: 1em !important;\n  font-family: 'TTNormsPro-Regular', sans-serif;\n}\n.tag-template .post-preview {\n  padding: 0 !important;\n}\n.page-series .page-head {\n  margin: 40px 40px 0;\n  padding: 0;\n}\n@media (max-width: 800px) {\n  .page-series .page-head {\n    margin: 40px 30px 0;\n  }\n}\n.page-series .post-title {\n  margin: 27px 28px 20px;\n}\n@media (max-width: 600px) {\n  .page-series .post-title {\n    font-size: 3em;\n  }\n}\n@media (max-width: 900px) {\n  .page-series .post-title .post-content {\n    margin: 25px 50px 0;\n  }\n}\n@media (max-width: 900px) {\n  .page-series .post-title .page-title {\n    margin: 40px 50px 0;\n  }\n}\n@media (max-width: 900px) {\n  .page-series .post-title .container {\n    width: 90% !important;\n  }\n}\n@media (max-width: 600px) {\n  .page-series .post-title .container {\n    width: 100% !important;\n  }\n}\n.page-series p {\n  color: #505050;\n  margin: -20px 40px 30px;\n  font-weight: 300;\n}\n@media (max-width: 900px) {\n  .page-series p {\n    min-height: 63px;\n    margin: -20px 30px 30px;\n  }\n}\n.page-series .tag-container {\n  display: grid;\n  grid-template-columns: [first] 1fr [last] 1fr;\n  grid-template-rows: 367px;\n  grid-column-gap: 10px;\n  margin: 30px 40px 20px;\n}\n@media (max-width: 800px) {\n  .page-series .tag-container {\n    margin: 30px 30px 20px;\n  }\n}\n@media (max-width: 600px) {\n  .page-series .tag-container {\n    grid-template-columns: [first] 1fr;\n    margin: 20px;\n  }\n}\n.page-series .tag-container .tag-wrapper {\n  background: #f4fcff;\n  margin: 0 0 15px;\n  border: 1px solid #dadada;\n  transition: all 0.3s ease-out;\n  grid-template-rows: 291px;\n}\n.page-series .tag-container .tag-wrapper > a {\n  display: flex;\n  flex-direction: column;\n}\n.page-series .tag-container .tag-wrapper .tag-title {\n  margin: 0;\n  width: auto;\n  background: linear-gradient(0deg, rgba(2, 0, 36, 0) 0%, #001b2f 100%);\n  height: 204px;\n  padding: 20px 20px 0;\n}\n.page-series .tag-container .tag-wrapper .tag-title span {\n  font-size: 1.1em;\n  margin: 0;\n  font-weight: 600;\n}\n@media (max-width: 900px) {\n  .page-series .tag-container .tag-wrapper {\n    margin: 0 0 15px;\n  }\n  .page-series .tag-container .tag-wrapper:last-of-type {\n    margin-bottom: 0;\n  }\n}\n@media (max-width: 600px) {\n  .page-series .tag-container .tag-wrapper {\n    width: 100%;\n  }\n}\n.page-series .tag-container .tag-wrapper:hover {\n  background-color: #5eb9d7;\n  border: 1px solid #5eb9d7;\n  cursor: pointer !important;\n}\n.page-series .tag-container .tag-wrapper:hover .tag-title {\n  background: linear-gradient(0deg, rgba(2, 0, 36, 0) 0%, #007ad4 100%);\n}\n.page-series .tag-container .tag-wrapper:hover h2,\n.page-series .tag-container .tag-wrapper:hover p,\n.page-series .tag-container .tag-wrapper:hover span {\n  color: #1e608a !important;\n}\n.page-series .tag-container .tag-wrapper:hover .img-wrapper {\n  opacity: 0.7;\n}\n.page-series .tag-container .tag-wrapper .img-wrapper {\n  text-align: center;\n  width: 100%;\n  max-height: 189px;\n  height: auto;\n  position: relative;\n  display: block;\n  transition: all 0.3s ease-out;\n}\n@media (max-width: 800px) {\n  .page-series .tag-container .tag-wrapper .img-wrapper {\n    max-height: 206px;\n  }\n}\n@media (max-width: 600px) {\n  .page-series .tag-container .tag-wrapper .img-wrapper {\n    max-height: 186px;\n  }\n}\n.page-series .tag-container .tag-wrapper .img-wrapper img {\n  max-width: 100%;\n}\n.page-series .tag-container .tag-wrapper .meta-info {\n  font-weight: 900;\n  color: white;\n  font-size: 12px;\n  padding: 0;\n  text-align: left;\n}\n.page-series .tag-container .tag-wrapper .description {\n  padding: 15px;\n  background: #f6fcff;\n  margin: 0;\n  position: relative;\n  bottom: 0;\n  color: #162c52;\n  width: auto;\n  display: block;\n  text-align: left;\n  min-height: 130px;\n}\n@media (max-width: 1000px) {\n  .page-series .tag-container .tag-wrapper .description {\n    min-height: 156px;\n  }\n}\n@media (max-width: 900px) {\n  .page-series .tag-container .tag-wrapper .description {\n    min-height: 172px;\n  }\n}\n@media (max-width: 800px) {\n  .page-series .tag-container .tag-wrapper .description {\n    min-height: 104px;\n  }\n}\n@media (max-width: 700px) {\n  .page-series .tag-container .tag-wrapper .description {\n    min-height: 121px;\n  }\n}\n@media (max-width: 600px) {\n  .page-series .tag-container .tag-wrapper .description {\n    min-height: 0;\n  }\n}\n.page-series .tag-container .tag-wrapper .description h2 {\n  color: #3f4856;\n  font-family: 'TTNormsPro-Regular', sans-serif;\n  margin-bottom: 7px;\n  margin-top: 0;\n  font-size: 1.3em;\n  line-height: 1.2;\n  font-weight: 600;\n}\n.page-series .tag-container .tag-wrapper .description p {\n  font-size: 0.9em;\n  font-weight: 300;\n  color: #373940;\n  margin: 5px 0;\n  line-height: 1.5;\n  text-align: left;\n  font-family: 'AvenirNextLTPro-Light', sans-serif;\n  flex-grow: 1;\n  flex-shrink: 0;\n  flex-basis: auto;\n}\n@media (max-width: 600px) {\n  .page-series .tag-container .tag-wrapper .description p {\n    margin: 10px 0 25px;\n    min-height: 0;\n  }\n}\n.page-series .tag-container .tag-wrapper .description .postcount {\n  color: #4d4a5e;\n  text-align: right;\n  line-height: 1;\n  position: absolute;\n  bottom: 20px;\n  right: 20px;\n  font-size: 0.8em;\n  font-family: 'AvenirNextLTPro-Medium', sans-serif;\n}\n.tag-title {\n  color: white;\n}\n.tag-image {\n  margin-top: 30px;\n}\n@media (max-width: 600px) {\n  .tag-image {\n    display: none;\n  }\n}\n.page-resources h1 {\n  margin: 40px 40px 30px;\n}\n.page-resources section {\n  width: -webkit-fill-available;\n}\n.page-resources p {\n  margin: auto 40px 30px;\n}\n.page-resources #tablewrapper {\n  margin: auto 40px 40px;\n  width: -webkit-fill-available;\n}\n.page-resources #resources-table {\n  width: 100%;\n}\n.page-resources #resources-table .icon {\n  max-width: 5px;\n}\n.page-resources #resources-table td {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  text-align: left;\n}\n.page-resources #resources-table td:last-of-type {\n  max-width: 90px;\n}\n.page-resources #resources-table tbody tr td:first-of-type {\n  text-align: center !important;\n}\n.page-resources #resources-table tbody tr .issuetype_icon {\n  text-align: center !important;\n  width: 25px;\n  height: auto;\n}\n.page-resources #resources-table tbody tr .summmary {\n  font-weight: 600 !important;\n  font-size: 0.85em !important;\n}\n.page-resources #resources-table tbody tr .description {\n  max-width: none;\n}\n.page-resources #resources-table tbody tr .issuetype-name {\n  font-size: 0.8em !important;\n  min-width: 100px;\n}\n.page-resources #resources-table tbody tr.Epic {\n  display: none !important;\n}\n.author-template .tag-name,\n.home-template .tag-name,\n.paged .tag-name,\n.tag-template .tag-name {\n  font-size: 1.3em;\n  margin-top: 0;\n  font-family: 'AvenirNextLTPro-Light', sans-serif;\n}\n.author-template .tag-name i,\n.home-template .tag-name i,\n.paged .tag-name i,\n.tag-template .tag-name i {\n  font-size: 0.8em;\n  margin-right: 5px;\n  font-weight: 100;\n}\n@media (max-width: 800px) {\n  .author-template .main-header,\n  .home-template .main-header,\n  .paged .main-header,\n  .tag-template .main-header {\n    height: 200px;\n  }\n}\n/*====================================================\n\tTag page & author page cover base styles\n====================================================*/\n.cover {\n  text-align: center;\n  background-color: white;\n  padding: 40px;\n  margin: 0 0 30px;\n  width: -webkit-fill-available;\n  width: -moz-fill-available;\n  box-shadow: 0 0 5px rgba(65, 67, 144, 0.15);\n}\n@media (max-width: 800px) {\n  .cover {\n    margin: 0 auto 20px;\n    padding: 40px 0;\n  }\n}\n@media (max-width: 600px) {\n  .cover {\n    margin-left: 0 !important;\n    margin-right: 0 !important;\n    margin-top: 0;\n    padding: 30px 0;\n    width: 100%;\n  }\n}\n.cover .post-title {\n  font-weight: 500;\n}\n.cover .tag-name {\n  margin-top: 0;\n}\n.cover .tag-name i {\n  font-size: 18px;\n  margin-right: 5px;\n}\n.cover .tag-name span {\n  font-family: 'AvenirNextLTPro-Medium', sans-serif;\n}\n.cover .tag-description {\n  width: 80%;\n  margin: 0 auto;\n  text-align: 14px;\n  line-height: 1.5;\n  font-weight: 300;\n}\n@media (max-width: 600px) {\n  .cover .tag-description {\n    width: 90%;\n    margin: 15px auto 0;\n    font-size: 0.9em;\n    line-height: 1.6;\n  }\n}\n.cover .post-excerpt {\n  font-family: 'AvenirNextLTPro-Light', sans-serif;\n}\n.cover h3 {\n  margin-bottom: 10px;\n  font-family: 'AvenirNextLTPro-Light', sans-serif;\n}\n@media (max-width: 600px) {\n  .cover h3 {\n    margin: 5px 10px;\n  }\n}\n.cover .meta-info {\n  font-family: 'AvenirNextLTPro-Light', sans-serif;\n  font-size: 0.9em;\n  display: flex;\n  justify-content: space-around;\n  width: 81%;\n  margin: auto;\n}\n@media (max-width: 600px) {\n  .cover .meta-info {\n    flex-direction: column;\n  }\n}\n.cover .meta-info span {\n  margin: 0 7px;\n  font-size: 0.9em;\n  line-height: 1.8;\n  color: #52555b;\n}\n.cover .meta-info span i {\n  margin-right: 7px;\n}\n@media (max-width: 600px) {\n  .cover .meta-info span {\n    display: block;\n    line-height: 1.6;\n  }\n}\n/* Table Styles for Resources Page */\n.page-resources table,\n.post-template table,\n.page-resources td,\n.post-template td,\n.page-resources th,\n.post-template th {\n  border: 0 !important;\n  max-width: 150px;\n  overflow: hidden;\n  text-align: left !important;\n  padding: 15px 20px;\n  border: 0 solid rgba(255, 255, 255, 0);\n}\n.page-resources td,\n.post-template td {\n  font-weight: 300;\n}\n.page-resources table,\n.post-template table {\n  min-width: 100%;\n  display: table;\n  border-collapse: collapse;\n  border-spacing: 0;\n  border: 1px solid rgba(77, 87, 109, 0.25);\n  overflow: hidden;\n}\n@media (max-width: 600px) {\n  .page-resources table,\n  .post-template table {\n    width: 100%;\n  }\n}\n.page-resources table.left tbody td,\n.post-template table.left tbody td {\n  text-align: left;\n  vertical-align: top;\n}\n.page-resources table.left tbody .pre,\n.post-template table.left tbody .pre {\n  font-size: 0.8em;\n  width: fit-content;\n}\n.page-resources table thead tr,\n.post-template table thead tr {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n  background-color: #5d6b8a !important;\n  color: white;\n}\n.page-resources table thead th,\n.post-template table thead th {\n  text-align: center;\n  font-family: 'AvenirNextLTPro-Light', sans-serif;\n  min-width: 30px;\n  padding: 10px;\n  font-size: 0.9em;\n}\n.page-resources table thead th strong,\n.post-template table thead th strong {\n  font-family: 'AvenirNextLTPro-Light', sans-serif;\n}\n.page-resources table thead th::before,\n.post-template table thead th::before {\n  font-family: 'AvenirNextLTPro-Light', sans-serif !important;\n}\n.page-resources table.striped tr,\n.post-template table.striped tr {\n  border-bottom: none;\n}\n.page-resources table.striped tbody tr:nth-child(odd),\n.post-template table.striped tbody tr:nth-child(odd) {\n  background-color: rgba(242, 242, 242, 0.5);\n}\n.page-resources table.striped tbody tr > td,\n.post-template table.striped tbody tr > td {\n  border-radius: 0;\n}\n.page-resources table.highlight > tbody > tr,\n.post-template table.highlight > tbody > tr {\n  transition: background-color 0.25s ease;\n}\n.page-resources table.highlight > tbody > tr:hover,\n.post-template table.highlight > tbody > tr:hover {\n  background-color: rgba(242, 242, 242, 0.5);\n}\n.page-resources table.centered tbody tr td,\n.post-template table.centered tbody tr td,\n.page-resources table.centered thead tr th,\n.post-template table.centered thead tr th {\n  text-align: center;\n}\n.page-resources tr:nth-child(odd),\n.post-template tr:nth-child(odd) {\n  background-color: #fff;\n}\n.page-resources tr:nth-child(even),\n.post-template tr:nth-child(even) {\n  background-color: #f5f8ff;\n}\n.page-resources td,\n.post-template td,\n.page-resources th,\n.post-template th {\n  padding: 15px;\n  display: table-cell;\n  vertical-align: middle;\n  font-size: 0.8em;\n  text-align: center;\n  line-height: 1.2;\n}\n@media (max-width: 600px) {\n  .page-resources table,\n  .post-template table {\n    width: auto;\n    border-collapse: collapse;\n    border-spacing: 0;\n    display: table;\n    position: relative;\n    overflow-x: scroll;\n  }\n  .page-resources table tbody:hover,\n  .post-template table tbody:hover {\n    cursor: grab !important;\n  }\n  .page-resources table td:empty:before,\n  .post-template table td:empty:before {\n    content: '\\00a0';\n  }\n  .page-resources table td,\n  .post-template table td,\n  .page-resources table th,\n  .post-template table th {\n    margin: 0;\n    vertical-align: top;\n    border-spacing: 0 !important;\n    border-collapse: collapse !important;\n    font-size: 0.8em;\n  }\n  .page-resources table td,\n  .post-template table td {\n    width: -webkit-fill-available;\n    width: -moz-available;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    font-family: 'AvenirNextLTPro-Light', sans-serif;\n  }\n  .page-resources table thead,\n  .post-template table thead {\n    position: absolute;\n    left: 0;\n    width: 120px;\n    height: 100%;\n    box-shadow: 1px 0 4px rgba(62, 69, 86, 0.7);\n    z-index: 2;\n  }\n  .page-resources table thead th,\n  .post-template table thead th {\n    display: block;\n    padding: 10px 5px !important;\n    font-family: 'AvenirNextLTPro-Light', sans-serif;\n    letter-spacing: 0.5px;\n    text-align: left;\n    text-transform: capitalize;\n    font-weight: 500;\n    font-size: 0.8em;\n  }\n  .page-resources table thead th *,\n  .post-template table thead th * {\n    font-size: 1em;\n  }\n  .page-resources table thead tr,\n  .post-template table thead tr {\n    display: block;\n    border-spacing: 0;\n    padding: 0;\n    height: 100%;\n  }\n  .page-resources table tbody,\n  .post-template table tbody {\n    margin-left: 120px;\n    width: auto;\n    position: relative;\n    overflow-x: auto;\n    white-space: nowrap;\n    height: 100%;\n    display: flex;\n    flex-direction: row;\n    align-items: stretch;\n  }\n  .page-resources table tbody > tr > th,\n  .post-template table tbody > tr > th {\n    border-bottom: 1px solid #e0e0e0;\n    border-radius: 0;\n    border-spacing: 0;\n    border-collapse: collapse;\n  }\n  .page-resources table tbody tr,\n  .post-template table tbody tr {\n    width: 115px;\n    vertical-align: top;\n    display: flex;\n    flex-direction: column;\n    overflow-wrap: normal;\n    line-break: strict;\n    white-space: inherit;\n    padding: 0 15px;\n    border-bottom: none;\n  }\n  .page-resources table tbody tr td,\n  .post-template table tbody tr td {\n    display: block;\n    min-height: 1.25em;\n    padding: 10px 0 !important;\n    border-spacing: 0;\n    border-collapse: collapse;\n    overflow: hidden;\n    line-break: normal;\n    white-space: nowrap;\n    width: -webkit-fill-available;\n    text-overflow: ellipsis;\n    width: -moz-available;\n    min-width: -webkit-fill-available;\n  }\n  .page-resources table tbody:last-child::after,\n  .post-template table tbody:last-child::after {\n    content: \" \";\n    display: table-row;\n    max-width: 300px;\n    min-width: 300px;\n    margin-left: -300px;\n  }\n}\n.page-resources .dataframe thead th,\n.post-template .dataframe thead th {\n  text-align: center !important;\n  font-family: 'AvenirNextLTPro-Light', sans-serif !important;\n}\n.page-resources .dataframe tbody tr th:only-of-type,\n.post-template .dataframe tbody tr th:only-of-type {\n  vertical-align: middle;\n  text-align: center;\n}\n.page-resources .tableContainer,\n.post-template .tableContainer {\n  box-shadow: 0 0 5px #d1d4e8;\n  margin: 20px auto 40px;\n  position: relative;\n  overflow: hidden;\n}\n@media (max-width: 600px) {\n  .page-resources .tableContainer,\n  .post-template .tableContainer {\n    margin-left: calc(-50vw + 50%);\n    margin-right: calc(-50vw + 50%);\n    width: auto!important;\n  }\n  .page-resources .tableContainer:hover,\n  .post-template .tableContainer:hover {\n    cursor: grab;\n  }\n}\n.page-resources .handscroller:hover,\n.post-template .handscroller:hover {\n  cursor: grab !important;\n}\n.page-resources .handscroller *:hover,\n.post-template .handscroller *:hover {\n  cursor: grab !important;\n}\n.page-resources .tablefade,\n.post-template .tablefade {\n  position: absolute;\n  right: 0;\n  height: 100%;\n  width: 70px;\n  top: 0;\n  display: block;\n  background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8));\n}\n",""])},8:function(n,t,e){var a,r,i={},o=(a=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===r&&(r=a.apply(this,arguments)),r}),p=function(n){var t={};return function(n,e){if("function"==typeof n)return n();if(void 0===t[n]){var a=function(n,t){return t?t.querySelector(n):document.querySelector(n)}.call(this,n,e);if(window.HTMLIFrameElement&&a instanceof window.HTMLIFrameElement)try{a=a.contentDocument.head}catch(n){a=null}t[n]=a}return t[n]}}(),s=null,l=0,g=[],d=e(10);function m(n,t){for(var e=0;e<n.length;e++){var a=n[e],r=i[a.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](a.parts[o]);for(;o<a.parts.length;o++)r.parts.push(b(a.parts[o],t))}else{var p=[];for(o=0;o<a.parts.length;o++)p.push(b(a.parts[o],t));i[a.id]={id:a.id,refs:1,parts:p}}}}function c(n,t){for(var e=[],a={},r=0;r<n.length;r++){var i=n[r],o=t.base?i[0]+t.base:i[0],p={css:i[1],media:i[2],sourceMap:i[3]};a[o]?a[o].parts.push(p):e.push(a[o]={id:o,parts:[p]})}return e}function h(n,t){var e=p(n.insertInto);if(!e)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var a=g[g.length-1];if("top"===n.insertAt)a?a.nextSibling?e.insertBefore(t,a.nextSibling):e.appendChild(t):e.insertBefore(t,e.firstChild),g.push(t);else if("bottom"===n.insertAt)e.appendChild(t);else{if("object"!=typeof n.insertAt||!n.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=p(n.insertAt.before,e);e.insertBefore(t,r)}}function f(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n);var t=g.indexOf(n);t>=0&&g.splice(t,1)}function u(n){var t=document.createElement("style");if(void 0===n.attrs.type&&(n.attrs.type="text/css"),void 0===n.attrs.nonce){var a=function(){0;return e.nc}();a&&(n.attrs.nonce=a)}return x(t,n.attrs),h(n,t),t}function x(n,t){Object.keys(t).forEach(function(e){n.setAttribute(e,t[e])})}function b(n,t){var e,a,r,i;if(t.transform&&n.css){if(!(i="function"==typeof t.transform?t.transform(n.css):t.transform.default(n.css)))return function(){};n.css=i}if(t.singleton){var o=l++;e=s||(s=u(t)),a=y.bind(null,e,o,!1),r=y.bind(null,e,o,!0)}else n.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(e=function(n){var t=document.createElement("link");return void 0===n.attrs.type&&(n.attrs.type="text/css"),n.attrs.rel="stylesheet",x(t,n.attrs),h(n,t),t}(t),a=function(n,t,e){var a=e.css,r=e.sourceMap,i=void 0===t.convertToAbsoluteUrls&&r;(t.convertToAbsoluteUrls||i)&&(a=d(a));r&&(a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var o=new Blob([a],{type:"text/css"}),p=n.href;n.href=URL.createObjectURL(o),p&&URL.revokeObjectURL(p)}.bind(null,e,t),r=function(){f(e),e.href&&URL.revokeObjectURL(e.href)}):(e=u(t),a=function(n,t){var e=t.css,a=t.media;a&&n.setAttribute("media",a);if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}.bind(null,e),r=function(){f(e)});return a(n),function(t){if(t){if(t.css===n.css&&t.media===n.media&&t.sourceMap===n.sourceMap)return;a(n=t)}else r()}}n.exports=function(n,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=o()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var e=c(n,t);return m(e,t),function(n){for(var a=[],r=0;r<e.length;r++){var o=e[r];(p=i[o.id]).refs--,a.push(p)}n&&m(c(n,t),t);for(r=0;r<a.length;r++){var p;if(0===(p=a[r]).refs){for(var s=0;s<p.parts.length;s++)p.parts[s]();delete i[p.id]}}}};var w,v=(w=[],function(n,t){return w[n]=t,w.filter(Boolean).join("\n")});function y(n,t,e,a){var r=e?"":a.css;if(n.styleSheet)n.styleSheet.cssText=v(t,r);else{var i=document.createTextNode(r),o=n.childNodes;o[t]&&n.removeChild(o[t]),o.length?n.insertBefore(i,o[t]):n.appendChild(i)}}}});