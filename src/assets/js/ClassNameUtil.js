/**
 * ClassName v1.1.2.20190513
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

	_addRemoveClassList(element, className, isAdd)
	{
		let elements = element.length ? element : [element];
		return [].forEach.call(elements, item => item.classList[isAdd ? 'add' : 'remove'](className));
	}

	_addRemoveClassName(element, className, isAdd)
	{
		let elements = element.length ? element : [element];
		return [].forEach.call(elements, item => {
			let hasClass = this.has(item, className);
			if (hasClass !== isAdd)
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

const argumentsProxyHandler = {
	get(target, propKey, receiver)
	{
		const origMethod = target[propKey];
		return function (...args) {
			let element = args[0],
					className = args[1];
			if (!element || (!!element && element.length === 0) || !className)
			{
				return false;
			}
			return origMethod.apply(this, args);
		};
	}
};

const classNameUtil = new Proxy(new ClassName(), argumentsProxyHandler);

const hasClass = classNameUtil.has.bind(classNameUtil);
const addClass = classNameUtil.add.bind(classNameUtil);
const removeClass = classNameUtil.remove.bind(classNameUtil);
const toggleClass = classNameUtil.toggle.bind(classNameUtil);

export {hasClass, addClass, removeClass, toggleClass};