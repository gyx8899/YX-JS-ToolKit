/**
 * Utils: v1.1.0-20181223
 *
 * Dependency: $(jQuery) when use anchorSmoothScroll
 */
import {hasClass} from './ClassName.js';

// Element
const getElements = (elements) => {
	let resultElement = [];
	if (elements === undefined || elements === null)
	{
		resultElement = [];
	}
	else if (elements.jquery)
	{
		resultElement = elements.length > 1 ? elements.get() : [elements[0]];
	}
	else if (elements instanceof window.NodeList || elements instanceof NodeList || elements instanceof HTMLCollection)
	{
		resultElement = Array.prototype.slice.call(elements);
	}
	else if (Array.isArray(elements))
	{
		resultElement = elements.filter(function (element) {
			return element.nodeType === 1 || element.jquery;
		});
	}
	else if (elements.nodeType === 1)
	{
		resultElement = [elements];
	}
	else if (typeof elements === 'string')
	{
		resultElement = document.querySelectorAll(elements);
	}
	return resultElement;
};

// Selector
const matches = (el, selector) => {
	return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
};

const findParent = (element, selector) => {
	while ((element = element.parentElement) && !matches(element, selector))
	{
	}
	return element;
};

const closest = (element, className) => {
	let closetElement = null;
	if (hasClass(element, className))
	{
		closetElement = element;
	}
	else
	{
		closetElement = findParent(element, '.' + className);
	}
	return closetElement;
};

// Url
const getQueryPramsString = (url) => {
	let query = '';
	if (!url)
	{
		query = window.location.search.substring(1);
	}
	else
	{
		let urlItems = url.split('?');
		query = urlItems.length ? urlItems[1] : '';
	}
	return query.split("&");
};

const getQueryParamValue = (param, url) => {
	let queryParams = getQueryPramsString(url);
	for (let i = 0; i < queryParams.length; i++)
	{
		let queryParam = queryParams[i].split("=");
		if (queryParam.length > 1 && queryParam[0] === param)
		{
			return decodeURIComponent(queryParam[1]);
		}
	}
	return false;
};

const removeUrlParam = (url, param) => {
	if (!!getQueryParamValue(param, url))
	{
		let filteredParams = [],
				targetSearch = '';
		getQueryPramsString()
				.forEach((query) => {
					if (query.split('=')[0] !== param)
					{
						filteredParams.push(query);
					}
				});
		if (filteredParams.length)
		{
			targetSearch = `?` + filteredParams.join('&');
		}
		return url.split('?')[0] + targetSearch;
	}
	return url;
};

const removedLocationUrlParam = (param) => {
	let locationUrl = window.location.href,
			removedParamUrl = removeUrlParam(locationUrl, param);
	window.history.pushState({}, document.title, removedParamUrl);
};

// Array
const findObject = (array, key, value) => {
	if (array.length === 0 || !key || !value)
	{
		return null;
	}
	for (let i = array.length - 1; i >= 0; i--)
	{
		if (array[i][key] === value)
		{
			return array[i];
		}
	}
	return null;
};

const findIndex = (array, item, key) => {
	let isObject = (typeof item === 'object' && !!key);
	if (isObject && !item[key])
	{
		return -1;
	}
	let comparedValue = isObject ? item[key] : item;
	let arrayItemValue = (ary, i, key) => {
		return ary[i];
	};
	if (isObject)
	{
		arrayItemValue = (ary, i, key) => {
			return ary[i][key];
		}
	}

	for (let i = array.length - 1; i >= 0; i--)
	{
		let arrayValue = arrayItemValue(array, i, key);
		if (arrayValue === comparedValue)
		{
			return i;
		}
	}
	return -1;
};

const spliceItem = (array, item, key) => {
	let index = this.findIndex(array, item, key);
	if (index === -1)
	{
		return array;
	}
	return array.splice(index, 1);
};

// Anchor
const anchorSmoothScroll = (selectorNot) => {
	let $anchors = $('a[href*="#"]').not('[href="#"]').not('[href="#0"]');
	if (typeof selectorNot === "string")
	{
		$anchors = $anchors.not(selectorNot);
	}
	else if (Array.isArray(selectorNot))
	{
		selectorNot.forEach(selector => {
			$anchors = $anchors.not(selector);
		});
	}
	$anchors.click(function (event) {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname)
		{
			let target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length)
			{
				event.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000);
			}
		}
	});
};

// load resources
const getFileNameFromURL = (url) => {
	let fileNameSplit = url.split('/').pop().split('#')[0].split('?')[0].split('.');
	return {
		name: fileNameSplit.join('.'),
		simpleBaseName: fileNameSplit[0],
		extensionName: fileNameSplit.length > 1 ? fileNameSplit[fileNameSplit.length - 1] : '',
		baseName: fileNameSplit.length > 1 ? fileNameSplit.splice(0, fileNameSplit.length - 1).join('.') : fileNameSplit[0],
	};
};

const getUrlTypeInfo = (url) => {
	// Current only support js and css resources;
	let fileExtensionName = getFileNameFromURL(url).extensionName;
	if (fileExtensionName)
	{
		let urlType = {
			'js': {
				name: 'js',
				tagName: 'script',
				urlAttrName: 'src',
				loadFn: 'getScript',
			},
			'css': {
				name: 'css',
				tagName: 'link',
				urlAttrName: 'href',
				loadFn: 'getStyle',
			}
		};
		return urlType[fileExtensionName];
	}
	return null;
};

const isResourceLoaded = (url) => {
	let type = getUrlTypeInfo(url),
			typeSelector = type['tagName'] || '[src]',
			allUrls = Array.prototype.slice.call(document.querySelectorAll(typeSelector))
					.map(function (scriptElement) {
						return scriptElement[type['urlAttrName']];
					});
	return allUrls.indexOf(url) !== -1;
};

const getScript = (url) => {
	return new Promise((resolve, reject) => {
		if (isResourceLoaded(url))
		{
			resolve(true);
		}
		let script = document.createElement('script'),
				prior = document.getElementsByTagName('script')[0],
				isIE9 = (document.documentMode === 9),
				intervalId,
				timeout = 10 * 1000,
				round = undefined;
		if (round)
		{
			url = addTimestamp(url, round);
		}

		script.onload = script.onreadystatechange = script.onerror = function (_, isAbort) {
			if (_ && _.type === 'error')
			{
				if (intervalId)
				{
					clearTimeout(intervalId);
					intervalId = null;
				}
				script.onload = script.onreadystatechange = script.onerror = null;
				script = undefined;
				reject(new Error(`Load error: ${url}`));
			}
			else if (isAbort || (script && (!script.readyState || /loaded|complete/.test(script.readyState))))
			{
				if (intervalId)
				{
					clearTimeout(intervalId);
					intervalId = null;
				}
				script.onload = script.onreadystatechange = null;
				if (!isIE9)
				{
					script.onerror = null;
				}

				// Remove the script
				if (isAbort)
				{
					if (script.parentNode)
					{
						script.parentNode.removeChild(script);
					}
				}

				if (!document.documentMode || document.documentMode >= 10)
				{
					script = undefined;
				}

				if (!isIE9)
				{
					!isAbort && resolve(true);
				}
				else
				{
					setTimeout(function () {
						!isAbort && resolve(true);
					}, 0);
				}
			}
		};

		script.src = url;
		prior.parentNode.insertBefore(script, prior);

		if (timeout)
		{
			intervalId = setTimeout(function () {
				// Known issue: script that is timeout, can't be really canceled
				script.onload(undefined, true);
				reject(new Error(`Time out: ${url}`));
			}, timeout);
		}
	});
};

const getStyle = (url) => {
	return new Promise(function (resolve, reject) {
		if (!url)
		{
			reject(new Error("url is null!"));
		}
		if (isResourceLoaded(url))
		{
			resolve(true);
		}

		let link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = url;
		link.onload = function () {
			resolve(true);
		};
		link.onerror = function (error) {
			reject(new Error(error));
		};

		document.getElementsByTagName('head')[0].appendChild(document.createComment(" Style " + getFileNameFromURL(url).name + " *** CSS "));
		document.getElementsByTagName('head')[0].appendChild(link);
	});
};

const getResources = (urls) => {
	let allUrls = Array.isArray(urls) ? urls : [urls],
			resourcesInfo = allUrls.map((url) => {
				let resourceInfo = getUrlTypeInfo(url);
				resourceInfo.url = url;
				return resourceInfo;
			}),
			resourcesPromise = resourcesInfo.map(urlInfo => {
				let loadFn = urlInfo.loadFn === 'getScript' ? getScript : getStyle;
				return loadFn(urlInfo.url).then((result) => {
					console.log(`Resource loaded: ${urlInfo.url}`);
					return result;
				});
			});
	return Promise.all(resourcesPromise);
};

export {
	// Element
	getElements,
	// Selector
	matches,
	findParent,
	closest,
	// Url
	getQueryPramsString,
	getQueryParamValue,
	removeUrlParam,
	removedLocationUrlParam,
	// Array
	findObject,
	findIndex,
	spliceItem,
	// Anchor
	anchorSmoothScroll,
	// Load Resources
	getFileNameFromURL,
	getUrlTypeInfo,
	isResourceLoaded,
	getScript,
	getStyle,
	getResources
}