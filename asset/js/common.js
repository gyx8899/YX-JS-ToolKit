/*
* Functions: Dynamic load files in page;
* */
function loadLinkCSS(linkArray)
{
	for (var i = 0, length = linkArray.length; i < length; i++)
	{
		loadCSS(linkArray[i]);
	}
}
function loadScritJS(scriptArray)
{
	for (var i = 0, length = scriptArray.length; i < length; i++)
	{
		loadScript(scriptArray[i]);
	}
}
function loadCSS(url, callback)
{
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
function getScriptURLWithFileName(jsFileName)
{
	var scripts = document.getElementsByTagName("script");

	for (var i = 0; i < scripts.length; i++)
	{
		var script = scripts.item(i);

		if (script.src && script.src.match(jsFileName))
		{
			return script.src;
		}
	}
}
/*
* Functions: Regular expression
* */
function regExpG(expStr)
{
	return new RegExp(expStr, "g");
}
