class ObserverClassName {
	constructor(){
		this.subNode = []
	}
	addSubNode(node, className){
		this.subNode.push({
			element: node,
			className: className
		})
	}
	update(newClassName){
		this.subNode = this.subNode.map(({element, className}) => {
			this.replace(element, className, newClassName);
			return {
				element: element,
				className: newClassName
			}
		})
	}
	replace(element, oldClassName, newClassName)
	{
		if (element.classList && element.classList.remove)
		{
			this.replaceClass = (element, oldClassName, newClassName) => {
				if (oldClassName !== '')
				{
					element.classList.remove(oldClassName);
				}
				if (newClassName !== '')
				{
					element.classList.add(newClassName);
				}
			};
		}
		else
		{
			this.replaceClass = (element, oldClassName, newClassName) => {
				if (oldClassName !== '')
				{
					element.className = element.className.replace(new RegExp('(\\s|^)' + oldClassName + '(\\s|$)'), newClassName);
				}
				else
				{
					element.className += ' ' + newClassName;
				}
			};
		}
		this.replaceClass(element, oldClassName, newClassName);
	}
}

export default ObserverClassName