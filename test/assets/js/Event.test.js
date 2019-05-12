import Event from '../../../src/assets/js/Event'

describe('Event component', function () {
	let keys = {
		key1: 'key1',
		key2: 'key2',
		key3: 'key3',
		key4: 'key4',
	};
	let KeyFnObj = {
		key1: () => {
			console.log('1-Key1: ' + 'no param');
		},
		key2: (param1) => {
			console.log('1-Key2: ' + param1);
		},
		key3: (param1, param2) => {
			console.log('1-Key3: ' + param1 + ' ' + param2);
		},
		key4: (param1, param2, param3) => {
			console.log('1-Key4: ' + param1 + ' ' + param2 + ' ' + param3);
		}
	};
	let KeyFnObj2 = {
		key1: () => {
			console.log('2-Key1: ' + 'no param');
		},
		key2: (param1) => {
			console.log('2-Key2: ' + param1);
		},
		key3: (param1, param2) => {
			console.log('2-Key3: ' + param1 + ' ' + param2);
		},
		key4: (param1, param2, param3) => {
			console.log('2-Key4: ' + param1 + ' ' + param2 + ' ' + param3);
		}
	};
	let eventInstance = null;

	beforeEach(function () {
		eventInstance = new Event();
	});
	afterEach(function () {
		eventInstance.destroy();
		eventInstance = null;
	});

	// API test unit
	test('Event.trigger() before Event.on()', function () {
		const spy = jest.spyOn(KeyFnObj, keys.key1);

		eventInstance.trigger(keys.key1);
		expect(spy).not.toHaveBeenCalled();
		spy.mockRestore();
	});
	test('Event.trigger() after Event.on()', function () {
		const spy = jest.spyOn(KeyFnObj, keys.key1);

		eventInstance.on(keys.key1, KeyFnObj[keys.key1]);
		eventInstance.trigger(keys.key1);

		expect(spy).toHaveBeenCalled();
		spy.mockRestore();
	});
	test('Event.trigger() after Event.off()', function () {
		const spy = jest.spyOn(KeyFnObj, keys.key1);

		eventInstance.on(keys.key1, KeyFnObj[keys.key1]);
		eventInstance.off(keys.key1, KeyFnObj[keys.key1]);
		eventInstance.trigger(keys.key1);

		expect(spy).not.toHaveBeenCalled();
		spy.mockRestore();
	});
	test('Event.trigger() after Event.off(): one key, multiple events, off one event', function () {
		const spyObj1 = jest.spyOn(KeyFnObj, keys.key1);
		const spyObj2 = jest.spyOn(KeyFnObj2, keys.key1);

		eventInstance.on(keys.key1, KeyFnObj[keys.key1]);
		eventInstance.on(keys.key1, KeyFnObj2[keys.key1]);
		eventInstance.off(keys.key1, KeyFnObj[keys.key1]);
		eventInstance.trigger(keys.key1);

		expect(spyObj1).not.toHaveBeenCalled();
		expect(spyObj2).toHaveBeenCalled();
		spyObj1.mockRestore();
		spyObj2.mockRestore();
	});
	test('Event.trigger() after Event.off(): one key, multiple events, off all events', function () {
		const spyObj1 = jest.spyOn(KeyFnObj, keys.key1);
		const spyObj2 = jest.spyOn(KeyFnObj2, keys.key1);

		eventInstance.on(keys.key1, KeyFnObj[keys.key1]);
		eventInstance.on(keys.key1, KeyFnObj2[keys.key1]);
		eventInstance.off(keys.key1);
		eventInstance.trigger(keys.key1);

		expect(spyObj1).not.toHaveBeenCalled();
		expect(spyObj2).not.toHaveBeenCalled();
		spyObj1.mockRestore();
		spyObj2.mockRestore();
	});
	test('Event.trigger() after Event.destroy()', function () {
		const spy = jest.spyOn(KeyFnObj, keys.key1);

		eventInstance.on(keys.key1, KeyFnObj[keys.key1]);
		eventInstance.off(keys.key1, KeyFnObj[keys.key1]);
		eventInstance.destroy();
		eventInstance.trigger(keys.key1);

		expect(spy).not.toHaveBeenCalled();
		spy.mockRestore();
	});
	test('Event.trigger() before Event.on()', function () {
		const spyObj1 = jest.spyOn(KeyFnObj, keys.key1);
		const spyObj2 = jest.spyOn(KeyFnObj2, keys.key1);

		eventInstance.trigger(keys.key1);
		eventInstance.on(keys.key1, KeyFnObj[keys.key1]);
		eventInstance.on(keys.key1, KeyFnObj2[keys.key1]);

		expect(spyObj1).toHaveBeenCalled();
		expect(spyObj2).not.toHaveBeenCalled();
		spyObj1.mockRestore();
		spyObj2.mockRestore();
	});

	var testParams = function (keyItem) {
		test('Event.trigger(type, param1, ...)', function () {
			const spy = jest.spyOn(KeyFnObj, keyItem);
			eventInstance.on(keyItem, KeyFnObj[keyItem]);
			eventInstance.trigger(keyItem, 'param11', 'param22', 'param33');

			expect(spy).toHaveBeenCalledWith('param11', 'param22', 'param33');
			spy.mockRestore();
		});
	};
	for (let keyItem in KeyFnObj)
	{
		if (KeyFnObj.hasOwnProperty(keyItem))
		{
			testParams(keyItem);
		}
	}
});