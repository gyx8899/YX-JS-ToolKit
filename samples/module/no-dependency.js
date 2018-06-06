;(function (root, factory) {
	// AMD&CMD -> CommonJS -> Normal
	if (typeof define === 'function' && define.amd)
	{
		define(factory);
	}
	else if (typeof module === 'object' && module.exports)
	{
		module.exports = factory();
	}
	else
	{
		root.NoDependency = factory();
	}
}(this || typeof window !== 'undefined' ? window : global, function () {
	let yourModule = {
		name: "No-dependency"
	};
	//...
	return yourModule;
}));