import {addClass, removeClass} from "./ClassName";

class HeightTranslation
{
	constructor(element, isReady = true, innerHTML)
	{
		if (!element)
		{
			return ;
		}
		this.element = element;
		this.onClass = 'on';
		this.componentClass = 'height-translation';

		if (!!innerHTML)
		{
			this.element.innerHTML = innerHTML;
		}

		if (jQuery)
		{
			this.element.style.maxHeight = 'auto';
			this.element.style.display = 'none';
		}
		else
		{
			addClass(this.element, this.componentClass);
			HeightTranslation.insertStyleToHead(HeightTranslation.style, HeightTranslation.id);
			!!isReady && this.element.style.setProperty('--max-height', `${this.element.scrollHeight}px`);
		}
	}

	ready()
	{
		if (!jQuery)
		{
			this.element.style.setProperty('--max-height', `${this.element.scrollHeight + this.element.style.paddingTop + this.element.style.paddingBottom}px`);
		}
	}

	on()
	{
		if (jQuery)
		{
			this.on = () => {
				$(this.element).slideToggle();
			};
		}
		else
		{
			this.on = () => addClass(this.element, this.onClass);
		}
		this.on();
	}

	off()
	{
		if (jQuery)
		{
			this.off = () => {
				$(this.element).slideToggle();
			};
		}
		else
		{
			this.off = () => removeClass(this.element, this.onClass);
		}
		this.off();
	}

	static insertStyleToHead(cssText, id)
	{
		if (!!id && !!document.getElementById(id))
		{
			return;
		}
		let head = document.head || document.getElementsByTagName('head')[0],
				style = document.createElement('style');

		style.type = 'text/css';
		if (!!id)
		{
			style.id = id;
		}
		if (style.styleSheet)
		{
			style.styleSheet.cssText = cssText;
		}
		else
		{
			style.appendChild(document.createTextNode(cssText));
		}

		head.appendChild(style);
	}
}

HeightTranslation.style = `
		.height-translation {
		  -webkit-transition: max-height 0.5s;
		  -moz-transition: max-height 0.5s;
		  -o-transition: max-height 0.5s;
		  transition: max-height 0.5s;
		  overflow: hidden;
		  max-height: 0;
		}
		.height-translation.on {
		  max-height: var(--max-height);
		}`;
HeightTranslation.id = "HeightTranslation";

export default HeightTranslation;