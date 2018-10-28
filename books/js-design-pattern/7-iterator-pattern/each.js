let each = (array, callback) => {
	for (let i = 0, l = array.length; i < l; i++)
	{
		callback.call(array[i], i, array[i]);
	}
};

each([1,3,4], (i, content) => {
	console.log(`${i}: ${content}`);
});