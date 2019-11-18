import {addClass, removeClass} from "./ClassName.js";
import {insertStyleToHead} from "../util/Element.js";

class HeightTranslation {
	style = `
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
	id = "HeightTranslation";

	constructor(element, isReady = true, innerHTML) {
		if (!element) {
			return;
		}
		this.element = element;
		this.onClass = 'on';
		this.componentClass = 'height-translation';

		if (!!innerHTML) {
			this.element.innerHTML = innerHTML;
		}

		if (jQuery) {
			this.element.style.maxHeight = 'auto';
			this.element.style.display = 'none';
		} else {
			addClass(this.element, this.componentClass);
			insertStyleToHead(this.style, this.id);
			!!isReady && this.element.style.setProperty('--max-height', `${this.element.scrollHeight}px`);
		}
	}

	ready() {
		if (!jQuery) {
			this.element.style.setProperty('--max-height', `${this.element.scrollHeight + this.element.style.paddingTop + this.element.style.paddingBottom}px`);
		}
	}

	on() {
		if (jQuery) {
			this.on = () => {
				$(this.element).slideToggle();
			};
		} else {
			this.on = () => addClass(this.element, this.onClass);
		}
		this.on();
	}

	off() {
		if (jQuery) {
			this.off = () => {
				$(this.element).slideToggle();
			};
		} else {
			this.off = () => removeClass(this.element, this.onClass);
		}
		this.off();
	}
}

export default HeightTranslation;