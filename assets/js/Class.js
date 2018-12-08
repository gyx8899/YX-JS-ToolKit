/**
 * Class v1.0.1.20181208
 */
class Class {
	constructor()
	{
		this._addRemoveClassList = this._addRemoveClassList.bind(this);
		this._addRemoveClassName = this._addRemoveClassName.bind(this);
	}

	has(element, className)
	{
		if (!element)
		{
			return false;
		}
		if (element.classList)
		{
			this.has = (element, className) => {
				return this._areParmetersVaild(element, className) && element.classList.contains(className);
			};
		}
		else
		{
			this.has = (element, className) => {
				return this._areParmetersVaild(element, className) && (new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className));
			}
		}
		this.has(element, className);
	}

	add(element, className)
	{
		if (!element)
		{
			return false;
		}
		if (element.classList || (element.length > 1 && element[0].classList))
		{
			this.add = (element, className) => {
				this._areParmetersVaild(element, className) && this._forEach(element, this._addRemoveClassList, className, true);
			}
		}
		else
		{
			this.add = (element, className) => {
				this._areParmetersVaild(element, className) && this._forEach(element, this._addRemoveClassName, className, true);
			}
		}
		this.add(element, className);
	}

	remove(element, className)
	{
		if (!element)
		{
			return false;
		}
		if (element.classList || (element.length > 1 && element[0].classList))
		{
			this.remove = (element, className) => {
				this._areParmetersVaild(element, className) && this._forEach(element, this._addRemoveClassList, className, false);
			}
		}
		else
		{
			this.remove = (element, className) => {
				this._areParmetersVaild(element, className) && this._forEach(element, this._addRemoveClassName, className, false);
			};
		}
		this.remove(element, className);
	}

	toggle(element, className)
	{
		if (!element)
		{
			return false;
		}
		if (element.classList)
		{
			element.classList.toggle(className);
		}
		else if (element.length > 1 && element[0].classList)
		{
			[].forEach.call(element, item => item.classList.toggle(className));
		}
		else
		{
			this._addRemoveClassName(element, className, undefined);
		}
	}

	_areParmetersVaild(element, className)
	{
		return !(!element || element.length === 0 || !className || className.trim() === '');
	}

	_forEach(array, callback)
	{
		let arrays = array;
		if (!arrays.length)
		{
			arrays = [array];
		}
		[].forEach.call(arrays, (item) => {
			callback(item, ...[].slice.call(arguments, 2));
		});
	}

	_addRemoveClassList(el, className, isAdd = true)
	{
		let hasClass = this.has(el, className);
		if (hasClass !== isAdd)
		{
			el.classList[hasClass ? 'remove': 'add'](className);
		}
	}

	_addRemoveClassName(el, className, isAdd)
	{
		let hasClass = this.has(el, className);
		if (hasClass !== isAdd)
		{
			if (hasClass)
			{
				el.className = el.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
			}
			else
			{
				el.className += ' ' + className;
			}
		}
	}
}

export default Class;