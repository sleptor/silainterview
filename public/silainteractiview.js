!function(e){var n={};function t(i){if(n[i])return n[i].exports;var a=n[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,t),a.l=!0,a.exports}t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n){
/**
 * @license MIT
 * Copyright (c) 2018-present, Silamedia
 */
!function(e,n){var t="SilaInteractiviewLoaded";if(void 0===e[t]){e[t]=!0;var i={css:!1,autoScroll:!0,video:{width:"640px",height:"360px"}};n.addEventListener("DOMContentLoaded",function(n){var t=e.SilaInteractiview||[];if(t.length)for(var i in o("\n.sila-interactiview ul {\n    list-style: none !important;\n    margin: 0;\n    padding: 0;\n}\n.sila-interactiview .sila-description {\n    float: left;\n    width: 300px;\n    margin: 0 15px 15px 0;\n}\n.sila-interactiview .sila-questions {\n    padding-left: 310px;\n}\n.sila-interactiview .sila-video-player {\n    padding-left: 310px;\n}\n.sila-interactiview .sila-poster {\n    background-color: transparent;\n    background-position: 50% 50%;\n    background-size: cover;\n    background-repeat: no-repeat;\n}\n@media screen and (max-width: 761px) {\n    .sila-interactiview .sila-description {\n        float: left;\n        width: 100%;\n    }\n    .sila-interactiview .sila-questions {\n        padding-left: 0;\n    }\n    .sila-interactiview .sila-video-player {\n        padding-left: 0;\n    }\n    .sila-interactiview .sila-video-player img {\n        width: 100%;\n    }\n    .sila-interactiview .sila-video-player iframe {\n        width: 100% !important;\n    }\n}"),t)t.hasOwnProperty(i)&&a(t[i])})}function a(e){var t=n.getElementById(e.id);if(t){var a=e.video||i.video,o=n.createElement("h2");o.innerHTML=e.title,t.appendChild(o);var l=n.createElement("div");l.className="sila-description",l.innerHTML=e.description,t.appendChild(l);var d=n.createElement("div");d.className="sila-video-player",d.innerHTML='<div class="sila-poster" style="width:'+a.width+";height: "+a.height+";background-image: url("+e.poster+')"></div>',t.appendChild(d);var s=n.createElement("div");s.className="sila-questions";var c=n.createElement("h3");c.innerHTML="Выберите вопрос",s.appendChild(c);var p=n.createElement("ul");for(var u in s.appendChild(p),e.questions)if(e.questions.hasOwnProperty(u)){var v=n.createElement("li"),f=e.id+"_radio_"+u;v.innerHTML='<label for="'+f+'"><input type="radio" name="'+e.id+'_radio" id="'+f+'" value="'+u+'" class="sila-question"> '+e.questions[u].text+"</label>",function(e){v.addEventListener("click",function(t){var a,r,o,l,s,c,p;console.log(e),d.innerHTML='<iframe style="width:'+i.video.width+"; height:"+i.video.height+';" src="'+e+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',i.autoScroll&&(a=n.documentElement,r=d.offsetTop,o=100,l=a.scrollTop,s=r-l,c=0,20,(p=function(){var e,n,t;c+=20,a.scrollTop=(e=c,n=l,t=s,(e/=o/2)<1?t/2*e*e+n:-t/2*(--e*(e-2)-1)+n),c<o&&setTimeout(p,20)})())})}(r(e.questions[u].url)),p.appendChild(v)}t.appendChild(s)}}function r(e){let n=function(e){var n=e.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);return n&&11==n[7].length?n[7]:null}(e),t=function(e){var n={};return e.split("&").forEach(function(e){var t=e.split("=");n[t[0]]=decodeURIComponent(t[1])}),n}(e),i=n+"?autoplay=1";return t.hasOwnProperty("t")&&(i+="&start="+function(e){var n=0,t=e.match(/(\d+)h/),i=e.match(/(\d+)m/),a=e.match(/(\d+)s/);t&&(n+=3600*parseInt(t[1]));i&&(n+=60*parseInt(i[1]));a&&(n+=parseInt(a[1]));return n}(t.t)),"https://www.youtube.com/embed/"+i}function o(e){var t,i=n.createElement("style");t=i,(n.getElementsByTagName("head")[0]||n.getElementsByTagName("body")[0]).appendChild(t),i.type="text/css",i.innerHTML=e}}(window,document)}]);