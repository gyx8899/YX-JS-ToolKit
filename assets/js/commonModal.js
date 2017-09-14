// Common header button event, but may have more different in different pages;
// Require jQuery
$('body').on('click', '.mobile-name>span', {
	toLeftCallback: toggleToLeftCallback,
	toRightCallback: toggleToRightCallback
}, toggleLeftRightInMobile);

// Toggle left/Right container in Mobile width
function toggleLeftRightInMobile(event)
{
	if ($('.container-right').hasClass('show'))
	{
		$('.container-right').removeClass('show');
		$('.container-left').addClass('show');
		event.data.toLeftCallback();
	}
	else
	{
		$('.container-left').removeClass('show');
		$('.container-right').addClass('show');
		event.data.toRightCallback();
	}
}

// Should be overriding per page if needed;
function toggleToLeftCallback()
{
//	none
}

// Should be overriding per page if needed;
function toggleToRightCallback()
{
//	none
}