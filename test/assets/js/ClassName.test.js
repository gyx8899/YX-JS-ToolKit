import {addClass, removeClass, toggleClass, hasClass} from "../../../src/assets/js/ClassName";

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

	let invalidElements = [undefined, '', 1, null, new Date(), 'dsaf'];
	const testElementIsValid = (element, className, parameterName, erroInfo) => {
		test(`Test ${parameterName} value "${element}" is invalid`, () => {
			expect(() => {
				hasClass(element, className);
			}).toThrowError(erroInfo);
			expect(() => {
				addClass(element, className);
			}).toThrowError(erroInfo);
			expect(() => {
				removeClass(element, className);
			}).toThrowError(erroInfo);
			expect(() => {
				toggleClass(element, className);
			}).toThrowError(erroInfo);
		});
	};
	invalidElements.forEach((param) => {
		testElementIsValid(param, 'has-class', 'element', `element: "${param}" should be an HTMLElement.`);
	});

	test(`Test className value "element" is invalid`, () => {
		let element = document.querySelector('#hasClass'),
				param = '',
				errorInfo = `className: "${param}" should be an non-empty string.`;
		expect(() => {
			hasClass(element, param);
		}).toThrowError(errorInfo);
	});

	let invalidClassNames = [undefined, '', 1, null, new Date()];
	const testClassNameIsValid = (className, errorInfo) => {
		test(`Test className value "element" is invalid`, () => {
			let element = document.querySelector('#hasClass');
			expect(() => {
				hasClass(element, className);
			}).toThrowError(errorInfo);
			expect(() => {
				addClass(element, className);
			}).toThrowError(errorInfo);
			expect(() => {
				removeClass(element, className);
			}).toThrowError(errorInfo);
			expect(() => {
				toggleClass(element, className);
			}).toThrowError(errorInfo);
		});
	};
	invalidClassNames.forEach((param) => {
		testClassNameIsValid(param,`className: "${param}" should be an non-empty string.`);
	});

	let elSelectors = ['#noClass', '#hasClass', '.item'],
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
	});
});