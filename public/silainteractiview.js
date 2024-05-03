!function(n){var e={};function i(t){if(e[t])return e[t].exports;var a=e[t]={i:t,l:!1,exports:{}};return n[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=n,i.c=e,i.d=function(n,e,t){i.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:t})},i.r=function(n){Object.defineProperty(n,"__esModule",{value:!0})},i.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return i.d(e,"a",e),e},i.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},i.p="",i(i.s=0)}([function(n,e){
/**
 * @license MIT
 * Copyright (c) 2018-present, Silamedia
 */
!function(n,e){const i="SilaInteractiviewLoaded";if(void 0!==n[i])return;console.log("SilaInteractiview 1.2"),n[i]=!0;var t={css:!1,autoScroll:!0,video:{width:"640px",height:"360px"}};function a(n){var i=e.getElementById(n.id);if(!i)return;var a=n.video||t.video,o=e.createElement("h2");o.innerHTML=n.title,i.appendChild(o);var s=e.createElement("div");s.className="sila-description",s.innerHTML=n.description,i.appendChild(s);var d=e.createElement("div");d.className="sila-video-player",d.innerHTML='<img class="sila-poster" src="'+n.poster+'" style="max-width:'+a.width+'">',i.appendChild(d);var c=e.createElement("div");c.className="sila-questions";var p=e.createElement("h3");p.innerHTML="Выберите вопрос",c.appendChild(p);var u=e.createElement("ul");for(var v in c.appendChild(u),n.questions)if(n.questions.hasOwnProperty(v)){var m=e.createElement("li"),f=n.id+"_radio_"+v;m.innerHTML='<label for="'+f+'"><input type="radio" name="'+n.id+'_radio" id="'+f+'" value="'+v+'" class="sila-question"> '+n.questions[v].text+"</label>",function(n){m.addEventListener("click",function(e){console.log(n),d.innerHTML='<iframe style="width:'+t.video.width+"; height:"+t.video.height+';" src="'+n+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',t.autoScroll&&l(d,200)})}(r(n.questions[v].url)),u.appendChild(m)}i.appendChild(c);const h=e.createElement("div");h.className="sila-branding",h.innerHTML='<a href="https://sila.media/interactiview">Interactiview by <span>Silamedia</span></a>',i.appendChild(h)}function r(n){let e=function(n){var e=n.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);return e&&11===e[7].length?e[7]:null}(n)+"?autoplay=1",i=function(n,e){e||(e=window.location.href);n=n.replace(/[\[\]]/g,"\\$&");var i=new RegExp("[?&]"+n+"(=([^&#]*)|&|#|$)").exec(e);return i?i[2]?decodeURIComponent(i[2].replace(/\+/g," ")):"":null}("t",n);return i&&(e+="&start="+function(n){var e=0,i=n.match(/(\d+)h/),t=n.match(/(\d+)m/),a=n.match(/(\d+)s$/),r=n.match(/(\d+)$/);i&&(e+=3600*parseInt(i[1]));t&&(e+=60*parseInt(t[1]));a&&(e+=parseInt(a[1]));r&&(e+=parseInt(r[1]));return e}(i)),"https://www.youtube-nocookie.com/embed/"+e}function o(n){var i,t=e.createElement("style");i=t,(e.getElementsByTagName("head")[0]||e.getElementsByTagName("body")[0]).appendChild(i),t.type="text/css",t.innerHTML=n}function l(n,e){var i=window.pageYOffset||document.documentElement.scrollTop,t=function(n,e,i){var t,a=document.body,r=document.documentElement,o=n.getBoundingClientRect(),l=r.clientHeight,s=Math.max(a.scrollHeight,a.offsetHeight,r.clientHeight,r.scrollHeight,r.offsetHeight);e=e||0,t="bottom"===i?o.bottom-l:"middle"===i?o.bottom-l/2-o.height/2:o.top;var d=s-l;return Math.min(t+e+window.pageYOffset,d)}(n,-20)-i,a=0;if(!(t>=0)){var r=function(){var n,o,l;a+=20,window.scrollTo(0,(n=a,o=i,l=t,(n/=e/2)<1?l/2*n*n+o:-l/2*(--n*(n-2)-1)+o)),a<e&&setTimeout(r,20)};r()}}e.addEventListener("DOMContentLoaded",function(e){var i=n.SilaInteractiview||[];if(i.length)for(var t in o("\n.sila-interactiview {\n    position: relative;\n    margin-bottom: 15px;\n}\n.sila-interactiview ul {\n    list-style: none !important;\n    margin: 0;\n    padding: 0;\n}\n.sila-interactiview .sila-description {\n    float: left;\n    width: 300px;\n    margin: 0 15px 15px 0;\n}\n.sila-interactiview .sila-questions {\n    padding-left: 310px;\n}\n.sila-interactiview .sila-questions li{\n   padding-bottom: 5px;\n}\n.sila-interactiview .sila-questions h3{\n   padding: 0;\n   margin: 10px 0;\n}\n.sila-interactiview .sila-questions li:last-child{\n   padding-bottom: 0;\n}\n.sila-interactiview .sila-video-player {\n    padding-left: 310px;\n}\n.sila-interactiview .sila-branding {\n    opacity: 0.5;\n    color: #666;\n    font-size: 11px;\n    font-family: Arial;\n    position: absolute;\n    left:0;\n    bottom: 3px;\n}\n\n.sila-interactiview .sila-branding:hover {\n    opacity: 1;\n}\n    \n.sila-interactiview .sila-branding span {\n    color: #e67417;\n}\n.sila-interactiview .sila-branding a {\n    color: #666;\n    text-decoration: none;\n}\n.sila-interactiview .sila-poster {\n}    \n\n@media screen and (max-width: 761px) {\n    .sila-interactiview .sila-description {\n        float: none;\n        width: 100%;\n        margin: 0 0 15px 0;\n    }\n    .sila-interactiview .sila-questions {\n        padding-left: 0;\n    }\n    .sila-interactiview .sila-questions li{\n       padding-bottom: 10px;\n    }\n    .sila-interactiview .sila-video-player {\n        padding-left: 0;\n    }\n    .sila-interactiview .sila-video-player img {\n        width: 100%;\n    }\n    .sila-interactiview .sila-video-player iframe {\n        width: 100% !important;\n    }\n    .sila-interactiview .sila-branding {\n        margin: 10px auto;\n        text-align: center;\n        position: relative;\n    }\n}"),i)i.hasOwnProperty(t)&&a(i[t])})}(window,document)}]);