// is
const isWindow = (obj) => {
	return obj !== null && obj !== undefined && obj === obj.window;
}

const isNumeric = (value) => {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

const isFunction = (item) => {
	if (typeof item === 'function') {
		return true;
	}
	let type = Object.prototype.toString.call(item);
	return type === '[object Function]' || type === '[object GeneratorFunction]';
}

const isEmptyObject = (obj) => {
	return Object.keys(obj).length === 0;
}

const isPlainObject = (obj) => {
	if (typeof (obj) !== 'object' || obj.nodeType || obj !== null && obj !== undefined && obj === obj.window) {
		return false;
	}

	if (obj.constructor &&
			!Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
		return false;
	}

	return true;
}

// isTypeOf
let _toString = Object.prototype.toString
let map = {
  array: 'Array',
  object: 'Object',
  function: 'Function',
  string: 'String',
  null: 'Null',
  undefined: 'Undefined',
  boolean: 'Boolean',
  number: 'Number'
}
const getType = (item) => {
  return _toString.call(item).slice(8, -1)
}
const isTypeOf = (item, type) => {
  return map[type] && map[type] === getType(item)
}

export {
	isWindow,
	isNumeric,
	isFunction,
	isEmptyObject,
	isPlainObject,
	isTypeOf
}