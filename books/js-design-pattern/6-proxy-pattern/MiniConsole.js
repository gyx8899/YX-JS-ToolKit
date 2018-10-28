let miniConsole = (() => {
	let cache = [];
	let handle = (e) => {
		// F2
		if (e.keyword === 113)
		{
			let script = document.createElement('script');
			script.onload = () => {
				cache.forEach(log => log());
			};

			script.src = 'miniConsole.js';
			document.getElementsByTagName('head')[0].appendChild(script);
			document.body.removeEventListener('keydown')
		}
	};

	document.body.addEventListener('keydown', handle, false);

	return {
		log: () => {
			let args = arguments;
			cache.push(() => {
				return miniConsole.log.apply(miniConsole, args);
			});
		}
	};
})();

miniConsole.log(11);

miniConsole = {
	log: () => {
		console.log(Array.prototype.join.call(arguments));
	}
}