let CACHE_NAME = 'YX-JS-ToolKit-180407',
		urlsToCache_static = [
			'/',
			'./assets/img/apple-touch-icon.png',
			'./assets/img/favicon.png'
		],
		urlsToCache_data = [
			'./assets/js/common.min.js'
		],
		cacheWhiteList = [
			'urlsToCache_static',
			'urlsToCache_data'
		];

self.addEventListener('install', function (event) {
	console.log('ServiceWorker installed!');

	// Preform install steps
	event.waitUntil(
			caches.open(CACHE_NAME)
					.then(cache => cache.addAll(urlsToCache_static))
					.then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', function (event) {
	console.log('ServiceWorker activate! Ready to start serving content');

	event.waitUntil(
			caches.keys().then(function (cacheNames) {
				return Promise.all(
						cacheNames.map(function (cacheName) {
							if (cacheWhiteList.indexOf(cacheName) === -1)
							{
								return caches.delete(cacheName);
							}
						})
				);
			}).then(() => self.clients.claim())
	);
});

self.addEventListener('fetch', function (event) {
	console.log('ServiceWorker fetch resources: ');

	event.respondWith(
			caches.match(event.request)
					.then(response => {
						// Cache hit - return response
						if (response)
						{
							return response;
						}
						let fetchRequest = event.request.clone();

						return fetch(fetchRequest).then(
								function (response) {
									// Check if we received a valid response
									if (!response || response.status !== 200 || response.type !== 'basic')
									{
										return response;
									}

									let responseToCache = response.clone();

									caches.open(CACHE_NAME)
											.then(cache => {
														cache.put(event.request, responseToCache)
																.then(() => {
																			return responseToCache;
																		}
																);
													}
											);

									return response;
								}
						);
					})
	);
});

self.addEventListener('push', function (event) {
	let title = 'Receive a message.',
			body = 'message body!',
			icon = '/assets/img/favicon.png',
			tag = '';
	event.waitUntil(
			self.registration.showNotification(title, {
				body: body,
				icon: icon,
				tag: tag
			})
	);
});