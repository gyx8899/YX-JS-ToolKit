import {consoleLog} from '../../../src/app/util/Tool';

describe('Util Tool', function () {
	beforeEach(function () {
		global.console = {
			warn: jest.fn(),
			log: jest.fn(),
			groupEnd: jest.fn(),
			group: jest.fn(),
			table: jest.fn()
		}
	});
	afterEach(function () {

	});

	// API test unit
	test('consoleLog', function () {
		function testLog(a, b, c, d) {
			return consoleLog(...arguments);
		}
		let args = [1, '2', [3, '3'], {4: 44}];
		expect(testLog(...args)).toBe('consoleLog');
		expect(global.console.log).toHaveBeenCalledWith(expect.any(String), expect.any(String), 'consoleLog:', ...args);
	});
});