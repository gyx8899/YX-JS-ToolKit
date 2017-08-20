/**
 * Javascript plugin: loadResources V1.3
 * Support list:
 * 1. css file;
 * 2. js file;
 *
 * Params:
 * 1. urls: single url string or url string array;
 * 2. callback: execute when resource success;
 *
 * No support:
 * 1. Not in IE when set callback and url string array;
 *
 * */
(function () {
	this.LoadResources = function (urls, callback) {
		if (urls !== null && urls !== '')
		{
			if (Array.isArray(urls))
			{
				urls = urls.filter(function (url) {
					return (String(url) === url && url !== '');
				});
				if (urls.length === 0)
				{
					callback && callback();
				}
				else if (urls.length === 1)
				{
					loadResource(urls[0], callback);
				}
				else
				{
					if (callback)
					{
						loadUrls(urls, callback);
					}
					else
					{
						var that = this;
						urls.map(function (url) {
							loadResource(url);
						})
					}
				}
			}
			else if (String(urls) === urls)
			{
				loadResource(urls, callback);
			}
		}
		else
		{
			callback && callback();
		}
	};

	LoadResources.DEFAULTS = {
		'js': {
			name: 'js',
			tagName: 'script',
			urlAttrName: 'src',
			loadFnName: 'loadJS',
			loadFnPromiseName: 'loadJStWithPromise'
		},
		'css': {
			name: 'css',
			tagName: 'link',
			urlAttrName: 'href',
			loadFnName: 'loadCSS',
			loadFnPromiseName: 'loadCSSWithPromise'
		}
	};

	// Tools: functions
	function loadResource(url)
	{
		if (!checkResourceLoaded(url))
		{
			eval(getUrlTypeInfo(url).loadFnName)(url);
		}
	}

	function loadUrls(urls, callback)
	{
		var unLoadedResourcesInfo = urls.map(function (resource) {
					var type = getUrlTypeInfo(resource),
							resourceInfo = JSON.parse(JSON.stringify(LoadResources.DEFAULTS[type.name]));
					resourceInfo.url = resource;
					return resourceInfo;
				}),
				resourcePromise = unLoadedResourcesInfo.map(function (resourceInfo) {
					return eval(resourceInfo.loadFnPromiseName)(resourceInfo.url);
				});
		Promise.all(resourcePromise).then(function () {
			callback && callback();
		}).catch(function (error) {
			console.log("Error: in load resources! " + error);
		});
	}

	function loadCSS(url, callback)
	{
		if (!url)
			return;

		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = url;
		link.onload = function () {
			callback && (context ? context[callback]() : callback());
		};
		link.onerror = function () {
			console.log("Error load css:" + url);
		};
		document.getElementsByTagName('head')[0].appendChild(link);
	}

	function loadJS(url, callback)
	{
		var script = document.createElement("script");
		script.type = "text/javascript";

		if (script.readyState)
		{  //IE
			script.onreadystatechange = function () {
				if (script.readyState === "loaded" || script.readyState === "complete")
				{
					script.onreadystatechange = null;
					callback && (context ? context[callback]() : callback());
				}
			};
		}
		else
		{  //Others
			script.onload = function () {
				callback && (context ? context[callback]() : callback());
			};
		}

		script.src = url;
		document.body.appendChild(script);
	}

	function loadCSSWithPromise(url)
	{
		return new Promise(function (resolve, reject) {
			if (!url)
			{
				reject(new Error("url is null!"));
			}

			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = url;
			link.onload = function () {
				resolve();
			};
			link.onerror = function (error) {
				reject(new Error(error));
			};
			document.getElementsByTagName('head')[0].appendChild(link);
		});
	}

	function loadJStWithPromise(url)
	{
		return new Promise(function (resolve, reject) {
			if (!url)
			{
				reject(new Error("url is null!"));
			}

			var script = document.createElement("script");
			script.type = "text/javascript";

			if (script.readyState)
			{  //IE
				script.onreadystatechange = function () {
					if (script.readyState === "loaded" || script.readyState === "complete")
					{
						script.onreadystatechange = null;
						resolve();
					}
				};
			}
			else
			{  //Others
				script.onload = function () {
					resolve();
				};
			}

			script.src = url;
			document.body.appendChild(script);
		});
	}

	function getFileNameFromURL(url)
	{
		return url.split('/').pop().split('#')[0].split('?')[0];
	}

	function checkResourceLoaded(url)
	{
		var type = getUrlTypeInfo(url),
				typeSelector = type['tagName'] || '[src]',
				allUrls = Array.prototype.slice.call(document.querySelectorAll(typeSelector))
						.map(function (scriptElement) {
							return scriptElement[type['urlAttrName']];
						});
		return allUrls.indexOf(url) !== -1;
	}

	function getUrlTypeInfo(url)
	{
		// Current only support js and css resources;
		var resourceName = getFileNameFromURL(url),
				resourceNameSplitArray = resourceName.split('.');
		if (resourceNameSplitArray.length > 1)
		{
			return LoadResources.DEFAULTS[resourceNameSplitArray[resourceNameSplitArray.length - 1]];
		}
		return null;
	}
})();