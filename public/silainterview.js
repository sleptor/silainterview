/**
 * (c) 2017 sleptor
 * The MIT License (MIT)
 * version: 1.0.0
 */

(function (w, d) {
    var flag = 'SilaInterviewLoaded';

    if (typeof w[flag] !== 'undefined') {
        return;
    }

    w[flag] = true;

    var styles = " \
    .silainterview ul { \
        list-style: none !important; \
        margin: 0;\
        padding: 0;\
    } \
    .silainterview .sila-description { \
        float: left; \
        width: 300px; \
        margin-bottom: 15px; \
    } \
    .silainterview .sila-questions { \
        padding-left: 300px; \
    } \
    .silainterview .sila-video-player { \
        padding-left: 300px; \
    } \
    @media screen and (max-width: 761px) { \
        .silainterview .sila-description { \
            float: left; \
            width: 100%; \
        } \
        .silainterview .sila-questions { \
            padding-left: 0; \
        } \
        .silainterview .sila-video-player { \
            padding-left: 0; \
        } \
        .silainterview .sila-video-player img { \
            width: 100%; \
        } \
        .silainterview .sila-video-player iframe { \
            width: 100% !important; \
        } \
    } \
    ";

    var settings = {
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

        var h1 = d.createElement('h1');
        h1.innerHTML = data.title;

        cnt.appendChild(h1);

        var descr = d.createElement('div');
        descr.className = 'sila-description';
        descr.innerHTML = data.description;
        cnt.appendChild(descr);

        var video = d.createElement('div');
        video.className = 'sila-video-player';
        video.innerHTML = '<img src="' + data.poster + '">';
        cnt.appendChild(video);

        var qcnt = d.createElement('div');
        qcnt.className = 'sila-questions';
        var h2 = d.createElement('h2');
        h2.innerHTML = 'Выберите вопрос';
        qcnt.appendChild(h2);

        var ul = d.createElement('ul');
        qcnt.appendChild(ul);

        for (var qi in data.questions) {

            if (data.questions.hasOwnProperty(qi)) {

                var li = d.createElement('li');
                var id = data.id+'_radio_'+qi;

                li.innerHTML = '<label for="'+id+'">' +
                    '<input type="radio" name="'+data.id+'_radio" id="'+id+'" value="'+qi+'" class="question"> ' + data.questions[qi].text +
                    '</label>';

                (function (url) {
                    li.addEventListener('click', function () {
                        var id = youtubeUrlParser(url);

                        url = 'https://www.youtube.com/embed/'+id+'?autoplay=1';
                        video.innerHTML = '<iframe style="width:'+settings.video.width+'; height:'+settings.video.height+';" src="'+url+'" frameborder="0" allowfullscreen></iframe>';

                        if (settings.autoScroll) {
                            scrollTo(d.documentElement, video.offsetTop, 100);
                        }
                    });
                })(data.questions[qi].url);

                ul.appendChild(li);
            }
        }

        cnt.appendChild(qcnt);
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

        var animateScroll = function(){
            currentTime += increment;
            element.scrollTop = easeInOutQuad(currentTime, start, change, duration);;
            if(currentTime < duration) {
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
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    d.addEventListener("DOMContentLoaded", function (event) {

        var SilaInterview = w['SilaInterview'] || [];

        if (!SilaInterview.length) {
            return;
        }

        injectStyles(styles);

        for (var i in SilaInterview) {

            if (SilaInterview.hasOwnProperty(i)) {
                render(SilaInterview[i]);
            }
        }
    });

})(window, document);