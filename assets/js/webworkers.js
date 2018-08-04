const call = (method, params) => {
	let callMethod = (callers, thisArg) => {
		let caller = callers.shift();
		thisArg = thisArg ? thisArg : (self || this || window);
		thisArg = thisArg[caller];
		if (callers.length > 0)
		{
			thisArg = callMethod(callers, thisArg);
		}
		return thisArg;
	};
	return new Promise((resolve) => {
		let callers = method.split('.');
		params = Array.isArray(params) ? params : [params];
		let result = callMethod(callers)(...params);
		resolve(result);
	});
};

// WebWorker
onmessage = function (e) {
	let {method, params, callback, scripts, isClose} = e.data;

	scripts && importScripts.apply(this, scripts);

	call(method, params).then((result) => {
		postMessage({result: result, callback: callback});
		isClose && close();
	});
};