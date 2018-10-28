class ProxyFactory
{
	constructor(fn)
	{
		this.cache = {};


	}

}

let createProxyFactory = (fn) => {
	let cache = {};
	return () => {
		let args = [].prototype.join.call(arguments, ',');

		if (args in cache)
		{
			return cache[args];
		}
		else
		{
			cache[args] = fn.apply(this, arguments);
		}
	}
};