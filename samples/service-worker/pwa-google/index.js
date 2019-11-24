//
(function () {
	if ('serviceWorker' in navigator)
	{
		window.addEventListener('load', function (e) {
			navigator.serviceWorker.register('/sw.js').then(function (registration) {
				// Registration was successful
				console.log('ServiceWorker registration was successful with scope: ' + registration.scope);
			}).cache(function (err) {
				// Registration failed :(
				console.log('ServiceWorker registration failed: ' + err);
			});
		});
	}
})();