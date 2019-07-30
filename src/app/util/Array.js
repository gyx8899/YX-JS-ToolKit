/***
 * uniqueArray
 * @param {Array} sourceArray
 * @returns {Array}
 */
function uniqueArray(sourceArray) {
	// return [...new Set(sourceArray)];
	let resultArray = [], hash = {};
	for (let i = 0, elem, l = sourceArray.length; i < l && (elem = sourceArray[i]) !== null; i++) {
		if (!hash[elem]) {
			resultArray.push(elem);
			hash[elem] = true;
		}
	}
	return resultArray;
}

/**
 * Get array item string which spilt with ',';
 * @param array
 * @returns {string}
 */
function getArrayString(array) {
	return [].map.call(array, function (arrayItem) {
		if (Array.isArray(arrayItem)) {
			arrayItem = '[' + getArrayString(arrayItem) + ']';
		} else if (typeof arrayItem === 'object') {
			arrayItem = JSON.stringify(arrayItem);
		}
		return arrayItem.toString();
	}).join(',');
}

/**
 * Find item with key
 * @param array
 * @param key
 * @param value
 * @return {*}
 */
function findObject(array, key, value) {
	if (array.length === 0 || !key || !value) {
		return null;
	}
	for (let i = array.length - 1; i >= 0; i--) {
		if (array[i][key] === value) {
			return array[i];
		}
	}
	return null;
}

/**
 * Find item's index in array
 * @param array
 * @param item
 * @param key
 * @return {number}
 */
function findIndex(array, item, key) {
	let isObject = (typeof item === 'object' && !!key);
	if (isObject && !item[key]) {
		return -1;
	}
	let comparedValue = isObject ? item[key] : item,
			arrayItemValue = (ary, i, key) => {
				return ary[i];
			};
	if (isObject) {
		arrayItemValue = (ary, i, key) => {
			return ary[i][key];
		}
	}

	for (let i = array.length - 1; i >= 0; i--) {
		if (arrayItemValue(array, i, key) === comparedValue) {
			return i;
		}
	}
	return -1;
}

function find(array, value, key) {
	if (!array || array.length === 0) {
		return null;
	}
	let result = null;
	[].forEach.call(array, (item, index) => {
		if (item === value || (!!key && item[key] === value)) {
			array = array.concat(array.splice(index, array.length - index));
			result = item;
		}
	});

	return result;
}

/**
 * Remove item from array
 * @param array
 * @param item
 * @return {*}
 */
function spliceItem(array, item) {
	let index = findIndex(array, item);
	if (index === -1) {
		return array;
	}
	return array.splice(index, 1);
}

export {
	uniqueArray,
	find,
	findIndex,
	findObject,
	spliceItem,
	getArrayString,
}