import {addClass, removeClass, hasClass} from './ClassName';
/**
 * HoverSelect: v1.0.2.20190407
 * Copyright (c) Kate Kuo @Steper
 */

class HoverSelect {
	constructor(container, itemClass = 'hover__item', selectedClass = 'hover__selected', defaultSelectedClass)
	{
		if (!!container)
		{
			this.container = container;
			this.itemClass = itemClass;
			this.selectedClass = selectedClass;
			this.defaultSelectedClass = defaultSelectedClass;

			this.initHoverListener();
		}
		else
		{
			alert(`${HoverSelect.name}: init failed! Parameter container is ${container}`);
		}
	}

	initHoverListener()
	{
		let containers = HoverSelect.getElements(this.container);

		[].forEach.call(containers, (container) => {
			container.addEventListener('mouseleave', this.reset.bind(this));

			let elements = container.getElementsByClassName(this.itemClass);

			[].forEach.call(elements, (el) => {
				if (!!this.defaultSelectedClass && hasClass(el, this.defaultSelectedClass))
				{
					addClass(el, this.selectedClass);
				}

				el.addEventListener('mouseenter', this.update.bind(this));
			});
		});
	}

	reset(event)
	{
		let elements = event.target.getElementsByClassName(this.itemClass);

		[].forEach.call(elements, (el) => {
			if (!!this.defaultSelectedClass)
			{
				removeClass(el, this.selectedClass);
				if (hasClass(el, this.defaultSelectedClass))
				{
					addClass(el, this.selectedClass);
				}
			}
		});
	}

	update(event)
	{
		let elements = event.target.parentElement.getElementsByClassName(this.itemClass);

		[].forEach.call(elements, (el) => {
			removeClass(el, this.selectedClass);
		});

		addClass(event.target, this.selectedClass);
	}

//	Util
	static getElements(elements)
	{
		let resultElement = [];
		if (elements === undefined || elements === null)
		{
			resultElement = [];
		}
		else if (elements.jquery)
		{
			resultElement = elements.length > 1 ? elements.get() : [elements[0]];
		}
		else if (elements instanceof window.NodeList || elements instanceof NodeList || elements instanceof HTMLCollection)
		{
			resultElement = Array.prototype.slice.call(elements);
		}
		else if (Array.isArray(elements))
		{
			resultElement = elements.filter(function (element) {
				return element.nodeType === 1 || element.jquery;
			});
		}
		else if (elements.nodeType === 1)
		{
			resultElement = [elements];
		}
		else if (typeof elements === 'string')
		{
			resultElement = document.querySelectorAll(elements);
		}
		return resultElement;
	}
}

export default HoverSelect;