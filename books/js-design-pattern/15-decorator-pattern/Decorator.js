Function.prototype.before = function (beforeFn) {
	let __self = this;

	return function () {
		beforeFn.apply(__self, arguments);

		return __self.apply(this, arguments);
	};
};

Function.prototype.after = function (afterFn) {
	let __self = this;
	return function () {
		let ret = __self.apply(this, arguments);
		afterFn.apply(__self, arguments);

		return ret;
	};
};

let before = function (fn, beforeFn)
{
	return function () {
		beforeFn.apply(this, arguments);
		return fn.apply(this, arguments);
	};
};

let after = function (fn, afterFn)
{
	return function () {
		let ret = fn.apply(this, arguments);
		afterFn.apply(this, arguments);
		return ret;
	}
};

let beforeAfter = function (fn, beforeFn, afterFn)
{
	return function () {
		let ret = before(fn, beforeFn);
		return after(ret, afterFn);
	};
};