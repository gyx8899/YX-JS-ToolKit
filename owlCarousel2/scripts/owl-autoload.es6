window.addEventListener("load", function () {
	initOwl1();
	initOwl2();
}, false);

let owlOption = {
			loop: false,
			margin: 10,
			nav: true,
			navText: ['', ''],
			dots: false,
			slideBy: 'page',
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 3
				},
				1000: {
					items: 4
				}
			}
		};

function initOwl1()
{
	let $owl1 = $('#owl1'),
			loadDataTimes = 1,
			isLoading = false;
	$owl1.on('refreshed.owl.carousel', owlScrolled)
			.on('translated.owl.carousel', owlScrolled)
			.owlCarousel(owlOption);

	function owlScrolled(event)
	{
		let pages = event.page.count,
				page = event.page.index;
		if ((page === pages - 1 || (page === pages - 2 && pages + event.item.index >= event.item.count)) && !isLoading)
		{
			console.log(`PagesCount: ${pages}, currentPage: ${page}`);
			fetchData(++loadDataTimes);
		}
	}
	function renderItems(dataNo, dataItems)
	{
		for (let i = 0; i < dataItems.length; i++)
		{
			$owl1.trigger('add.owl.carousel', [`<div class="item"><h4>${dataNo}: ${i + 1}</h4></div>`]);
		}

		// (Option) Remove old loading status item;
		$owl1.trigger('remove.owl.carousel', $owl1.find('.item').length - dataItems.length - 1);
		// (Option) Add loading status item;
		$owl1.trigger('add.owl.carousel', [`<div class="item"><h4>Loading...</h4></div>`]);

		$owl1.trigger('refresh.owl.carousel');
	}

	function fetchData(dataNo)
	{
		isLoading = true;

		setTimeout(() => {
			let fakeData = [1, 2, 3, 4];
			renderItems(dataNo, fakeData);

			isLoading = false;
		}, 1000);
	}
}

function initOwl2()
{
	let $owl2 = $('#owl2'),
			loadDataTimes = 1,
			isLoading = false;
	$owl2.on('refreshed.owl.carousel', owlScrolled)
			.on('translated.owl.carousel', owlScrolled)
			.owlCarousel(owlOption);

	function owlScrolled(event)
	{
		let pages = event.page.count,
				page = event.page.index;
		if ((page === pages - 1 || (page === pages - 2 && pages + event.item.index >= event.item.count)) && !isLoading)
		{
			fetchData(++loadDataTimes);
		}
	}
	function renderItems(dataNo, dataItems)
	{
		for (let i = 0; i < dataItems.length; i++)
		{
			$owl2.trigger('add.owl.carousel', [`<div class="item"><h4>${dataNo}: ${i + 1}</h4></div>`]);
		}

		$owl2.trigger('refresh.owl.carousel');
	}

	function fetchData(dataNo)
	{
		isLoading = true;
		$owl2.addClass('is-loading');

		setTimeout(() => {
			let fakeData = [1, 2, 3, 4];
			renderItems(dataNo, fakeData);

			isLoading = false;
			$owl2.removeClass('is-loading');
		}, 1000);
	}
}

