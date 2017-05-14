var refreshiScroll = null;
$(document).ready(function ()
{
	initiScrollList();
});

function initiScrollList()
{
	var options = {
		pullDownRefresh: pullDownRefresh,
		pullUpRefresh: pullUpRefresh
	};
	refreshiScroll = new pullToRefreshiScroll(options, '.list-wrapper', {});
}
function pullDownRefresh()
{
//		Custom pull down refresh function
	var $listParent = $('.list-wrapper > .list-scroller > ul');
	for (var i = 0; i < 5; i++)
	{
		var firstListItemIndex = parseInt($listParent.children(":first").data('index'), 10) - 1;
		$listParent.prepend('<li data-index="' + firstListItemIndex + '">Pretty row initial content : ' + firstListItemIndex + '</li>');
	}

	refreshiScroll.pullDownLoaded();
}
function pullUpRefresh()
{
//		Demo: Set timeout for animation of refreshing (setTimeout should be removed)
	setTimeout(function ()
	{
		//		Custom pull down refresh function
		var $listParent = $('.list-wrapper > .list-scroller > ul');
		for (var i = 0; i < 5; i++)
		{
			var lastItemIndex = parseInt($listParent.children(":last").data('index'), 10) + 1;
			$listParent.append('<li data-index="' + lastItemIndex + '">Pretty row initial content : ' + lastItemIndex + '</li>');
		}
		refreshiScroll.pullUpLoaded();
	}, 2000);
}