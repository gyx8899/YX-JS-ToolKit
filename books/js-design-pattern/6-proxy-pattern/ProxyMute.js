let mute = () => {
	let result = 1;
	Array.prototype.forEach.call(arguments)(argument => {
		result *= argument;
	});
};

let proxyMute = () => {
	let cache = {};

	return () => {
		let args = Array.prototype.join.call(arguments, ',');
		if (args in cache)
		{
			return cache[args];
		}
		else
		{
			return cache[args] = mute.apply(this, arguments);
		}
	};
};