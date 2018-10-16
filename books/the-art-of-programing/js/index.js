// 1.1 - Left Rotating String
new Vue({
	el: '#lRStringDemo',
	data: {
		sourceValue: 'Steper Kuo',
		fromIndex: '6',
		toIndex: '10'
	},
	computed: {
		resultValue: function ()
		{
			if (this.sourceValue && this.fromIndex !== '' && this.toIndex !== '')
			{
				return leftRotateString(this.sourceValue, this.fromIndex, this.toIndex);
			}
		}
	}
});

// 1.2 - String Contain
new Vue({
	el: '#stringContain',
	data: {
		longStr: 'SteperKuo',
		shortStr: 'Kuo'
	},
	computed: {
		isContain: function ()
		{
			return stringContain(this.longStr, this.shortStr);
		}
	}
});