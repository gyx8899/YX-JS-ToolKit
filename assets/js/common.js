//<editor-fold desc="Functions: Process">
/*
* Functions: Process
* */
function uniqueArray(sourceArray)
{
	var resultArray = [], hash = {};
	for (var i = 0, elem, l = sourceArray.length; i < l && (elem = sourceArray[i]) !== null; i++)
	{
		if (!hash[elem])
		{
			resultArray.push(elem);
			hash[elem] = true;
		}
	}
	return resultArray;
}
//</editor-fold>

//<editor-fold desc="Functions: Operation html">
/*
 * Functions: Operation html
 * */
function escapeHTML(text)
{
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};

	return text.replace(/[&<>"']/g, function (m) {
		return map[m];
	});
}

function initTemplate(template, data, functionData)
{
	var result = template;
	for (var key in data)
	{
		if (data.hasOwnProperty(key))
		{
			var dataValue = data[key];
			if (typeof data[key] === 'function')
			{
				dataValue = data[key](functionData);
			}
			result = result.replace(new RegExp('{{' + key + '}}', "g"), dataValue);
		}
	}
	return result;
}
//</editor-fold>

//<editor-fold desc="Functions: Load resource">
/*
 * Functions: Load resource
 * */
function loadResource(url, callback)
{
	if (!checkResourceLoaded(url))
	{
		window[getUrlTypeInfo(url).loadFn](url, callback);
	}
}

function loadResources(urls, callback)
{
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
}

function loadUrls(urls, callback)
{
	var unLoadedResourcesInfo = urls.map(function (resource) {
				var resourceInfo = getUrlTypeInfo(resource);
				resourceInfo.url = resource;
				return resourceInfo;
			});
	// If support Promise, use Promise
	if (typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1)
	{
		var resourcePromise = unLoadedResourcesInfo.map(function (resourceInfo) {
			return window[resourceInfo.loadFnPromise](resourceInfo.url);
		});
		Promise.all(resourcePromise).then(function () {
			callback && callback();
		}).catch(function (error) {
			console.log("Error: in load resources! " + error);
		});
	}
	else
	{
		unLoadedResourcesInfo.forEach(function (resourceInfo) {
			window[resourceInfo.loadFn](resourceInfo.url);
		});
		callback && callback();
	}
}

function loadCSS(url, callback, context)
{
	if (!url)
		return;

	if (Array.isArray(url))
	{
		// Process the url and callback if they are array;
		parameterArrayToItem(function (urlParam, callbackParam) {
			loadCSS(urlParam, callbackParam);
		}, url, callback);
	}
	else
	{
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

		document.getElementsByTagName('head')[0].appendChild(document.createComment(" Style " + getFileNameFromURL(url) + " *** CSS "));
		document.getElementsByTagName('head')[0].appendChild(link);
	}
}

function loadScript(url, callback, context, isAsync)
{
	if (!url)
		return;

	if (Array.isArray(url))
	{
		// Process the url and callback if they are array;
		parameterArrayToItem(function (urlParam, callbackParam) {
			loadScript(urlParam, callbackParam, context, isAsync);
		}, url, callback);
	}
	else
	{
		var script = document.createElement("script");
		script.type = "text/javascript";
		isAsync && script.setAttribute('async', '');

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

		document.body.appendChild(document.createComment(" Script " + getFileNameFromURL(url) + " *** JS "));
		document.body.appendChild(script);
	}
}

// loadCSS with Promise
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

		document.getElementsByTagName('head')[0].appendChild(document.createComment(" Style " + getFileNameFromURL(url) + " *** CSS "));
		document.getElementsByTagName('head')[0].appendChild(link);
	});
}

// loadScript with Promise
function loadScriptWithPromise(url)
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

		document.body.appendChild(document.createComment(" Script " + getFileNameFromURL(url) + " *** JS "));
		document.body.appendChild(script);
	});
}

// Dependency: jQuery ajax
function getFileContent(url, callback, context)
{
	$.ajax({
		url: url,
		success: function (data) {
			callback && (context ? context[callback](data) : callback(data));
		}
	});
}

function getFileContentJS(url, callback, context)
{
	var request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function () {
		if (request.status >= 200 && request.status < 400)
		{
			// Success
			callback && (context ? context[callback](request.responseText) : callback(request.responseText));
		}
		else
		{
			// We reached our target server, but it returned an error
		}
	};

	request.onerror = function () {
		// There was a connection error of some sort
	};

	request.send();
}
//</editor-fold>

//<editor-fold desc="Functions: Regular expression">
/*
 * Functions: Regular expression
 * */
function regExpG(expStr)
{
	return new RegExp(expStr, "g");
}

function isURL(url)
{
	var expression = /(((http|ftp|https):\/\/)?([\w\-_]+(\.(?!(\d)+)[\w\-_]+))+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?)|(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)/g;
	return (new RegExp(expression)).test(url);
}
//</editor-fold>

//<editor-fold desc="Functions: Process URL">
/*
* Functions: Process URL
* */

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
		var urlType = {
			'js': {
				name: 'js',
				tagName: 'script',
				urlAttrName: 'src',
				loadFn: 'loadScript',
				loadFnPromise: 'loadScriptWithPromise'
			},
			'css': {
				name: 'css',
				tagName: 'link',
				urlAttrName: 'href',
				loadFn: 'loadCSS',
				loadFnPromise: 'loadCSSWithPromise'
			}
		};
		return urlType[resourceNameSplitArray.pop()];
	}
	return null;
}

function getCurrentScriptPath(scriptName)
{
	var scripts = document.getElementsByTagName("script");

	for (var i = 0; i < scripts.length; i++)
	{
		var script = scripts.item(i);

		if (script.src && script.src.match(scriptName))
		{
			return script.src;
		}
	}
	return null;
}

function getQueryParamValue(param)
{
	var query = window.location.search.substring(1);
	var queryParams = query.split("&");
	for (var i = 0; i < queryParams.length; i++)
	{
		var queryParam = queryParams[i].split("=");
		if (queryParam[0] === param)
		{
			return queryParam[1];
		}
	}
	return false;
}

function getRootPath()
{
	var href = window.document.location.href,
			pathName = window.document.location.pathname,
			localhostPath = href.substring(0, href.indexOf(pathName)),
			projectName = pathName.substring(0, pathName.substr(1).lastIndexOf('/') + 1);
	return (localhostPath + projectName);
}
//</editor-fold>

/*
 * Functions: Tools for processing function who has parameter array;
 * */
function parameterArrayToItem(fn, param1, param2)
{
	var param2IsArray = Array.isArray(param2),
			param2ArrayLength = param2IsArray && param2.length || 0;
	for (var i = 0, length = param1.length; i < length; i++)
	{
		var param2Item = (param2IsArray && i < param2ArrayLength) ? param2[i] : null;
		fn && fn(param1[i], param2Item);
	}
}

/*
* Functions: Throttle, specially in onResize event function;
* */
function throttle(method, context)
{
	if (method.tId)
	{
		clearTimeout(method.tId);
	}
	method.tId = setTimeout(function () {
		method.call(context);
	}, 100);
}

/*
* Functions: Debug
* Demo:
* function doSomething(param1, param2)
* {
	consoleLog(arguments, 'anything...');
* }
* */
function consoleLog(fnArguments)
{
	var typeStyle = [
			'font-size: 14px; color: #8665D5',
			'font-size: 14px; color: #406AD5',
			'font-size: 14px; color: #E9AC32',
			'font-size: 14px; color: #3AC1D9',
			'font-size: 14px; color: #FF7979',
			'font-size: 14px; color: #39D084',
			'font-size: 14px; color: #FF8E66',
			'font-size: 14px; color: #44B1E6',
			'font-size: 14px; color: #9e5648',
			'font-size: 14px; color: #406ad5',
			'font-size: 14px; color: #purple',
			'font-size: 14px; color: #red',
			'font-size: 14px; color: #teal',
			'font-size: 14px; color: #yellow'
			];
	if (!window.consoleLogTypes)
	{
		window.consoleLogTypes = {};
	}
	if (window.console && window.debug !== false)
	{
		var fnName = fnArguments.callee ? fnArguments.callee.name : '',
				fnArgumentsArray = Array.prototype.slice.call(fnArguments, 0),
				fnArgumentsString = getArrayString(fnArgumentsArray),
				argumentsArray = Array.prototype.slice.call(arguments, 0),
				surplusArgumentString = argumentsArray.length > 1 && argumentsArray.shift() && getArrayString(argumentsArray);
		if (!window.consoleLogTypes[fnName])
		{
			window.consoleLogTypes[fnName] = {
				typeCount: 0,
				typeInfo: {}
			};
		}
		if (!window.consoleLogTypes[fnName].typeInfo[argumentsArray[0]])
		{
			window.consoleLogTypes[fnName].typeInfo[argumentsArray[0]] = typeStyle[window.consoleLogTypes[fnName].typeCount];
			window.consoleLogTypes[fnName].typeCount++;
		}
		if (window.consoleLogTypes.lastType !== fnName)
		{
			window.console.groupEnd();
			window.console.group(fnName);
			window.consoleLogTypes.lastType = fnName;
		}
		window.console.log('%c%s', window.consoleLogTypes[fnName].typeInfo[argumentsArray[0]] , fnName + ': (' + fnArgumentsString + ') ' + surplusArgumentString);
	}
}

function getArrayString(array)
{
	return array.map(function (arrayItem) {
		if (Array.isArray(arrayItem))
		{
			arrayItem = '[' + arguments.callee(arrayItem) + ']';
		}
		else if (typeof arrayItem === 'object')
		{
			arrayItem = JSON.stringify(arrayItem);
		}
		return arrayItem.toString();
	}).join(',');
}

// Functions: Copy - deep copy and shadow copy with out jQuery
function deepExtend(out) // arguments: (source, source1, source2, ...)
{
	out = out || {};

	for (var i = 1; i < arguments.length; i++)
	{
		var obj = arguments[i];

		if (!obj)
			continue;

		for (var key in obj)
		{
			if (obj.hasOwnProperty(key))
			{
				if (typeof obj[key] === 'object'
						&& obj[key] !== null
						&& !Array.isArray(obj[key])
						&& !(obj[key] instanceof Date)
						&& !(obj[key] === 'function'))
				{
					out[key] = arguments.callee(out[key], obj[key]);
				}
				else
					out[key] = obj[key];
			}
		}
	}
	return out;
}

// Functions: Dynamic set callback function in window
function setCallback(typeName)
{
	var typeCallback = typeName + "Callback";
	if (!window[typeCallback])
	{
		window[typeCallback] = function (data)
		{
			window[typeName] = data;
		};
		return typeCallback;
	}
	return null;
}
function getCallbackName(typeName)
{
	return typeName + "Callback";
}

//<editor-fold desc="Functions: Elements operation">
/*
* Functions: Elements operation
*
* */
function getElements(elements)
{
	var resultElement = [];
	if (elements.jquery)
	{
		resultElement = elements.length > 1 ? elements.get() : [elements[0]];
	}
	else if (elements instanceof window.NodeList || elements instanceof NodeList || elements instanceof HTMLCollection)
	{
		resultElement = Array.prototype.slice.call(elements);
	}
	else if (Array.isArray(elements))
	{
		resultElement = elements;
	}
	else if (elements.nodeType)
	{
		resultElement = [elements];
	}
	return resultElement;
}

function getSelectorsElements(selectorString)
{
	if (!selectorString || (selectorString && selectorString.trim() === ''))
	{
		return [document];
	}
	var selectorsElements = [],
			selectorsArray = selectorString.split(',').map(function (selectorStringItem) {
				return selectorStringItem.trim();
			});
	selectorsArray = uniqueArray(selectorsArray);
	for (var i = 0, l = selectorsArray.length; i < l; i++)
	{
		if (selectorsArray[i] === 'document')
		{
			selectorsElements.push(document);
		}
		else
		{
			var scopeNodeList = convertNodeListToArray(document.querySelectorAll(selectorsArray[i]));
			selectorsElements = selectorsElements.concat(scopeNodeList);
		}
	}
	return selectorsElements;
}

function findParent(element, selector)
{
	while ((element = element.parentElement) && !matches(element, selector)) {}
	return element;
}

function matches(el, selector)
{
	return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
}

/***
 * Get element's closet class parent element
 * @param {element} element
 * @param {string} className
 * @returns {element}
 */
function closet(element, className)
{
	var closetElement = null;
	if (hasClass(element, className))
	{
		closetElement = element;
	}
	else
	{
		closetElement = findParent(element, '.' + className);
	}
	return closetElement;
}

/***
 * Check element has parentElement
 * @param el
 * @param parentElement
 * @returns {boolean}
 */
function hasCloset(el, parentElement)
{
	if (el === parentElement)
	{
		return true;
	}
	if (parentElement === undefined)
	{
		return false;
	}

	var parents = [], p = el.parentNode;
	while (p !== parentElement && p.parentNode)
	{
		var o = p;
		parents.push(o);
		p = o.parentNode;
	}
	return p === parentElement;
}

/***
 * Convert JS selector elements to array
 * @param {node} nodeList
 * @returns {Array}
 */
function convertNodeListToArray(nodeList)
{
	var resultArray = [];
	for (var i = 0, l = nodeList.length; i < l; i++)
	{
		resultArray[i] = nodeList[i];
	}
	return resultArray;
}

/***
 *
 * Copy html element to clipboard
 * @param {element} html element
 */
function copyElementToClipboard(element)
{
	var range = document.createRange();
	range.selectNode(element);
	window.getSelection().addRange(range);

	document.execCommand('copy');
	window.getSelection().removeAllRanges();
}

/**
 * Insert style to head
 * @param {cssText} style string
 */
function insertStyleToHead(cssText)
{
	var head = document.head || document.getElementsByTagName('head')[0],
			style = document.createElement('style');

	style.type = 'text/css';
	if (style.styleSheet)
	{
		style.styleSheet.cssText = cssText;
	}
	else
	{
		style.appendChild(document.createTextNode(cssText));
	}

	head.appendChild(style);
}

/**
 * Create one html tag element with tagInfo
 * @param {tagName} html tag name
 * @param {tagInfo} tag's attributes and style object, such as { attr: {}, style: {} }
 * @return {element} html tag element.
 */
function createTagElement(tagName, tagInfo)
{
	var tagElement = document.createElement(tagName);

	Object.keys(tagInfo.attr).forEach(function (key) {
		tagElement.setAttribute(key, tagInfo.attr[key]);
	});

	Object.keys(tagInfo.style).forEach(function (key) {
		tagElement.style[key] = tagInfo.style[key];
	});

	return tagElement;
}
//</editor-fold>

//<editor-fold desc="Tools: Page operation">
/*
* Tools: Page operation
* */

function scrollListToIndex(listFolder, index, toTopIndex, duration)
{
	if (index === 0)
	{
		scrollTo(listFolder, 0, duration);
	}
	else
	{
		var listItems = listFolder.childNodes,
				scrollOffset = 0,
				contentHeight = 0,
				scrollToCenter = 0;
		duration = (duration === undefined ? 500 : duration);
		for (var i = 0, l = listItems.length; i < l; i++)
		{
			var listItemHeight = listItems[i].offsetHeight;
			if (i < index)
			{
				scrollOffset += listItemHeight;
				if (i > toTopIndex - 1)
				{
					scrollToCenter += listItems[i - toTopIndex].offsetHeight;
				}
			}
			contentHeight += listItemHeight;
		}
		scrollOffset = scrollToCenter;
		if (scrollOffset + listFolder.offsetHeight > contentHeight)
		{
			scrollOffset = contentHeight - listFolder.offsetHeight;
		}
		scrollTo(listFolder, scrollOffset, duration);
	}
}

function scrollTo(element, to, duration)
{
	if (duration <= 0) return;
	var difference = to - element.scrollTop;
	var perTick = difference / duration * 10;

	setTimeout(function () {
		element.scrollTop = element.scrollTop + perTick;
		if (element.scrollTop === to) return;
		scrollTo(element, to, duration - 10);
	}, 10);
}

function addChildElement(parentElement, childElement, position)
{
	switch (position && position.toLowerCase())
	{
		case 'prepend':
			parentElement.insertBefore(childElement, parentElement.firstChild);
			break;
		case 'insertbefore':
			parentElement.insertAdjacentHTML('beforebegin', childElement.outerHTML);
			break;
		case 'insertafter':
			parentElement.insertAdjacentHTML('afterend', childElement.outerHTML);
			break;
		default: //'append'
			parentElement.appendChild(childElement);
	}
}
//</editor-fold>

//<editor-fold desc="Functions: Classes without jQuery">
// Functions: Classes without jQuery
function hasClass(element, className)
{
	if (element.classList)
		return element.classList.contains(className);
	else
		return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
}

function addClass(element, className)
{
	if (element.classList)
		element.classList.add(className);
	else
		element.className += ' ' + className;
}

function removeClass(element, className)
{
	if (element.classList)
		element.classList.remove(className);
	else
		element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function toggleClass(element, className)
{
	if (hasClass(element, className))
	{
		removeClass(element, className);
	}
	else
	{
		addClass(element, className);
	}
}
//</editor-fold>

//<editor-fold desc="Functions: Event operation">
/*
* Functions: Event operation
* */

function delegate(element, eventName, selector, handler)
{
	var possibleTargets = element.querySelectorAll(selector);
	element.addEventListener(eventName, listenerHandler);

	function listenerHandler(event)
	{
		var target = event.target;

		for (var i = 0, l = possibleTargets.length; i < l; i++)
		{
			var el = target,
					p = possibleTargets[i];

			while (el && el !== element)
			{
				if (el === p)
				{
					return handler.call(p, event);
				}
				el = el.parentNode;
			}
		}
	}
}
//</editor-fold>

// Custom for click which can ignore drag trigger click
function delegateClickIgnoreDrag(element, selector, handler)
{
	var possibleTargets = element.querySelectorAll(selector);
	element.addEventListener('mousedown', listenerHandler);

	function listenerHandler(event)
	{
		var target = event.target;

		for (var i = 0, l = possibleTargets.length; i < l; i++)
		{
			var el = target,
					p = possibleTargets[i];

			while (el && el !== element)
			{
				if (el === p)
				{
					return mouseDownHandler.call(p, event);
				}
				el = el.parentNode;
			}
		}
	}

	function mouseDownHandler(event)
	{
		event.target.addEventListener('mouseup', mouseUpMoveHandler);
		event.target.addEventListener('mousemove', mouseUpMoveHandler);
	}

	function mouseUpMoveHandler(event)
	{
		if (event.type === 'mouseup' && event.which <= 1) //only for left key
		{
			handler(event);
		}
		event.target.removeEventListener('mouseup', mouseUpMoveHandler);
		event.target.removeEventListener('mousemove', mouseUpMoveHandler);
	}
}

function bindClickIgnoreDrag(elements, callback, isBind)
{
	var eventListenerName = isBind !== false ? 'on' : 'off',
			mouseDownX = 0,
			mouseDownY = 0;

	[].forEach.call(elements, function (element) {
		extendOnOff(element)[eventListenerName]('mousedown', mouseDownHandler);
	});

	function mouseDownHandler(event)
	{
		mouseDownX = event.pageX;
		mouseDownY = event.pageY;
		event.target.addEventListener('mouseup', mouseUpMoveHandler);
		event.target.addEventListener('mousemove', mouseUpMoveHandler);
	}

	function mouseUpMoveHandler(event)
	{
		if (event.type === 'mouseup' && event.which <= 1) //only for left key
		{
			callback(event);
		}
		else if (event.type === 'mousemove' && event.pageX === mouseDownX && event.pageY === mouseDownY)
		{
			return;
		}
		event.target.removeEventListener('mouseup', mouseUpMoveHandler);
		event.target.removeEventListener('mousemove', mouseUpMoveHandler);
	}
}

function triggerEvent(element, eventName, data)
{
	var event = null;
	if (window.CustomEvent)
	{
		event = new CustomEvent(eventName, {detail: data});
	}
	else
	{
		event = document.createEvent('CustomEvent');
		event.initCustomEvent(eventName, true, true, data);
	}

	element.dispatchEvent(event);
}

//Extend on/off methods
function extendOnOff(el)
{
	if (el.length === 0)
		return null;
	var events = {
		on: function (event, callback, opts) {
			if (!this.namespaces) // save the namespaces on the DOM element itself
				this.namespaces = {};

			this.namespaces[event] = callback;
			var options = opts || false;

			this.addEventListener(event.split('.')[0], callback, options);
			return this;
		},
		off: function (event) {
			this.removeEventListener(event.split('.')[0], this.namespaces[event]);
			delete this.namespaces[event];
			return this;
		}
	};

	// Extend the DOM with these above custom methods
	if (!el.isExtendOnOff)
	{
		el.on = Element.prototype.on = events.on;
		el.off = Element.prototype.off = events.off;
		el.isExtendOnOff = true;
	}
	return el;
}

function mouseTouchTrack(element, infoCallback)
{
	var touchStartBeginTime = 0,
			lastEventType = '';

	element.onclick = trackEvent;
	element.ontouchstart = trackEvent;
	element.ontouchend = trackEvent;
	element.ontouchmove = trackEvent;
	element.onmousedown = trackEvent;
	element.onmouseenter = trackEvent;
	element.onmouseleave = trackEvent;
	element.onmousemove = trackEvent;
	element.onmouseout = trackEvent;
	element.onmouseover = trackEvent;
	element.onmouseup = trackEvent;

	function trackEvent(event)
	{
		if (event.type === "touchstart")
		{
			touchStartBeginTime = Date.now();
		}
		if (event.type !== lastEventType)
		{
			infoCallback = infoCallback ? infoCallback : console.log;
			infoCallback(arguments, event.type, Date.now() - touchStartBeginTime);

			lastEventType = event.type;
		}
	}
}

//<editor-fold desc="Plugins: Common">
/*
* Plugins: Dictionary
* */
(function () {
	"use strict";

	function Dictionary()
	{
		this._size = 0;
		this.datastore = Object.create(null);
	}

	Dictionary.prototype.isEmpty = function () {
		return this._size === 0;
	};

	Dictionary.prototype.size = function () {
		return this._size;
	};

	Dictionary.prototype.clear = function () {
		for (var key in this.datastore)
		{
			delete this.datastore[key];
		}
		this._size = 0;
	};

	Dictionary.prototype.add = function (key, value) {
		this.datastore[key] = value;
		this._size++;
	};

	Dictionary.prototype.find = function (key) {
		return this.datastore[key];
	};

	Dictionary.prototype.count = function () {
		var n = 0;
		for (var key in this.datastore)
		{
			n++;
		}
		return n;
	};

	Dictionary.prototype.remove = function (key) {
		delete this.datastore[key];
		this._size--;
	};

	Dictionary.prototype.showAll = function () {
		for (var key in this.datastore)
		{
			console.log(key + "->" + this.datastore[key]);
		}
	};
})();
//</editor-fold>