var demoBaseOwlOptions = {
	margin: 10,
	nav: true,
	navText: ['', ''],
	dots: false,
	loop: false
};
function initOwlCarousel($owl, options)
{
	var owlOptions = $.extend({}, demoBaseOwlOptions, options);
	return $owl.owlCarousel(owlOptions);
}
function owlItemClickedMonitor($owl, clickedHandler)
{
	$owl.on('mousedown', '.item', function ()
	{
		$(this).on('mouseup mousemove', function handler(event)
		{
			if (event.type === 'mouseup' && event.which <= 1) //only for left key
			{
				// Clicked (left key)
				clickedHandler && clickedHandler();
			}
			else
			{
				// Dragged
			}
			$(this).off('mouseup mousemove', handler);
		});
	});
}