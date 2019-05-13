import {addClass, removeClass, toggleClass, hasClass} from "../../../src/assets/js/ClassNameUtil";

describe('Test addClass, removeClass, toggleClass, hasClass', () => {
	const $ = require('jquery');
	beforeEach(() => {
		document.body.innerHTML = `
			<div id="noClass"></div>
			<div id="hasClass" class="has-class"></div>
			<div class="item same-class"></div>`;
	});
	afterEach(() => {
		document.body.innerHTML = '';
	});

	test('Test undefined selector with hasClass', () => {
		let selector = undefined,
				testClass = 'has-class';
		expect(hasClass(document.querySelector(selector), testClass)).not.toBeTruthy();
	});

	let elSelectors = ['#no', '#noClass', '#hasClass', '.item'],
			apis = [hasClass, addClass, removeClass, toggleClass],
			apiStrings = ['hasClass', 'addClass', 'removeClass', 'toggleClass', 'toggleClass'],
			testClasses = ['has-class', 'add-class', 'same-class', 'same-class', "add-class", 'toggle-class'];
	const testAPIS = (selector, testAPI, testClass, apiString) => {
		test(`Test: ${apiString} with ${selector} and ${testClass}`, () => {
			let element = document.querySelector(selector);
			expect(hasClass(element, testClass)).toBe($(selector).hasClass(testClass));
			testAPI(element, testClass);
			expect(hasClass(element, testClass)).toBe($(selector).hasClass(testClass));
		});
	};

	apis.forEach((api, index) => {
		for (let i = 0, l = elSelectors.length; i < l; i++)
		{
			testAPIS(elSelectors[i], api, testClasses[index], apiStrings[index]);
		}
	})
});