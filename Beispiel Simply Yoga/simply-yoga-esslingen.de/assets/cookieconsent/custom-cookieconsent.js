/**
 * Source: https://gist.github.com/mmoollllee/34dbb60840f60db9e93e38d0de778371
 */

window.addEventListener("load", function () {

	jQuery("#consent-in, #consent-out").hide();

	if (document.cookie.indexOf('cookieconsent_status=allow') > -1) {
		jQuery("#consent-out").show();
		onConsent();
	} else if (document.cookie.indexOf('cookieconsent_status=deny') > -1) {
		jQuery("#consent-in").show();
	} else {
		window.cookieconsent.initialise({
			palette: {
				"popup": {
					"background": "#7F0624",
					"text": "#ffffff"
				},
				"button": {
					"background": "#ffffff",
					"text": "#000000"
				}
			},
			theme: "classic",
			type: "opt-in",
			content: {
				"message": "Diese Website verwendet Cookies, um sicherzustellen, dass Sie das beste Erlebnis auf unserer Website erhalten.",
				"deny": "Ablehnen",
				"allow": "Cookies akzeptieren",
				"link": "Mehr erfahren",
				"href": "https://simply-yoga-esslingen.de/datenschutz"
			},
			
			onStatusChange: function (status, chosenBefore) {
				var type = this.options.type;
				var didConsent = this.hasConsented();
				if (type == 'opt-in' && didConsent) {
					onConsent();
				}
			}
		});
	}

	jQuery("#consent-out").click(function (e) {
		e.preventDefault();
		consentOut();
	})
	jQuery("#consent-in").click(function (e) {
		e.preventDefault();
		consentIn();
	})
});

function consentOut() {
	deleteAllCookies();
	document.cookie = 'cookieconsent_status=deny; expires=Thu, 31 Dec 2199 23:59:59 UTC;path=/';
	if (!alert('Alle Cookies (die nicht technisch notwendig sind) wurden deaktiviert.')) {
		window.location.reload();
	}
}

function consentIn() {
	document.cookie = 'cookieconsent_status=allow; expires=Thu, 31 Dec 2199 23:59:59 UTC;path=/';
	if (!alert('Alle Cookies wurden aktiviert.')) {
		window.location.reload();
	}
}

function onConsent() {
	var gaProperty = 'UA-138971190-1';

	(function (i, s, o, g, r, a, m) {
		i['GoogleAnalyticsObject'] = r;
		i[r] = i[r] || function () {
			(i[r].q = i[r].q || []).push(arguments)
		}, i[r].l = 1 * new Date();
		a = s.createElement(o),
			m = s.getElementsByTagName(o)[0];
		a.async = 1;
		a.src = g;
		m.parentNode.insertBefore(a, m)
	})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

	ga('create', gaProperty, 'auto');
	ga('set', 'anonymizeIp', true);
	ga('send', 'pageview');
}

function deleteAllCookies() {
	var cookies = document.cookie.split("; ");
	for (var c = 0; c < cookies.length; c++) {
		var d = window.location.hostname.split(".");
		while (d.length > 0) {
			var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
			var p = location.pathname.split('/');
			document.cookie = cookieBase + '/';
			while (p.length > 0) {
				document.cookie = cookieBase + p.join('/');
				p.pop();
			};
			d.shift();
		}
	}
	window.localStorage.clear()
}