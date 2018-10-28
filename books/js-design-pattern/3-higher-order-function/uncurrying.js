Function.prototype.uncurrying = function () {
	return () => {
		return Function.prototype.call.apply(this, arguments);
	}
};