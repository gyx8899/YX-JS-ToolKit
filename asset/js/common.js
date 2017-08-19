/*
 * Functions: Operation html;
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

function replaceTemplateExpressionWithData(template, dataObject)
{
	var resultTemplate = template, dataKeys = Object.keys(dataObject), dataItem = null;
	for (var i = 0, length = dataKeys.length; i < length; i++)
	{
		dataItem = dataKeys[i];
		resultTemplate = resultTemplate.replace(regExpG("{{" + dataItem + "}}"), dataObject[dataItem] || '');
	}
	return resultTemplate;
}

/*
 * Functions: Dynamic load files in page;
 * */
function loadCSS(url, callback, context)
{
	if (!url)
		return;

	if (Array.isArray(url))
	{
		// Process the url and callback if they are array;
		parameterArrayToItem(arguments.callee, url, callback);
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
		document.getElementsByTagName('head')[0].appendChild(link);
	}
}

function loadScript(url, callback, context)
{
	if (!url)
		return;

	if (Array.isArray(url))
	{
		// Process the url and callback if they are array;
		parameterArrayToItem(arguments.callee, url, callback);
	}
	else
	{
		var script = document.createElement("script");
		script.type = "text/javascript";

		if (script.readyState)
		{  //IE
			script.onreadystatechange = function () {
				if (script.readyState == "loaded" ||
						script.readyState == "complete")
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
		document.body.appendChild(script);
	});
}

function getFileContent(url, callback, context)
{
	$.ajax({
		url: url,
		success: function (data) {
			callback && (context ? context[callback](data) : callback(data));
		}
	});
}

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

/*
* Functions: URL
* */
function getFileNameFromURL(url)
{
	return url.split('/').pop().split('#')[0].split('?')[0];
}

function checkResourceLoaded(url)
{
	var type = getUrlType(url),
			typeSelector = type['tagName'] || '[src]',
			allUrls = Array.prototype.slice.call(document.querySelectorAll(typeSelector))
					.map(function (scriptElement) {
						return scriptElement[type['urlAttrName']];
					});
	return allUrls.indexOf(url) !== -1;
}

function getUrlType(url)
{
	// Current only support js and css resources;
	var types = {
				'js': {name: 'js', tagName: 'script', urlAttrName: 'src'},
				'css': {name: 'css', tagName: 'link', urlAttrName: 'href'}
			},
			resourceName = getFileNameFromURL(url),
			resourceNameSplitArray = resourceName.split('.');
	if (resourceNameSplitArray.length === 1)
	{
		return null;
	}
	else
	{
		return types[resourceNameSplitArray[resourceNameSplitArray.length - 1]];
	}
}

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
* */
function consoleLog(fnArguments)
{
	if (window.console && window.debug !== false)
	{
		var localTime = (new Date()).toTimeString(),
				fnName = fnArguments.callee.name,
				fnArgumentsArray = Array.prototype.slice.call(fnArguments, 0),
				fnArgumentsString = getArrayString(fnArgumentsArray),
				argumentsArray = Array.prototype.slice.call(arguments, 0),
				surplusArgumentString = argumentsArray.length > 1 && argumentsArray.shift() && getArrayString(argumentsArray);
		window.console.log(localTime + ' : ' + fnName + '(' + fnArgumentsString + ') ' + surplusArgumentString);
	}
}

function getArrayString(array)
{
	return array.map(function (arrayItem) {
		if (typeof arrayItem === 'object')
		{
			arrayItem = JSON.stringify(arrayItem);
		}
		else if (Array.isArray(arrayItem))
		{
			arrayItem = '[' + arguments.callee(arrayItem) + ']';
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
				if (typeof obj[key] === 'object')
					out[key] = arguments.callee(out[key], obj[key]);
				else
					out[key] = obj[key];
			}
		}
	}
	return out;
}