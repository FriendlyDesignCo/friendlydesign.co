/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-arrowUp' : '&#x21;',
			'icon-arrowLeft' : '&#x22;',
			'icon-arrowRight' : '&#x23;',
			'icon-arrowDown' : '&#x24;',
			'icon-twitter' : '&#x25;',
			'icon-tumblr' : '&#x26;',
			'icon-linkedin' : '&#x27;',
			'icon-email' : '&#x28;',
			'icon-dribbble' : '&#x29;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};