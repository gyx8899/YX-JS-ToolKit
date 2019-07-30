$(document).ready(function ()
{
	$(window).scroll(function ()
	{
		var scrollTop = $(window).scrollTop(), $header = $('.header'), headerHeight = $header.height();
		if (scrollTop > 0)
		{
			setTimeout(function ()
			{
				if ($(window).scrollTop() >= headerHeight)
				{
					$header.addClass('sticky sticky-animation sticky-bg');
				}
				else
				{
					$header.addClass('sticky sticky-animation').removeClass('sticky-bg');
				}
				$('.header-placeholder').addClass('sticky');
			}, 0);
		}
		else
		{
			$header.removeClass('sticky-animation').removeClass('sticky-bg');
			setTimeout(function ()
			{
				if ($(window).scrollTop() === 0 && !$header.hasClass('sticky-bg'))
				{
					$header.removeClass('sticky-animation sticky');
					$('.header-placeholder').removeClass('sticky');
				}
			}, 500);
		}
	});
});
