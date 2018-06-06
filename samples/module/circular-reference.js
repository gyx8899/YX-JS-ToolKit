;(function (root, factory){
	// AMD&CMD -> CommonJS -> Normal
	if (typeof define === 'function' && define.amd)
	{
		define(['exports', 'jquery'], factory);
	}
	else if (typeof module === 'object' && module.exports)
	{
		factory(module.exports, require('jquery'));
	}
	else
	{
		factory((root.Reference = {}), root.jquery);
	}
}(this || typeof window !== 'undefined' ? window : global, function (exports, jQuery) {
	exports.action = function (){
		return jQuery('#testId').text() + ": 12353254";
	};
	exports.name = "123432513454"
}));