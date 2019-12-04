import {addClass, removeClass, hasClass} from '../util/ClassName.js';
import {getElements} from "../util/Element.js";

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
		let containers = getElements(this.container);

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
}

export default HoverSelect;