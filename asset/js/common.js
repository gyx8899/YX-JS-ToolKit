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

	return text.replace(/[&<>"']/g, function (m)
	{
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
function loadCSS(url, callback)
{
	if (!url)
		return;

	// Process the url and callback if they are array;
	parameterArrayToItem("loadCSS", url, callback);

	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = url;
	link.onload = function ()
	{
		callback && callback();
	};
	link.onerror = function ()
	{
		console.log("Error load css:" + url);
	};
	document.getElementsByTagName('head')[0].appendChild(link);
}
function loadScript(url, callback)
{
	if (!url)
		return;

	// Process the url and callback if they are array;
	parameterArrayToItem("loadScript", url, callback);

	var script = document.createElement("script");
	script.type = "text/javascript";

	if (script.readyState)
	{  //IE
		script.onreadystatechange = function ()
		{
			if (script.readyState == "loaded" ||
					script.readyState == "complete")
			{
				script.onreadystatechange = null;
				callback && callback();
			}
		};
	}
	else
	{  //Others
		script.onload = function ()
		{
			callback && callback();
		};
	}

	script.src = url;
	document.body.appendChild(script);
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
* Functions: Tools for processing function;
* */
function parameterArrayToItem(fn, param1, param2)
{
	if (Array.isArray(param1))
	{
		var param2IsArray = Array.isArray(param2),
				param2ArrayLength = param2IsArray && param2.length || 0;
		for (var i = 0, length = param1.length; i < length; i++)
		{
			var param2Item = (param2IsArray && i < param2ArrayLength) ? param2[i] : null;
			fn(param1[i], param2Item);
		}
	}
}