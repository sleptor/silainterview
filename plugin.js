/**
 * @license MIT
 * Copyright (c) 2018-present, Silamedia
 */
(function (w, d) {

    const version = '1.1',
        flag = 'SilaInteractiviewLoaded';

    if (typeof w[flag] !== 'undefined') {
        return;
    }

    console.log('SilaInteractiview ' + version);
    w[flag] = true;

    const styles = `
.sila-interactiview {
    position: relative;
    margin-bottom: 15px;
}
.sila-interactiview ul {
    list-style: none !important;
    margin: 0;
    padding: 0;
}
.sila-interactiview .sila-description {
    float: left;
    width: 300px;
    margin: 0 15px 15px 0;
}
.sila-interactiview .sila-questions {
    padding-left: 310px;
}
.sila-interactiview .sila-questions li{
   padding-bottom: 5px;
}
.sila-interactiview .sila-questions h3{
   padding: 0;
   margin: 10px 0;
}
.sila-interactiview .sila-questions li:last-child{
   padding-bottom: 0;
}
.sila-interactiview .sila-video-player {
    padding-left: 310px;
}
.sila-interactiview .sila-branding {
    opacity: 0.5;
    color: #666;
    font-size: 11px;
    font-family: Arial;
    position: absolute;
    left:0;
    bottom: 3px;
}

.sila-interactiview .sila-branding:hover {
    opacity: 1;
}
    
.sila-interactiview .sila-branding span {
    color: #e67417;
}
.sila-interactiview .sila-branding a {
    color: #666;
    text-decoration: none;
}
.sila-interactiview .sila-poster {
}    

@media screen and (max-width: 761px) {
    .sila-interactiview .sila-description {
        float: none;
        width: 100%;
        margin: 0 0 15px 0;
    }
    .sila-interactiview .sila-questions {
        padding-left: 0;
    }
    .sila-interactiview .sila-questions li{
       padding-bottom: 10px;
    }
    .sila-interactiview .sila-video-player {
        padding-left: 0;
    }
    .sila-interactiview .sila-video-player img {
        width: 100%;
    }
    .sila-interactiview .sila-video-player iframe {
        width: 100% !important;
    }
    .sila-interactiview .sila-branding {
        margin: 10px auto;
        text-align: center;
        position: relative;
    }
}`;

    var defaultSettings = {
        css: false,
        autoScroll: true,
        video: {
            width: "640px",
            height: "360px"
        }
    };

    function render(data) {

        var cnt = d.getElementById(data.id);
        if (!cnt) {
            return;
        }

        var videoSettings = data.video || defaultSettings.video;

        var title = d.createElement('h2');
        title.innerHTML = data.title;

        cnt.appendChild(title);

        var descr = d.createElement('div');
        descr.className = 'sila-description';
        descr.innerHTML = data.description;
        cnt.appendChild(descr);

        var video = d.createElement('div');
        video.className = 'sila-video-player';
        video.innerHTML = '<img class="sila-poster" src="' + data.poster + '" style="max-width:'+videoSettings.width+'">';
        cnt.appendChild(video);

        var qcnt = d.createElement('div');
        qcnt.className = 'sila-questions';
        var qlabel = d.createElement('h3');
        qlabel.innerHTML = 'Выберите вопрос';
        qcnt.appendChild(qlabel);

        var ul = d.createElement('ul');
        qcnt.appendChild(ul);

        for (var qi in data.questions) {

            if (data.questions.hasOwnProperty(qi)) {

                var li = d.createElement('li');
                var id = data.id + '_radio_' + qi;

                li.innerHTML = '<label for="' + id + '">' +
                    '<input type="radio" name="' + data.id + '_radio" id="' + id + '" value="' + qi + '" class="sila-question"> ' + data.questions[qi].text +
                    '</label>';

                (function (url) {
                    li.addEventListener('click', function (e) {
                        console.log(url);
                        video.innerHTML = '<iframe style="width:' + defaultSettings.video.width + '; height:' + defaultSettings.video.height + ';" src="' + url + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';

                        if (defaultSettings.autoScroll) {
                           scrollTo(video, 200);
                        }
                    });
                })(prepareUrl(data.questions[qi].url));

                ul.appendChild(li);
            }
        }

        cnt.appendChild(qcnt);

        const branding = d.createElement('div');
        branding.className = 'sila-branding';
        branding.innerHTML = '<a href="https://sila.media/interactiview">Interactiview by <span>Silamedia</span></a>';

        cnt.appendChild(branding);
    }

    function prepareUrl(url) {
        let id = youtubeUrlParser(url);

        let query = id + '?autoplay=1';

        let t= getParameterByName('t', url);

        if (t) {
            query += '&start=' + convertTime(t);
        }

        return 'https://www.youtube-nocookie.com/embed/' + query;
    }

    function convertTime(duration) {
        var total = 0;
        var hours = duration.match(/(\d+)h/);
        var minutes = duration.match(/(\d+)m/);
        var seconds = duration.match(/(\d+)s/);
        if (hours) total += parseInt(hours[1]) * 3600;
        if (minutes) total += parseInt(minutes[1]) * 60;
        if (seconds) total += parseInt(seconds[1]);
        return total;
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function youtubeUrlParser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[7].length === 11) {
            return match[7];
        } else {
            return null
        }
    }

    function appendToHead(el) {
        (d.getElementsByTagName('head')[0] || d.getElementsByTagName('body')[0]).appendChild(el);
    }

    function injectStyles(css) {
        var c = d.createElement('style');
        appendToHead(c);
        c.type = 'text/css';
        c.innerHTML = css;
    }

    function scrollTo(element, duration) {

        var start = window.pageYOffset || document.documentElement.scrollTop,
            change = calculateScrollOffset(element, -20) - start,
            currentTime = 0,
            increment = 20;

        if(change >= 0) {
            return;
        }

        var animateScroll = function () {
            currentTime += increment;
            window.scrollTo(0, easeInOutQuad(currentTime, start, change, duration));

            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }

    function calculateScrollOffset(elem, additionalOffset, alignment) {
        var body = document.body,
            html = document.documentElement;

        var elemRect = elem.getBoundingClientRect();
        var clientHeight = html.clientHeight;
        var documentHeight = Math.max( body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight );

        additionalOffset = additionalOffset || 0;

        var scrollPosition;
        if (alignment === 'bottom') {
            scrollPosition = elemRect.bottom - clientHeight;
        } else if (alignment === 'middle') {
            scrollPosition = elemRect.bottom - clientHeight / 2 - elemRect.height / 2;
        } else { // top and default
            scrollPosition = elemRect.top;
        }

        var maxScrollPosition = documentHeight - clientHeight;
        return Math.min(scrollPosition + additionalOffset + window.pageYOffset,
            maxScrollPosition);
    }

    //t = current time
    //b = start value
    //c = change in value
    //d = duration
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    d.addEventListener("DOMContentLoaded", function (event) {

        var SilaInteractiview = w['SilaInteractiview'] || [];

        if (!SilaInteractiview.length) {
            return;
        }

        injectStyles(styles);

        for (var i in SilaInteractiview) {

            if (SilaInteractiview.hasOwnProperty(i)) {
                render(SilaInteractiview[i]);
            }
        }
    });

})(window, document);
