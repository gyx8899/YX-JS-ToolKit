$(document).ready(function ()
{
	// Nav item click
	$('#nav-more').on('click', function ()
	{
		$('#item-more').toggleClass('open');
	});

	// Nav hamburger
	$(".hamburger").click(function ()
	{
		if ($(this).hasClass("hamburger-close"))
		{
			$(this).removeClass("hamburger-close").addClass("hamburger-normal");
			$(".spNav").hide();
		}
		else
		{
			$(this).removeClass("hamburger-normal").addClass("hamburger-close");
			$(".spNav").show();
		}
	});
	$(window).resize(function ()
	{
		$(".spNav").hide();
		$(".hamburger").removeClass("hamburger-close").addClass("hamburger-normal");
	})
});
