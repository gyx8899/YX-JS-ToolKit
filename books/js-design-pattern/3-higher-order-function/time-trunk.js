let timeChunk = (ary, fn, count) => {
	let timer = null,
			array = [...ary],
	start = () => {
		for (let i = 0; i < Math.min(count || 1, array.length); i++)
		{
			fn(array.shift());
		}
	};
	return () => {
		timer = setInterval(() => {
			if (array.length === 0)
			{
				return clearInterval(timer);
			}
			start();
		}, 200);
	};
};