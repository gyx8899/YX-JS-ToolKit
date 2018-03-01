function stringContain(longStr, shortStr)
{
	var strHash = {};
	longStr.split('').forEach(function (item) {
		strHash[item] = item;
	});
	return shortStr.split('').every(function (value) {
		return strHash[value] !== undefined
	});
}