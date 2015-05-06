//(c) 2015 sleptor
//special for okisun

(function( $ ) {
	$.fn.SilaInterview = function(options) {

		var settings = $.extend( {
			css: 'silainterview.css',
			tpl: default_tpl,
			youtubeTpl: default_youtube_tpl,
			video: {
				height: 300,
				width: 350
			},
			questionTitle: 'Выберите вопрос'
		}, options);

		$("head").append("<link rel='stylesheet' href='"+settings.css+"' type='text/css' media='screen'>");

		var $cnt = $(this);

		$cnt.addClass('silainterview');

		settings.id = $cnt.attr('id');

		$cnt.html(templateEngine(settings.tpl, settings));

		$('.question', $cnt).on('click', function () {
			var id = youtubeUrlParser($(this).data('url'));
			if (id) {
				var code = templateEngine(settings.youtubeTpl, {id: id, params: settings.video});
				$('.video', $cnt).html(code);
			} else {
				alert('oops... bad youtube url :(')
			}
		});
	};

	var default_youtube_tpl =
		'<iframe width="<%this.params.width%>" height="<%this.params.height%>" src="https://www.youtube.com/embed/<%this.id%>?autoplay=1" frameborder="0" allowfullscreen></iframe>';

	var default_tpl =
		'<h1><%this.name%></h1>' +
		'<div class="descr"><%this.descr%></div>' +
		'<div class="video"><img src="<%this.photoUrl%>"></div>' +
		'<div class="questions">' +
			'<h2><%this.questionTitle%></h2>' +
			'<ul>' +
			'<%for(var index in this.questions) {%>' +
				'<li>' +
					'<label for="<%this.id%>_radio_<%index%>">' +
						'<input type="radio" name="<%this.id%>_radio" id="<%this.id%>_radio_<%index%>" value="<%index%>" class="question" data-url="<%this.questions[index].videoUrl%>"><%this.questions[index].text%>' +
					'</label>' +
				'</li>' +
			'<%}%>' +
			'</ul>' +
		'</div>';

	function youtubeUrlParser(url) {
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		var match = url.match(regExp);
		if (match && match[7].length == 11) {
			return match[7];
		} else {
			return null
		}
	}

	var templateEngine = function(html, options) {
		var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0, match;
		var add = function(line, js) {
			js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
				(code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
			return add;
		};
		while(match = re.exec(html)) {
			add(html.slice(cursor, match.index))(match[1], true);
			cursor = match.index + match[0].length;
		}
		add(html.substr(cursor, html.length - cursor));
		code += 'return r.join("");';
		return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
	}

})(jQuery);