/**
 * ClassName v1.1.1.20181222
 */
class ElementClassName {
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
		if (!element || (!!element && element.length === 0) || !className)
		{
			return false;
		}
		return element.classList.contains(className);
	}
	_has(element, className)
	{
		if (!element || (!!element && element.length === 0) || !className)
		{
			return false;
		}
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
		if (!element || (!!element && element.length === 0) || !className)
		{
			return false;
		}
		let elements = element.length ? element : [element];
		return [].forEach.call(elements, item => item.classList.toggle(className));
	}
	_toggle(element, className)
	{
		return this._addRemoveClassName(element, className);
	}

	_addRemoveClassList(element, className, isAdd)
	{
		if (!element || (!!element && element.length === 0) || !className)
		{
			return false;
		}
		let elements = element.length ? element : [element];
		return [].forEach.call(elements, item => item.classList[isAdd ? 'add': 'remove'](className));
	}

	_addRemoveClassName(element, className, isAdd)
	{
		if (!element || (!!element && element.length === 0) || !className)
		{
			return false;
		}
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

const classNameUtil = new ElementClassName();

const hasClass = classNameUtil.has.bind(classNameUtil);
const addClass = classNameUtil.add.bind(classNameUtil);
const removeClass = classNameUtil.remove.bind(classNameUtil);
const toggleClass = classNameUtil.toggle.bind(classNameUtil);

export {hasClass, addClass, removeClass, toggleClass};