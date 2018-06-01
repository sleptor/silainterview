/**
 * @license MIT
 * Copyright (c) 2018-present, Silamedia
 */
(function (w, d) {
    var flag = 'SilaInteractiviewLoaded';

    if (typeof w[flag] !== 'undefined') {
        return;
    }

    w[flag] = true;

    var styles = `
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
.sila-interactiview .sila-video-player {
    padding-left: 310px;
}
.sila-interactiview .sila-poster {
    background-color: transparent;
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
}
@media screen and (max-width: 761px) {
    .sila-interactiview .sila-description {
        float: left;
        width: 100%;
    }
    .sila-interactiview .sila-questions {
        padding-left: 0;
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
        video.innerHTML = '<div class="sila-poster" style="width:' + videoSettings.width + ';height: ' + videoSettings.height + ';background-image: url(' + data.poster + ')"></div>';
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
                            scrollTo(d.documentElement, video.offsetTop, 100);
                        }
                    });
                })(prepareUrl(data.questions[qi].url));

                ul.appendChild(li);
            }
        }

        cnt.appendChild(qcnt);
    }

    function prepareUrl(url) {
        let id = youtubeUrlParser(url);
        let queryObj = parseQuery(url);
        let query = id + '?autoplay=1';

        if (queryObj.hasOwnProperty('t')) {
            query += '&start=' + convertTime(queryObj['t']);
        }

        return 'https://www.youtube.com/embed/' + query;
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

    function parseQuery(query) {
        var result = {};
        query.split("&").forEach(function (part) {
            var item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    }

    function youtubeUrlParser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[7].length == 11) {
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

    function scrollTo(element, to, duration) {
        var start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;

        var animateScroll = function () {
            currentTime += increment;
            element.scrollTop = easeInOutQuad(currentTime, start, change, duration);
            ;
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
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
    };

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