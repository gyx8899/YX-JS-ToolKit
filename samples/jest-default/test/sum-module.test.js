let sum = require('../src/sum-module')

test('1 add 2 equal to 3', function() {
	expect(sum(1, 2)).toBe(3);
});