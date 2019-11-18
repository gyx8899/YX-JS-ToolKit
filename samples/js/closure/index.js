let func = function () {
	let a = 1;
	return function () {
		a++;
		alert(a);
	};
};

func(); // 2
func(); // 3
func(); // 4
func(); // 5
func(); // 6

let mult = (function () {
	let cache = {};
	let calculate = function () {
		let a = 1;
		for (let i = 0, l = arguments.length; i < l; i++)
		{
			a = a * arguments[i];
		}
		return a;
	};

	return function (){
		var args = Array.prototype.join.call( arguments, ',');
		if (args in cache)
		{
			return cache[args];
		}
		return cache[args] = calculate.apply(null, arguments);
	}
})();

let report = (function () {
	let images = [];
	return function (src) {
		let img = new Image();
		images.push(img);
		img.src = src;
	};
})();