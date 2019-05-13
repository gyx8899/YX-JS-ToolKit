/**!
 * ObserverClassName v1.0.0.20190513
 */
class ObserverClassName {
	constructor()
	{
		this.subNode = []

		let div = document.createElement('div')
		if (!div.classList || !div.classList.remove)
		{
			this.replace = this._replace;
		}
	}

	addSubNode(node, className = '')
	{
		this.subNode.push({
			element: node,
			className: className
		})
	}

	update(newClassName)
	{
		this.subNode = this.subNode.map(({element, className: oldClassName}) => {
			this.replace(element, oldClassName, newClassName);
			return {
				element: element,
				className: newClassName
			}
		})
	}

	replace(element, oldClassName, newClassName)
	{
		if (oldClassName !== '')
		{
			element.classList.remove(oldClassName);
		}
		if (newClassName !== '')
		{
			element.classList.add(newClassName);
		}
	}

	_replace(element, oldClassName, newClassName)
	{
		if (oldClassName !== '')
		{
			element.className = element.className.replace(new RegExp('(\\s|^)' + oldClassName + '(\\s|$)'), newClassName);
		}
		else
		{
			element.className += ' ' + newClassName;
		}
	}
}

export default ObserverClassName