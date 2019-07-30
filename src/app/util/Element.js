import {hasClass, addClass, removeClass, toggleClass} from "../components/ClassName";
import {uniqueArray} from "./Array";

/**
 * getElements
 * @param elements {selector|nodeType|array|nodelist|jquery element}
 * @returns {Array}
 */
function getElements(elements) {
	let resultElement = [];
	if (elements === undefined || elements === null) {
		resultElement = [];
	} else if (elements.jquery) {
		resultElement = elements.length > 1 ? elements.get() : [elements[0]];
	} else if (elements instanceof window.NodeList || elements instanceof NodeList || elements instanceof HTMLCollection) {
		resultElement = Array.prototype.slice.call(elements);
	} else if (Array.isArray(elements)) {
		resultElement = elements.filter(function (element) {
			return element.nodeType === 1 || element.jquery;
		});
	} else if (elements.nodeType === 1) {
		resultElement = [elements];
	} else if (typeof elements === 'string') {
		resultElement = document.querySelectorAll(elements);
	}
	return resultElement;
}

/**
 * getSelectorsElements
 * @param selectorString
 * @returns {*}
 */
function getSelectorsElements(selectorString) {
	if (!selectorString || (selectorString && selectorString.trim() === '')) {
		return [document];
	}
	let selectorsElements = [],
			selectorsArray = selectorString.split(',').map(function (selectorStringItem) {
				return selectorStringItem.trim();
			});
	selectorsArray = uniqueArray(selectorsArray);
	for (let i = 0, l = selectorsArray.length; i < l; i++) {
		if (selectorsArray[i] === 'document') {
			selectorsElements.push(document);
		} else {
			let scopeNodeList = convertNodeListToArray(document.querySelectorAll(selectorsArray[i]));
			selectorsElements = selectorsElements.concat(scopeNodeList);
		}
	}
	return selectorsElements;
}

/**
 * findParent
 * @param element
 * @param selector
 * @returns {*}
 */
function findParent(element, selector) {
	while ((element = element.parentElement) && !matches(element, selector)) {
	}
	return element;
}

/**
 * matches
 * @param el
 * @param selector
 * @returns {boolean | *}
 */
function matches(el, selector) {
	return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
}

/***
 * Get element's closet class parent element
 * @param {element} element
 * @param {string} className
 * @returns {element}
 */
function closest(element, className) {
	let closetElement = null;
	if (hasClass(element, className)) {
		closetElement = element;
	} else {
		closetElement = findParent(element, '.' + className);
	}
	return closetElement;
}

/***
 * Check element has parentElement
 * @param el
 * @param parentElement
 * @returns {boolean}
 */
function hasClosest(el, parentElement) {
	if (el === parentElement) {
		return true;
	}
	if (parentElement === undefined) {
		return false;
	}

	let parents = [], p = el.parentNode;
	while (p !== parentElement && p.parentNode) {
		let o = p;
		parents.push(o);
		p = o.parentNode;
	}
	return p === parentElement;
}

function parentsUntil(el, selector, filter) {
	const result = [];

	// match start from parent
	el = el.parentElement;
	while (el && !matches(el, selector)) {
		if (!filter) {
			result.push(el);
		} else {
			if (matches(el, filter)) {
				result.push(el);
			}
		}
		el = el.parentElement;
	}
	return result;
}

/***
 * Convert JS selector elements to array
 * @param {elements} nodeList
 * @returns {Array}
 */
function convertNodeListToArray(nodeList) {
	let resultArray = [];
	for (let i = 0, l = nodeList.length; i < l; i++) {
		resultArray[i] = nodeList[i];
	}
	return resultArray;
}

/**
 * Insert style to head
 * @param {string} cssText - style string
 * @param {string} id - id string
 */
function insertStyleToHead(cssText, id) {
	let head = document.head || document.getElementsByTagName('head')[0],
			style = document.createElement('style');

	style.type = 'text/css';
	if (!!id) {
		style.id = id;
	}
	if (style.styleSheet) {
		style.styleSheet.cssText = cssText;
	} else {
		style.appendChild(document.createTextNode(cssText));
	}

	head.appendChild(style);
}

/**
 * Create one html tag element with tagInfo
 * @param {string} tagName - html tag name
 * @param {object} tagInfo - tag's attributes and style object, such as { attr: {}, style: {} }
 * @return {element} html tag element.
 */
function createTagElement(tagName, tagInfo) {
	let tagElement = document.createElement(tagName);

	Object.keys(tagInfo.attr).forEach(function (key) {
		tagElement.setAttribute(key, tagInfo.attr[key]);
	});

	Object.keys(tagInfo.style).forEach(function (key) {
		tagElement.style[key] = tagInfo.style[key];
	});

	return tagElement;
}

/**
 * addChildElement
 * @param targetElement
 * @param addedElement
 * @param position
 * @return resultAddedElement
 */
function addElement(targetElement, addedElement, position) {
	let resultAddedElement = null;
	if (!!targetElement && !!addedElement) {
		switch (position && position.toLowerCase()) {
			case 'replace':
				if (!!addedElement.nodeType) {
					targetElement.innerHTML = '';
					resultAddedElement = targetElement.appendChild(addedElement);
				} else {
					targetElement.innerHTML = addedElement;
					resultAddedElement = targetElement.firstChild;
				}
				break;
			case 'prepend':
				if (!!addedElement.nodeType) {
					resultAddedElement = targetElement.insertBefore(addedElement, targetElement.firstChild);
				} else {
					targetElement.insertAdjacentHTML('afterbegin', addedElement);
				}
				break;
			case 'insertbefore':
				if (!!addedElement.nodeType) {
					targetElement.insertAdjacentHTML('beforebegin', addedElement.outerHTML);
					resultAddedElement = targetElement.previousElementSibling;
				} else {
					if (targetElement.parentNode) {
						targetElement.parentNode.insertBefore(addedElement, targetElement);
					}
				}
				break;
			case 'insertafter':
				if (!!addedElement.nodeType) {
					targetElement.insertAdjacentHTML('afterend', addedElement.outerHTML);
					resultAddedElement = targetElement.nextElementSibling;
				} else {
					if (targetElement.parentNode) {
						targetElement.parentNode.insertBefore(addedElement, targetElement.nextSibling);
					}
				}
				break;
			default: //'append'
				if (!!addedElement.nodeType) {
					resultAddedElement = targetElement.appendChild(addedElement);
				} else {
					targetElement.insertAdjacentHTML('beforeend', addedElement);
				}
		}
	}

	return resultAddedElement;
}

export {
	hasClass,
	addClass,
	removeClass,
	toggleClass,
	getElements,
	getSelectorsElements,
	findParent,
	matches,
	closest,
	hasClosest,
	convertNodeListToArray,
	insertStyleToHead,
	createTagElement,
	addElement,
}