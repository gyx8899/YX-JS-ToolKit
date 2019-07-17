/**
 * ClassName v1.1.3.20190717
 */
class ClassName {
	constructor()
	{
		if (!document.createElement('div').classList)
		{
			this.has = this._has;
			this.add = this._add;
			this.remove = this._remove;
			this.toggle = this._toggle;
		}
	}

	has(element, className)
	{
		return element.classList.contains(className);
	}

	_has(element, className)
	{
		return (new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className));
	}

	add(element, className)
	{
		return this._addRemoveClassList(element, className, true);
	}

	remove(element, className)
	{
		return this._addRemoveClassList(element, className, false);
	}

	_add(element, className)
	{
		return this._addRemoveClassName(element, className, true);
	}

	_remove(element, className)
	{
		return this._addRemoveClassName(element, className, false);
	}

	toggle(element, className)
	{
		let elements = element.length ? element : [element];
		return [].forEach.call(elements, item => item.classList.toggle(className));
	}

	_toggle(element, className)
	{
		return this._addRemoveClassName(element, className);
	}

	_addRemoveClassList(element, className, force)
	{
		let elements = element.length ? element : [element];
		return [].forEach.call(elements, item => item.classList[force ? 'add' : 'remove'](className));
	}

	_addRemoveClassName(element, className, force)
	{
		let elements = element.length ? element : [element];
		return [].forEach.call(elements, item => {
			let hasClass = this.has(item, className);
			if (hasClass !== force)
			{
				if (hasClass)
				{
					item.className = item.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
				}
				else
				{
					item.className += ' ' + className;
				}
			}
		});
	}
}

const isElement = (o) => {
	return (
			typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
					o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName === "string"
	);
};

const argumentsProxyHandler = {
	get(target, propKey, receiver)
	{
		return function (...args) {
			if (!isElement(args[0]))
			{
				throw new Error(`element: "${args[0]}" should be an HTMLElement.`);
			}
			if (typeof args[1] !== 'string' || args[1] === '')
			{
				throw new Error(`className: "${args[1]}" should be an non-empty string.`);
			}
			return target[propKey].apply(this, args);
		};
	}
};

const classNameUtil = new Proxy(new ClassName(), argumentsProxyHandler);

const hasClass = classNameUtil.has.bind(classNameUtil);
const addClass = classNameUtil.add.bind(classNameUtil);
const removeClass = classNameUtil.remove.bind(classNameUtil);
const toggleClass = classNameUtil.toggle.bind(classNameUtil);

export {hasClass, addClass, removeClass, toggleClass};