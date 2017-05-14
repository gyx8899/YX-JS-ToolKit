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