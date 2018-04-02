window.addEventListener("load", function () {
	initOwl();
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

function initOwl()
{
	let $owl = $('#owlBasicBtn'),
			loadDataTimes = 1,
			isLoading = false;
	$owl.on('refreshed.owl.carousel', owlScrolled)
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
			$owl.trigger('add.owl.carousel', [`<div class="item"><h4>${dataNo}: ${i + 1}</h4></div>`]);
		}

		// (Option) Remove old loading status item;
		$owl.trigger('remove.owl.carousel', $owl.find('.item').length - dataItems.length - 1);
		// (Option) Add loading status item;
		$owl.trigger('add.owl.carousel', [`<div class="item"><h4>Loading...</h4></div>`]);

		$owl.trigger('refresh.owl.carousel');
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

