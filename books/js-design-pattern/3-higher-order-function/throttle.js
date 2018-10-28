let throttle = (fn, interval) => {
	let __self = fn,
			timer = null,
			firstTime = true;

	return function () {
		let args = arguments,
				__me = this;

		if (firstTime)
		{
			__self.apply(__me, args);
			return firstTime = false;
		}
		if (timer)
		{
			return false;
		}
		else
		{
			timer = setTimeout(() => {
				clearTimeout(timer);
				timer = null;
				__self.apply(__me, args);
			}, interval || 500);
		}
	};
};