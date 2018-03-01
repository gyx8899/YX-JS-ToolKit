function rotateString(s, fromIndex, toIndex)
{
	var result = s.split('');
	while (fromIndex < toIndex)
	{
		var temp = s[fromIndex];
		result[fromIndex++] = s[toIndex];
		result[toIndex--] = temp;
	}
	return result.join('');
}

function leftRotateString(s, m, n)
{
	var result = s;
	m %= n;
	result = rotateString(result, 0, m - 1);
	result = rotateString(result, m, n - 1);
	result = rotateString(result, 0, n - 1);
	return result;
}