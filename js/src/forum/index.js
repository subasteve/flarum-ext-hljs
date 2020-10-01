import {extend} from 'flarum/extend';
import app from 'flarum/app';

import CommentPost from 'flarum/components/CommentPost';
import {hljsDefaults} from './helpers/hljsDefaults'

var flag = 1;

app.initializers.add('therealsujitk/flarum-ext-hljs', () => {
	extend(CommentPost.prototype, 'headerItems', function (items) {
		items.add('therealsujitk-hljs',
			m('null', {
				id: 'therealsujitk-hljs',
				config: () => {
					var hljsTheme = app.forum.attribute('therealsujitk-hljs.theme_name');

					if(hljsTheme === null || hljsTheme === "")
						hljsTheme = 'default';
					
					var hljs = setInterval(function() {
						if(flag) {
							if(typeof document.querySelectorAll("link[href*='cdnjs.cloudflare.com/ajax/libs/highlight.js/']")[0] != 'undefined') {
								document.querySelectorAll("link[href*='cdnjs.cloudflare.com/ajax/libs/highlight.js/']")[0].href = '//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.2.0/styles/' + hljsTheme + '.min.css';
								flag = 0;
								clearInterval(hljs);
							}
							else if(typeof document.querySelectorAll("link[href*='cdn.jsdelivr.net/gh/highlightjs/']")[0] != 'undefined') {
								document.querySelectorAll("link[href*='cdn.jsdelivr.net/gh/highlightjs/']")[0].href = '//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.2.0/build/styles/' + hljsTheme + '.min.css';
								flag = 0;
								clearInterval(hljs);
							}
						}
					}, 500);

					let baseUrl = app.forum.attribute('baseUrl');
					hljsDefaults(hljsTheme, baseUrl);
				}
			})
		)
	});
});
