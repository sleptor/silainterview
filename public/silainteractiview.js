!function(e){var n={};function i(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=n,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},i.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},i.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="",i(i.s=0)}([function(e,n){
/**
 * @license MIT
 * Copyright (c) 2018-present, Silamedia
 */
!function(e,n){var i="SilaInteractiviewLoaded";if(void 0===e[i]){e[i]=!0;var t={css:!1,autoScroll:!0,video:{width:"640px",height:"360px"}};n.addEventListener("DOMContentLoaded",function(n){var i=e.SilaInteractiview||[];if(i.length)for(var t in l("\n.sila-interactiview ul {\n    list-style: none !important;\n    margin: 0;\n    padding: 0;\n}\n.sila-interactiview .sila-description {\n    float: left;\n    width: 300px;\n    margin: 0 15px 15px 0;\n}\n.sila-interactiview .sila-questions {\n    padding-left: 310px;\n}\n.sila-interactiview .sila-video-player {\n    padding-left: 310px;\n}\n.sila-interactiview .sila-poster {\n    background-color: transparent;\n    background-position: 50% 50%;\n    background-size: cover;\n    background-repeat: no-repeat;\n}\n@media screen and (max-width: 761px) {\n    .sila-interactiview .sila-description {\n        float: left;\n        width: 100%;\n    }\n    .sila-interactiview .sila-questions {\n        padding-left: 0;\n    }\n    .sila-interactiview .sila-video-player {\n        padding-left: 0;\n    }\n    .sila-interactiview .sila-video-player img {\n        width: 100%;\n    }\n    .sila-interactiview .sila-video-player iframe {\n        width: 100% !important;\n    }\n}"),i)i.hasOwnProperty(t)&&a(i[t])})}function a(e){var i=n.getElementById(e.id);if(i){var a=e.video||t.video,l=n.createElement("h2");l.innerHTML=e.title,i.appendChild(l);var o=n.createElement("div");o.className="sila-description",o.innerHTML=e.description,i.appendChild(o);var d=n.createElement("div");d.className="sila-video-player",d.innerHTML='<div class="sila-poster" style="width:'+a.width+";height: "+a.height+";background-image: url("+e.poster+')"></div>',i.appendChild(d);var s=n.createElement("div");s.className="sila-questions";var c=n.createElement("h3");c.innerHTML="Выберите вопрос",s.appendChild(c);var p=n.createElement("ul");for(var u in s.appendChild(p),e.questions)if(e.questions.hasOwnProperty(u)){var v=n.createElement("li"),f=e.id+"_radio_"+u;v.innerHTML='<label for="'+f+'"><input type="radio" name="'+e.id+'_radio" id="'+f+'" value="'+u+'" class="sila-question"> '+e.questions[u].text+"</label>",function(e){v.addEventListener("click",function(){var i,a,l,o,s,c,p,u=r(e);e="https://www.youtube.com/embed/"+u+"?autoplay=1",d.innerHTML='<iframe style="width:'+t.video.width+"; height:"+t.video.height+';" src="'+e+'" frameborder="0" allowfullscreen></iframe>',t.autoScroll&&(i=n.documentElement,a=d.offsetTop,l=100,o=i.scrollTop,s=a-o,c=0,20,(p=function(){var e,n,t;c+=20,i.scrollTop=(e=c,n=o,t=s,(e/=l/2)<1?t/2*e*e+n:-t/2*(--e*(e-2)-1)+n),c<l&&setTimeout(p,20)})())})}(e.questions[u].url),p.appendChild(v)}i.appendChild(s)}}function r(e){var n=e.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);return n&&11==n[7].length?n[7]:null}function l(e){var i,t=n.createElement("style");i=t,(n.getElementsByTagName("head")[0]||n.getElementsByTagName("body")[0]).appendChild(i),t.type="text/css",t.innerHTML=e}}(window,document)}]);