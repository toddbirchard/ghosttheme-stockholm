!function(n){var t={};function a(o){if(t[o])return t[o].exports;var e=t[o]={i:o,l:!1,exports:{}};return n[o].call(e.exports,e,e.exports,a),e.l=!0,e.exports}a.m=n,a.c=t,a.d=function(n,t,o){a.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:o})},a.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},a.t=function(n,t){if(1&t&&(n=a(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var e in n)a.d(o,e,function(t){return n[t]}.bind(null,e));return o},a.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return a.d(t,"a",t),t},a.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},a.p="",a(a.s=359)}({359:function(n,t,a){"use strict";a.r(t);a(360)},360:function(n,t,a){var o=a(361);"string"==typeof o&&(o=[[n.i,o,""]]);var e={hmr:!0,transform:void 0,insertInto:void 0};a(6)(o,e);o.locals&&(n.exports=o.locals)},361:function(n,t,a){(t=n.exports=a(5)(!1)).push([n.i,"@import url(//hello.myfonts.net/count/39827b);",""]),t.push([n.i,"@import url(//hackers.nyc3.cdn.digitaloceanspaces.com/fonts/dankmono/css/dank-mono.css);",""]),t.push([n.i,"/* Global Vars */\n/*====================================================\n\tCOLOR VARIABLE FOR THEME\n====================================================*/\n/*====================================================\n\tMIXINS\n====================================================*/\n/**\n * Allows you to use retina images at various pixel densities.\n * Examples:\n *\n *   .retina(/images/mypic.jpg, 2);\n *   .retina(/images/mypic.jpg, 3, 100px 100px, left top no-repeat transparent);\n *\n * @param  {String} $path               The path to the file name minus extension.\n * @param  {Number} $cap:    2          The highest pixel density level images exist for.\n * @param  {Value}  $size:   auto auto  The intended width of the rendered image.\n * @param  {Value}  $extras: null       Any other `background` values to be added.\n */\n/* Global Styles */\n/* Global Styles */\n/*====================================================\n\tpagination\n====================================================*/\n.pagination {\n  margin: 10px auto 30px;\n  text-align: center;\n  display: block;\n  order: 20;\n  position: relative;\n  background: none;\n  width: 100%;\n}\n@media (max-width: 600px) {\n  .pagination {\n    margin: 10px auto 30px;\n  }\n}\n.pagination .older-posts {\n  position: absolute;\n  right: 0;\n  top: 0;\n  color: #a1afc5;\n  border: none;\n  border-radius: 2px;\n}\n.pagination .older-posts:hover {\n  background: #40cebb;\n  text-decoration: none;\n  color: white;\n  cursor: pointer;\n}\n.pagination .newer-posts {\n  position: absolute;\n  left: 0;\n  top: 0;\n  color: #a1afc5;\n  border: none;\n  border-radius: 2px;\n}\n.pagination .newer-posts:hover {\n  background: #40cebb;\n  text-decoration: none;\n  color: white;\n  cursor: pointer;\n}\n.pagination a,\n.pagination strong {\n  text-align: center;\n  display: inline-block;\n  color: #828994;\n  background: none;\n  border-radius: 1px;\n  padding: 8px 13px;\n  line-height: 1;\n  font-size: 1em;\n  font-weight: 700;\n}\n.pagination a:hover,\n.pagination strong:hover {\n  background: #40cebb;\n  text-decoration: none;\n  color: white;\n  cursor: pointer;\n}\n@media (max-width: 600px) {\n  .pagination a:nth-of-type(5),\n  .pagination a:nth-of-type(6),\n  .pagination a:nth-of-type(7),\n  .pagination a:nth-of-type(8) {\n    display: none;\n  }\n}\n.pagination strong {\n  color: #6e89b5 !important;\n  background: rgba(199, 210, 240, 0.5);\n  border-radius: 1px;\n  transition: all 0.2s ease-out;\n}\n.pagination strong:hover {\n  color: white !important;\n  cursor: pointer;\n}\n.pagination .page-number {\n  background: none;\n  margin: 0 auto;\n  line-height: 1;\n  display: flex;\n  justify-content: center;\n  max-width: 70%;\n}\n@media (max-width: 600px) {\n  .pagination .page-number {\n    max-width: 200px;\n    justify-content: space-between;\n  }\n}\n.pagination .page-number .page {\n  margin: 0 10px;\n}\n@media (max-width: 600px) {\n  .pagination .page-number .page {\n    margin: 0;\n  }\n}\n.pagination .total-count {\n  color: #bec0d8;\n  margin-top: 10px;\n  font-size: 0.9em;\n}\n@font-face {\n  font-family: 'TTNormsPro-Light';\n  src: url('https://hackers.nyc3.cdn.digitaloceanspaces.com/fonts/39827B_0_0.eot');\n  src: url('https://hackers.nyc3.cdn.digitaloceanspaces.com/fonts/39827B_0_0.eot?#iefix') format('embedded-opentype'), url('https://hackers.nyc3.cdn.digitaloceanspaces.com/fonts/39827B_0_0.woff2') format('woff2'), url('https://hackers.nyc3.cdn.digitaloceanspaces.com/fonts/39827B_0_0.woff') format('woff'), url('https://hackers.nyc3.cdn.digitaloceanspaces.com/fonts/39827B_0_0.ttf') format('truetype');\n}\n@font-face {\n  font-family: 'TTNormsPro-Regular';\n  src: url('https://hackers.nyc3.cdn.digitaloceanspaces.com/fonts/392922_2_0.eot');\n  src: url('https://hackers.nyc3.cdn.digitaloceanspaces.com/fonts/392922_2_0.eot?#iefix') format('embedded-opentype'), url('https://hackers.nyc3.cdn.digitaloceanspaces.com/fonts/392922_2_0.woff2') format('woff2'), url('https://hackers.nyc3.cdn.digitaloceanspaces.com/fonts/392922_2_0.woff') format('woff'), url('https://hackers.nyc3.cdn.digitaloceanspaces.com/fonts/392922_2_0.ttf') format('truetype');\n}\n@font-face {\n  font-family: 'TTNormsPro-Medium';\n  src: url('https://hackers.nyc3.cdn.digitaloceanspaces.com/fonts/392922_3_0.eot');\n  src: url('https://hackers.nyc3.cdn.digitaloceanspaces.com/fonts/392922_3_0.eot?#iefix') format('embedded-opentype'), url('https://hackers.nyc3.cdn.digitaloceanspaces.com/fonts/392922_3_0.woff2') format('woff2'), url('https://hackers.nyc3.cdn.digitaloceanspaces.com/fonts/392922_3_0.woff') format('woff'), url('https://hackers.nyc3.cdn.digitaloceanspaces.com/fonts/392922_3_0.ttf') format('truetype');\n}\n.meta-item {\n  display: flex;\n  justify-items: center;\n  margin: auto 0;\n  align-items: center;\n  font-size: 14px;\n}\n.meta-item span {\n  font-family: 'TTNormsPro-Regular', sans-serif;\n}\n.meta-item svg {\n  width: 17px;\n  margin-right: 5px;\n}\n.meta .nodejs,\n.post-meta .nodejs,\n.tag .nodejs {\n  color: #598708 !important;\n}\n.meta .nodejs *,\n.post-meta .nodejs *,\n.tag .nodejs * {\n  color: #598708 !important;\n}\n.meta .aws,\n.post-meta .aws,\n.tag .aws {\n  color: #c37a32 !important;\n}\n.meta .aws *,\n.post-meta .aws *,\n.tag .aws * {\n  color: #c37a32 !important;\n}\n.meta .django,\n.post-meta .django,\n.tag .django {\n  color: #43b78b !important;\n}\n.meta .django *,\n.post-meta .django *,\n.tag .django * {\n  color: #43b78b !important;\n}\n.meta .nosql,\n.post-meta .nosql,\n.tag .nosql {\n  color: #6eb14a !important;\n}\n.meta .nosql *,\n.post-meta .nosql *,\n.tag .nosql * {\n  color: #6eb14a !important;\n}\n.meta .sql,\n.post-meta .sql,\n.tag .sql {\n  color: #687ea5 !important;\n}\n.meta .sql *,\n.post-meta .sql *,\n.tag .sql * {\n  color: #687ea5 !important;\n}\n.meta .restapis,\n.post-meta .restapis,\n.tag .restapis {\n  color: #a93e3e !important;\n}\n.meta .restapis *,\n.post-meta .restapis *,\n.tag .restapis * {\n  color: #a93e3e !important;\n}\n.meta .frontend,\n.post-meta .frontend,\n.tag .frontend {\n  color: #d7ac0a !important;\n}\n.meta .frontend *,\n.post-meta .frontend *,\n.tag .frontend * {\n  color: #d7ac0a !important;\n}\n.meta .data,\n.post-meta .data,\n.tag .data {\n  color: #1cccae !important;\n}\n.meta .data *,\n.post-meta .data *,\n.tag .data * {\n  color: #1cccae !important;\n}\n.meta .roundup,\n.post-meta .roundup,\n.tag .roundup {\n  color: #666fa5 !important;\n}\n.meta .roundup *,\n.post-meta .roundup *,\n.tag .roundup * {\n  color: #666fa5 !important;\n}\n.meta .excel,\n.post-meta .excel,\n.tag .excel {\n  color: #5bb85b;\n}\n.meta .excel *,\n.post-meta .excel *,\n.tag .excel * {\n  color: #5bb85b !important;\n}\n.meta .devops,\n.post-meta .devops,\n.tag .devops {\n  color: #495f6d !important;\n}\n.meta .devops *,\n.post-meta .devops *,\n.tag .devops * {\n  color: #495f6d !important;\n}\n.meta .pandas,\n.post-meta .pandas,\n.tag .pandas {\n  color: #c03694 !important;\n}\n.meta .pandas *,\n.post-meta .pandas *,\n.tag .pandas * {\n  color: #c03694 !important;\n}\n.meta .googlecloud,\n.post-meta .googlecloud,\n.tag .googlecloud {\n  color: #1990f5 !important;\n}\n.meta .googlecloud *,\n.post-meta .googlecloud *,\n.tag .googlecloud * {\n  color: #1990f5 !important;\n}\n.meta .mysql,\n.post-meta .mysql,\n.tag .mysql {\n  color: #7a588e !important;\n}\n.meta .mysql *,\n.post-meta .mysql *,\n.tag .mysql * {\n  color: #7a588e !important;\n}\n.meta .datascience,\n.post-meta .datascience,\n.tag .datascience {\n  color: #449a8c !important;\n}\n.meta .datascience *,\n.post-meta .datascience *,\n.tag .datascience * {\n  color: #449a8c !important;\n}\n.meta .tableau,\n.post-meta .tableau,\n.tag .tableau {\n  color: #af7409 !important;\n}\n.meta .tableau *,\n.post-meta .tableau *,\n.tag .tableau * {\n  color: #af7409 !important;\n}\n.meta .python,\n.post-meta .python,\n.tag .python {\n  color: #0A9CC5 !important;\n}\n.meta .python *,\n.post-meta .python *,\n.tag .python * {\n  color: #0A9CC5 !important;\n}\n.meta .flask,\n.post-meta .flask,\n.tag .flask {\n  color: #505d7f !important;\n}\n.meta .flask *,\n.post-meta .flask *,\n.tag .flask * {\n  color: #505d7f !important;\n}\n.meta .statistics,\n.post-meta .statistics,\n.tag .statistics {\n  color: #34b27a !important;\n}\n.meta .statistics *,\n.post-meta .statistics *,\n.tag .statistics * {\n  color: #34b27a !important;\n}\n.meta .expressjs,\n.post-meta .expressjs,\n.tag .expressjs {\n  color: grey !important;\n}\n.meta .expressjs *,\n.post-meta .expressjs *,\n.tag .expressjs * {\n  color: grey !important;\n}\n.meta .atlassian,\n.post-meta .atlassian,\n.tag .atlassian {\n  color: #36408c !important;\n}\n.meta .atlassian *,\n.post-meta .atlassian *,\n.tag .atlassian * {\n  color: #36408c !important;\n}\n.meta .dataengineering,\n.post-meta .dataengineering,\n.tag .dataengineering {\n  color: #4c5777 !important;\n}\n.meta .dataengineering *,\n.post-meta .dataengineering *,\n.tag .dataengineering * {\n  color: #4c5777 !important;\n}\n.meta .codesnippetcorner,\n.post-meta .codesnippetcorner,\n.tag .codesnippetcorner {\n  color: #747d9a !important;\n}\n.meta .codesnippetcorner *,\n.post-meta .codesnippetcorner *,\n.tag .codesnippetcorner * {\n  color: #747d9a !important;\n}\n.meta .javascript,\n.post-meta .javascript,\n.tag .javascript {\n  color: #ad8303 !important;\n}\n.meta .javascript *,\n.post-meta .javascript *,\n.tag .javascript * {\n  color: #ad8303 !important;\n}\n.meta .saas,\n.post-meta .saas,\n.tag .saas {\n  color: #3d5075 !important;\n}\n.meta .saas *,\n.post-meta .saas *,\n.tag .saas * {\n  color: #3d5075 !important;\n}\n.meta .datavis,\n.post-meta .datavis,\n.tag .datavis {\n  color: #5a8a8a !important;\n}\n.meta .datavis *,\n.post-meta .datavis *,\n.tag .datavis * {\n  color: #5a8a8a !important;\n}\n.meta .plotly,\n.post-meta .plotly,\n.tag .plotly {\n  color: #155a8b;\n}\n.meta .plotly *,\n.post-meta .plotly *,\n.tag .plotly * {\n  color: #155a8b !important;\n}\n.meta .postgresql,\n.post-meta .postgresql,\n.tag .postgresql {\n  color: #425167;\n}\n.meta .postgresql *,\n.post-meta .postgresql *,\n.tag .postgresql * {\n  color: #425167 !important;\n}\n.meta .bigdata,\n.post-meta .bigdata,\n.tag .bigdata {\n  color: #12b3a3;\n}\n.meta .bigdata *,\n.post-meta .bigdata *,\n.tag .bigdata * {\n  color: #12b3a3 !important;\n}\n.meta .graphql,\n.post-meta .graphql,\n.tag .graphql {\n  color: #bc6391;\n}\n.meta .graphql *,\n.post-meta .graphql *,\n.tag .graphql * {\n  color: #bc6391 !important;\n  fill: #bc6391 !important;\n}\n.meta .apache,\n.post-meta .apache,\n.tag .apache {\n  color: #d5212a;\n}\n.meta .apache *,\n.post-meta .apache *,\n.tag .apache * {\n  color: #d5212a !important;\n}\n.meta .spark,\n.post-meta .spark,\n.tag .spark {\n  color: #e77115;\n}\n.meta .spark *,\n.post-meta .spark *,\n.tag .spark * {\n  color: #e77115 !important;\n}\n.author-card-small {\n  border-radius: 2px !important;\n  background: #fff !important;\n  padding: 0;\n  margin: 20px 0;\n  position: relative;\n  border: 1px solid #dedfe1;\n  color: #5f5f5f;\n}\n@media (max-width: 600px) {\n  .author-card-small {\n    width: auto !important;\n    margin: 0 0 10px;\n  }\n}\n.author-card-small .author {\n  margin-bottom: 10px;\n  line-height: 1;\n  color: #326671;\n  padding: 0 10px;\n}\n.author-card-small .author-name {\n  font-family: 'TTNormsPro-Regular', sans-serif;\n  font-size: 1.2em;\n  color: #626674;\n  margin-top: 2px;\n}\n@media (max-width: 600px) {\n  .author-card-small .author-name {\n    font-size: 1.4em;\n  }\n}\n.author-card-small .meta-info {\n  color: #373940;\n}\n@media (max-width: 600px) {\n  .author-card-small {\n    display: block !important;\n  }\n}\n.author-card-small span {\n  color: #747885;\n  font-size: 1em;\n}\n.author-card-small .author-specs {\n  display: flex;\n  justify-content: space-between;\n}\n@media (max-width: 1040px) {\n  .author-card-small .author-specs {\n    display: block;\n  }\n}\n.author-card-small .avatar-link {\n  margin-bottom: 15px;\n  display: inline-block;\n  position: absolute;\n  left: auto;\n  right: 20px;\n  width: 75px;\n  height: 73px;\n  margin: auto;\n  top: 92px;\n  border: 3px solid white;\n  box-shadow: 2px 2px 2px rgba(20, 24, 53, 0.15);\n}\n@media (max-width: 1040px) {\n  .author-card-small .avatar-link {\n    margin: 0 auto;\n    display: block;\n    text-align: center;\n  }\n}\n.author-card-small .avatar-link .avatar {\n  width: 100%;\n  margin: 0;\n  height: 100%;\n}\n.author-card-small .details {\n  width: -webkit-fill-available;\n  width: -moz-available;\n  display: inline-block;\n  /* margin-left: 6px; */\n  overflow: hidden;\n  padding: 17px;\n  text-align: center;\n  margin-top: 5px;\n  margin-left: 0;\n  padding-bottom: 8px;\n}\n.author-card-small .bio {\n  display: block;\n  width: -webkit-fill-available;\n  line-height: 1.5;\n  font-weight: 100;\n  float: left!important;\n  font-size: 0.85em !important;\n  margin: 0 auto !important;\n  max-width: 450px;\n  padding: 0 25px 25px;\n  text-align: center;\n  text-align: left;\n  min-height: 70px;\n}\n.author-card-small .author {\n  text-align: left;\n}\n.author-card-small .author a {\n  font-family: 'TTNormsPro-Regular', sans-serif;\n}\n.author-card-small .author a:hover {\n  text-decoration: none;\n}\n.author-card-small .author-social {\n  display: none;\n}\n.author-card-small .author-social .author-icons {\n  list-style: none;\n  display: flex;\n  justify-content: space-around;\n  padding: 0 25px;\n}\n.author-card-small .author-social .social-btns {\n  padding: 0;\n  display: block;\n}\n.author-card-small .author-social .btn {\n  font-size: 15px;\n  height: fit-content;\n  display: none;\n}\n.author-card-small .author-social i {\n  margin: 0 auto;\n  font-size: 1.4em;\n}\n.author-card-small .meta-info {\n  font-size: 12px;\n  line-height: 1.5;\n  font-weight: 100;\n  color: #959595;\n}\n.author-card-small .meta-info a {\n  white-space: nowrap;\n  overflow: hidden;\n  display: inline;\n}\n@media (max-width: 1040px) {\n  .author-card-small .meta-info {\n    justify-content: center !important;\n  }\n}\n.author-card-small .meta-info span {\n  display: block;\n  margin-bottom: 2px;\n  text-align: left;\n  padding: 0 10px;\n}\n@media (max-width: 1040px) {\n  .author-card-small .meta-info span {\n    margin: 0 auto 3px;\n  }\n}\n@media (max-width: 600px) {\n  .author-card-small .meta-info span {\n    margin: 0 auto 3px;\n  }\n}\n.author-card-small .meta-info span i {\n  margin-right: 7px;\n  display: inline;\n}\n@media (max-width: 600px) {\n  .author-card-small .meta-info span {\n    display: block;\n    width: 100%;\n  }\n}\n.author-card-small .author-cover {\n  width: 100%;\n  height: 130px;\n  background-size: cover !important;\n  background-position-y: center !important;\n  border-bottom: 1px solid #f3f2f2;\n  background: linear-gradient(-15deg, rgba(255, 255, 255, 0.1) 100px, transparent 0), linear-gradient(15deg, rgba(255, 255, 255, 0.1) 100px, transparent 0), linear-gradient(-15deg, rgba(255, 255, 255, 0.1) 300px, transparent 0), linear-gradient(15deg, rgba(255, 255, 255, 0.1) 300px, transparent 0), linear-gradient(0deg, #749BE1 150px, #9267C7);\n}\n.post-template .post-count {\n  display: none !important;\n}\n.post-template .author-card-small {\n  border: 0;\n}\n.social-btns .btn,\n.social-btns .btn .fa,\n.social-btns .btn:before {\n  padding: 0;\n  transition: all 0.35s;\n  transition-timing-function: cubic-bezier(0.31, -0.105, 0.43, 1.59);\n  font-size: 14px;\n}\n.author-social .btn:hover,\n.social-btns .btn:hover {\n  cursor: pointer !important;\n}\n.author-social .btn .fab,\n.social-btns .btn .fab {\n  transform: scale(1);\n  margin: 0 10px 0 0;\n  transition: all 0.2s ease-out;\n}\n@media (max-width: 800px) {\n  .author-social .btn .fab,\n  .social-btns .btn .fab {\n    -webkit-transform: scale(0.8);\n  }\n}\n.social-btns .btn:focus .fab,\n.social-btns .btn:hover .fab,\n.social-btns .btn:hover .fas {\n  color: #fff;\n  -webkit-transform: scale(1.1);\n  transform: scale(1.1);\n}\n.social-btns .btn:hover i {\n  opacity: 1;\n  cursor: pointer;\n}\n.post .social-btns .btn {\n  position: relative;\n  overflow: hidden;\n  line-height: 1;\n}\n.post .social-btns .btn span {\n  z-index: 20;\n}\n.post .social-btns .btn:hover {\n  background: white;\n}\n.social-btns .btn:before {\n  display: none !important;\n}\n.author-social .btn,\n.author-social .btn i,\n.social-btns .btn,\n.social-btns .btn i {\n  transition: all 0.35s;\n  transition-timing-function: cubic-bezier(0.31, -0.105, 0.43, 1.59);\n}\n.social-btns .btn .fa {\n  font-size: 20px;\n  vertical-align: middle;\n}\n.sidebar .author-social .medium i,\n.sidebar .social-btns .medium i {\n  color: #1a1a1a;\n}\n.sidebar .author-social .medium:hover,\n.sidebar .social-btns .medium:hover {\n  background-color: #1a1a1a !important;\n  color: white;\n}\n.sidebar .author-social .facebook i,\n.sidebar .social-btns .facebook i {\n  color: #718dc8;\n}\n.sidebar .author-social .facebook:hover,\n.sidebar .social-btns .facebook:hover {\n  background-color: #718dc8 !important;\n  color: white;\n}\n.sidebar .author-social .twitter i,\n.sidebar .social-btns .twitter i {\n  color: #66d9ff;\n}\n.sidebar .author-social .twitter:hover,\n.sidebar .social-btns .twitter:hover {\n  background-color: #66d9ff !important;\n  color: white;\n}\n.sidebar .author-social .github i,\n.sidebar .social-btns .github i {\n  color: #1a1a1a;\n}\n.sidebar .author-social .github:hover,\n.sidebar .social-btns .github:hover {\n  background-color: #1a1a1a !important;\n  color: white;\n}\n.sidebar .author-social .tumblr i,\n.sidebar .social-btns .tumblr i {\n  color: #5a779d;\n}\n.sidebar .author-social .tumblr:hover,\n.sidebar .social-btns .tumblr:hover {\n  background-color: #5a779d !important;\n  color: white;\n}\n.sidebar .author-social .rss i,\n.sidebar .social-btns .rss i {\n  color: #ffa367;\n}\n.sidebar .author-social .rss:hover,\n.sidebar .social-btns .rss:hover {\n  background-color: #ffa367 !important;\n  color: white;\n}\n.sidebar .author-social .pocket i,\n.sidebar .social-btns .pocket i {\n  color: #f5778a;\n}\n.sidebar .author-social .pocket i:hover,\n.sidebar .social-btns .pocket i:hover {\n  background-color: #f5778a !important;\n  color: white;\n}\n.sidebar .author-social .quora i,\n.sidebar .social-btns .quora i {\n  color: #d6413d;\n}\n.sidebar .author-social .quora i:hover,\n.sidebar .social-btns .quora i:hover {\n  background-color: #d6413d !important;\n  color: white;\n}\n.sidebar .author-social .linkedin i,\n.sidebar .social-btns .linkedin i {\n  color: #6b90c4;\n}\n.sidebar .author-social .linkedin i:hover,\n.sidebar .social-btns .linkedin i:hover {\n  background-color: #6b90c4;\n  color: white;\n}\nnav .search .form-group::after {\n  content: '\\f002';\n  font-family: \"Font Awesome 5 Pro\";\n  font-weight: 400;\n  display: inline-block;\n  font-style: normal;\n  -webkit-font-feature-settings: normal;\n  font-feature-settings: normal;\n  font-variant: normal;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n  right: 33px;\n  top: 70px;\n  position: absolute;\n  color: #aeb4cc;\n  font-size: 1.2em;\n}\nnav .search #my-custom-input {\n  height: 100%;\n  width: 200px;\n  background: none;\n  border: none;\n  color: white;\n  padding-left: 20px;\n  font-size: 1em;\n  font-family: 'TTNormsPro-Regular', sans-serif;\n  font-weight: 300;\n}\n@media (max-width: 800px) {\n  nav .search #my-custom-input {\n    width: 150px !important;\n  }\n}\n@media (max-width: 800px) {\n  nav .search {\n    display: none;\n  }\n}\nnav #my-custom-results {\n  font-size: 1em;\n  font-family: 'TTNormsPro-Regular', sans-serif !important;\n  font-weight: 200;\n  transition: 0.3s all;\n  outline: none;\n  -webkit-appearance: none;\n  border: 1px solid #cfd3e0;\n  border-radius: 2px;\n  border-top: 0;\n  z-index: 2000;\n  box-shadow: 0 0 50px #7a84b5;\n  position: relative;\n  max-width: 350px;\n}\n@media (max-width: 800px) {\n  nav #my-custom-results {\n    visibility: hidden;\n  }\n}\nnav #my-custom-results * {\n  transition: 0.3s all;\n}\nnav #my-custom-results li {\n  width: 100%;\n  padding: 15px 5%;\n  text-align: left;\n  display: flex;\n  justify-content: space-between;\n  background: #fff;\n}\nnav #my-custom-results li:nth-child(even) {\n  background: #f5f8fb;\n}\nnav #my-custom-results li:hover {\n  background: #87cbe1;\n  color: white;\n  border: 0;\n}\nnav #my-custom-results li:hover a {\n  color: white;\n}\nnav #my-custom-results li img {\n  height: 55px;\n  width: 133px;\n  overflow: hidden;\n  margin-right: 15px;\n}\nnav #my-custom-results li div {\n  width: 100%;\n}\nnav #my-custom-results li div a {\n  display: block;\n  line-height: 1.4;\n  font-size: 0.9em;\n  -webkit-line-clamp: 2;\n  font-weight: 600;\n}\nnav #my-custom-results li div .tag {\n  display: block;\n  line-height: 1.5;\n}\nnav #my-custom-results li div .tag span {\n  font-size: 0.7em;\n  font-weight: 100;\n  line-height: 1.5;\n  padding: 5px 10px;\n  margin-top: 4px;\n  display: block;\n  width: fit-content;\n}\nnav #my-custom-results li div .tag span i {\n  margin-right: 4px;\n  font-size: 0.7em;\n  display: none;\n}\nnav #nav-search-results {\n  width: 226px;\n  position: absolute;\n  font-size: 1em;\n  font-family: 'TTNormsPro-Regular', sans-serif !important;\n  font-weight: 200;\n  transition: 0.3s all;\n  outline: none;\n  -webkit-appearance: none;\n  border: 1px solid #cfd3e0;\n  border-radius: 0 0 5px 5px;\n  border-top: 0;\n  opacity: 0;\n  z-index: 10;\n}\nnav #nav-search-results * {\n  transition: 0.3s all;\n}\nnav #nav-search-results li {\n  width: -webkit-fill-available;\n  padding: 10px;\n  text-align: left;\n  display: flex;\n  justify-content: space-between;\n  background: #fff;\n}\nnav #nav-search-results li a {\n  font-size: 0.8em;\n  font-family: 'TTNormsPro-Regular', sans-serif;\n}\nnav #nav-search-results li:nth-child(even) {\n  background: #f5f8fb;\n}\nnav #nav-search-results li:hover {\n  background: #87cbe1;\n  color: white;\n  border: 0;\n}\nnav #nav-search-results li:hover a {\n  color: white;\n}\nnav #nav-search-results li img {\n  height: 55px;\n  width: 133px;\n  overflow: hidden;\n  margin-right: 15px;\n}\nnav #nav-search-results li div {\n  width: 100%;\n}\nnav #nav-search-results li div a {\n  display: block;\n  line-height: 1.4;\n  font-size: 0.9em;\n  -webkit-line-clamp: 2;\n  font-weight: 600;\n}\nnav #nav-search-results li div .tag {\n  display: block;\n  line-height: 1.5;\n}\nnav #nav-search-results li div .tag span {\n  font-size: 0.7em;\n  font-weight: 100;\n  line-height: 1.5;\n  padding: 5px 10px;\n  margin-top: 4px;\n  display: block;\n  width: fit-content;\n}\nnav #nav-search-results li div .tag span i {\n  margin-right: 4px;\n  font-size: 0.7em;\n  display: none;\n}\n/* Page Styles */\n.page-template h1 {\n  font-weight: 100;\n}\n.page-template .main-content {\n  box-shadow: 0 0 5px rgba(65, 67, 144, 0.15);\n  background: white;\n}\n.page-template .main-content a {\n  font-family: 'TTNormsPro-Medium', sans-serif;\n}\n.container {\n  background: white;\n  padding: 20px 40px;\n  margin: 40px auto;\n  box-shadow: 0 0 3px rgba(65, 67, 144, 0.1);\n  width: 80% !important;\n}\nh1 {\n  font-family: 'TTNormsPro-Regular', sans-serif !important;\n}\na,\np {\n  font-family: 'TTNormsPro-Regular', sans-serif !important;\n}\n.page-template section {\n  height: 600px;\n}\n",""])},5:function(n,t,a){"use strict";n.exports=function(n){var t=[];return t.toString=function(){return this.map(function(t){var a=function(n,t){var a=n[1]||"",o=n[3];if(!o)return a;if(t&&"function"==typeof btoa){var e=(i=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),r=o.sources.map(function(n){return"/*# sourceURL="+o.sourceRoot+n+" */"});return[a].concat(r).concat([e]).join("\n")}var i;return[a].join("\n")}(t,n);return t[2]?"@media "+t[2]+"{"+a+"}":a}).join("")},t.i=function(n,a){"string"==typeof n&&(n=[[null,n,""]]);for(var o={},e=0;e<this.length;e++){var r=this[e][0];null!=r&&(o[r]=!0)}for(e=0;e<n.length;e++){var i=n[e];null!=i[0]&&o[i[0]]||(a&&!i[2]?i[2]=a:a&&(i[2]="("+i[2]+") and ("+a+")"),t.push(i))}},t}},6:function(n,t,a){var o,e,r={},i=(o=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===e&&(e=o.apply(this,arguments)),e}),s=function(n){var t={};return function(n,a){if("function"==typeof n)return n();if(void 0===t[n]){var o=function(n,t){return t?t.querySelector(n):document.querySelector(n)}.call(this,n,a);if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement)try{o=o.contentDocument.head}catch(n){o=null}t[n]=o}return t[n]}}(),l=null,c=0,p=[],d=a(7);function m(n,t){for(var a=0;a<n.length;a++){var o=n[a],e=r[o.id];if(e){e.refs++;for(var i=0;i<e.parts.length;i++)e.parts[i](o.parts[i]);for(;i<o.parts.length;i++)e.parts.push(x(o.parts[i],t))}else{var s=[];for(i=0;i<o.parts.length;i++)s.push(x(o.parts[i],t));r[o.id]={id:o.id,refs:1,parts:s}}}}function u(n,t){for(var a=[],o={},e=0;e<n.length;e++){var r=n[e],i=t.base?r[0]+t.base:r[0],s={css:r[1],media:r[2],sourceMap:r[3]};o[i]?o[i].parts.push(s):a.push(o[i]={id:i,parts:[s]})}return a}function f(n,t){var a=s(n.insertInto);if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=p[p.length-1];if("top"===n.insertAt)o?o.nextSibling?a.insertBefore(t,o.nextSibling):a.appendChild(t):a.insertBefore(t,a.firstChild),p.push(t);else if("bottom"===n.insertAt)a.appendChild(t);else{if("object"!=typeof n.insertAt||!n.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var e=s(n.insertAt.before,a);a.insertBefore(t,e)}}function h(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n);var t=p.indexOf(n);t>=0&&p.splice(t,1)}function g(n){var t=document.createElement("style");if(void 0===n.attrs.type&&(n.attrs.type="text/css"),void 0===n.attrs.nonce){var o=function(){0;return a.nc}();o&&(n.attrs.nonce=o)}return b(t,n.attrs),f(n,t),t}function b(n,t){Object.keys(t).forEach(function(a){n.setAttribute(a,t[a])})}function x(n,t){var a,o,e,r;if(t.transform&&n.css){if(!(r="function"==typeof t.transform?t.transform(n.css):t.transform.default(n.css)))return function(){};n.css=r}if(t.singleton){var i=c++;a=l||(l=g(t)),o=w.bind(null,a,i,!1),e=w.bind(null,a,i,!0)}else n.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(a=function(n){var t=document.createElement("link");return void 0===n.attrs.type&&(n.attrs.type="text/css"),n.attrs.rel="stylesheet",b(t,n.attrs),f(n,t),t}(t),o=function(n,t,a){var o=a.css,e=a.sourceMap,r=void 0===t.convertToAbsoluteUrls&&e;(t.convertToAbsoluteUrls||r)&&(o=d(o));e&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */");var i=new Blob([o],{type:"text/css"}),s=n.href;n.href=URL.createObjectURL(i),s&&URL.revokeObjectURL(s)}.bind(null,a,t),e=function(){h(a),a.href&&URL.revokeObjectURL(a.href)}):(a=g(t),o=function(n,t){var a=t.css,o=t.media;o&&n.setAttribute("media",o);if(n.styleSheet)n.styleSheet.cssText=a;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(a))}}.bind(null,a),e=function(){h(a)});return o(n),function(t){if(t){if(t.css===n.css&&t.media===n.media&&t.sourceMap===n.sourceMap)return;o(n=t)}else e()}}n.exports=function(n,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=i()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var a=u(n,t);return m(a,t),function(n){for(var o=[],e=0;e<a.length;e++){var i=a[e];(s=r[i.id]).refs--,o.push(s)}n&&m(u(n,t),t);for(e=0;e<o.length;e++){var s;if(0===(s=o[e]).refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete r[s.id]}}}};var v,y=(v=[],function(n,t){return v[n]=t,v.filter(Boolean).join("\n")});function w(n,t,a,o){var e=a?"":o.css;if(n.styleSheet)n.styleSheet.cssText=y(t,e);else{var r=document.createTextNode(e),i=n.childNodes;i[t]&&n.removeChild(i[t]),i.length?n.insertBefore(r,i[t]):n.appendChild(r)}}},7:function(n,t){n.exports=function(n){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!n||"string"!=typeof n)return n;var a=t.protocol+"//"+t.host,o=a+t.pathname.replace(/\/[^\/]*$/,"/");return n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(n,t){var e,r=t.trim().replace(/^"(.*)"$/,function(n,t){return t}).replace(/^'(.*)'$/,function(n,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r)?n:(e=0===r.indexOf("//")?r:0===r.indexOf("/")?a+r:o+r.replace(/^\.\//,""),"url("+JSON.stringify(e)+")")})}}});