/**
 * (c) 2017 sleptor
 * The MIT License (MIT)
 * version: 1.0.0
 */

(function ($) {
    $.fn.SilaInterview = function (options) {

        var settings = $.extend({
            css: false,
            youtubeTpl: default_youtube_tpl,
            questionTpl: default_question_tpl,
            autoScroll: true,
            video: {
                height: "300px",
                width: "350px"
            }
        }, options);

        if (settings.css) {
            $("head").append("<link rel='stylesheet' href='" + settings.css + "' type='text/css' media='screen'>");
        }

        var $cnt = $(this);
        if (!$cnt.length) {
            return;
        }

        var index = 0;
        $('ul li', $cnt).each(function () {
            var question = templateEngine(settings.questionTpl, {id: $cnt.attr('id'), index: index, text: $(this).text()});
            $(this).html(question);
            index++;
        });

        $('.question', $cnt).on('click', function () {
            var url = $(this).closest('li').data('video');
            var id = youtubeUrlParser(url);
            if (id) {
                var code = templateEngine(settings.youtubeTpl, {id: id, params: settings.video});
                var $player = $('.sila-video-player', $cnt);
                $player.html(code);

                if (settings.autoScroll) {
                    $('html, body').animate({
                        scrollTop: $player.offset().top
                    }, 1000);
                }

            } else {
                alert('Silemedia interview: bad youtube url: ' + url)
            }
        });
    };

    var default_youtube_tpl =
        '<iframe style="width:<%this.params.width%>; height:<%this.params.height%>;" src="https://www.youtube.com/embed/<%this.id%>?autoplay=1" frameborder="0" allowfullscreen></iframe>';

    var default_question_tpl =
        '<label for="<%this.id%>_radio_<%this.index%>">' +
            '<input type="radio" name="<%this.id%>_radio" id="<%this.id%>_radio_<%this.index%>" value="<%this.index%>" class="question"><%this.text%>' +
            '</label>';

    function youtubeUrlParser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[7].length == 11) {
            return match[7];
        } else {
            return null
        }
    }

    var templateEngine = function (html, options) {
        var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0, match;
        var add = function (line, js) {
            js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
            return add;
        };
        while (match = re.exec(html)) {
            add(html.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }
        add(html.substr(cursor, html.length - cursor));
        code += 'return r.join("");';
        return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
    }

})(jQuery);