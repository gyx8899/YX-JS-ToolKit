var lazyLoadIdArray = [];
$(document).ready(function ()
{
	// Init Lazy load Categories;
	lazyLoadCategory();
});
function lazyLoadCategory()
{
	initLazyLoadArray();

	// Add this scroll trigger when page loaded, the page height don't change;
	// (When there is no other dynamic page loading)
	$(window).scroll(lazyLoadScrollMonitor);
	$(window).trigger( "scroll" );
}
function lazyLoadScrollMonitor()
{
	lazyLoadIdArray.length && throttle(checkAndLoadCategory);
}
function initLazyLoadArray()
{
	var $leafCategory = $('.lazy-load');
	for (var i = 0, l = $leafCategory.length; i < l; i++)
	{
		lazyLoadIdArray[i] = $($leafCategory[i]).attr('id');
	}
}
function checkAndLoadCategory()
{
	var scrollTop = $(window).scrollTop(),
			windowHeight = $(window).height(), windowBottomToTop = scrollTop + windowHeight;
	for (var i = 0; i < lazyLoadIdArray.length; i++)
	{
		var top = $('#' + lazyLoadIdArray[i]).position().top;
		if (windowBottomToTop > top)
		{
			var loadId = lazyLoadIdArray.splice(i--, 1)[0];
			loadContent(loadId);
		}
		else
		{
			break;
		}
	}
}
function throttle(method, context)
{
	clearTimeout(method.tId);
	method.tId = setTimeout(function ()
	{
		method.call(context);
	}, 100);
}
function loadContent(id)
{
	setTimeout(function ()
	{
		$('#' + id).append('<p>1.Content!!!!</p>');
	}, 1000);
	setTimeout(function ()
	{
		$('#' + id).append('<p>2.Content!!!!</p>');
	}, 2000);
}