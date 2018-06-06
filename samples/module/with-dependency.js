;(function (root, factory) {
	// AMD&CMD -> CommonJS -> Normal
	if (typeof define === 'function' && define.amd)
	{
		define(['jquery'], factory);
	}
	else if (typeof module === 'object' && module.exports)
	{
		module.exports = factory(require('jquery'));
	}
	else
	{
		root.Dependency = factory(root.jQuery);
	}
}(this || (typeof window !== 'undefined' ? window : global), function (jquery) {
		let YourModule = {
			name: () => jquery('#testId').text() + "Dependency"
		};
		//	...
		return YourModule;
}));