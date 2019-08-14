let CACHE_NAME = 'V20180720-01',
		urlsToCache = [
				'./dist/assets/js/common.min.js'
		];

self.addEventListener('install', function (event) {
	event.waitUntil(
			caches.open(CACHE_NAME)
					.then(function (cache) {
						return cache.addAll(urlsToCache);
					})
	);
});

self.addEventListener('activate', function (event) {
	console.log('ServiceWorker activate! Ready to start serving content');

	event.waitUntil(
			caches.keys().then(function (cacheNames) {
				return Promise.all(
						cacheNames.map(function (cacheName) {
							if (urlsToCache.indexOf(cacheName) === -1) {
								return caches.delete(cacheName);
							}
						})
				);
			}).then(() => self.clients.claim())
	);
});

self.addEventListener('fetch', function (event) {
	event.respondWith(
			caches.match(event.request).then(function (response) {
				if (response) {
					return response;
				}

				var request = event.request.clone(); // 把原始请求拷过来

				//默认情况下，从不支持 CORS 的第三方网址中获取资源将会失败。
				// 您可以向请求中添加 no-CORS 选项来克服此问题，不过这可能会导致“不透明”的响应，这意味着您无法辨别响应是否成功。
				if (request.mode !== 'navigate' && request.url.indexOf(request.referrer) === -1) {
					request = new Request(request, {mode: 'no-cors'})
				}

				return fetch(request).then(function (httpRes) {
					//请求失败了则直接返回、对于post请求也直接返回，sw不能缓存post请求
					if (!httpRes || (httpRes.status !== 200 && httpRes.status !== 304 && httpRes.type !== 'opaque') || request.method === 'POST') {
						return httpRes;
					}

					var responseClone = httpRes.clone();
					caches.open(CACHE_NAME).then(function (cache) {
						cache.put(event.request, responseClone);
					});

					refresh(httpRes);

					return httpRes;
				});
			})
	);
});

// Sends a message to the clients.
function refresh(response) {
	return self.clients.matchAll().then(function (clients) {
		clients.forEach(function (client) {
			// Encode which resource has been updated. By including the
			// [ETag](https://en.wikipedia.org/wiki/HTTP_ETag) the client can
			// check if the content has changed.
			var message = {
				type: 'refresh',
				url: response.url,
				// Notice not all servers return the ETag header. If this is not
				// provided you should use other cache headers or rely on your own
				// means to check if the content has changed.
				eTag: response.headers.get('ETag')
			};
			// Tell the client about the update.
			client.postMessage(JSON.stringify(message));
		});
	});
}

self.addEventListener('push', function (event) {
	let title = 'Hei, you receive a message.',
			body = 'This is message body!',
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

self.addEventListener('notificationclick', function (event) {
	var messageId = event.notification.data;
	event.notification.close();

	if (event.notification.tag === 'reload-window') {
		self.clients.matchAll().then((clients) => {
			clients.forEach((client) => client.postMessage('reload-window'));
		});
	}
}, false);