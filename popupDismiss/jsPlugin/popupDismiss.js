/**!
 * Javascript plugin: popupDismiss v5.0.20181105
 *
 */
class Util {
	// Utils
	static addClass(el, className)
	{
		if (el.classList)
			el.classList.add(className);
		else
			el.className += ' ' + className;
	}

	static removeClass(el, className)
	{
		if (el.classList)
			el.classList.remove(className);
		else
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}

	static findParent(element, selector)
	{
		let matches = (el, selector) => {
			return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
		};
		while ((element = element.parentElement) && !matches(element, selector))
		{
		}
		return element;
	}

	static hasClosest(el, parentElement)
	{
		if (el === parentElement)
		{
			return true;
		}
		if (parentElement === undefined)
		{
			return false;
		}

		let parents = [], p = el.parentNode;
		while (p !== parentElement && p.parentNode)
		{
			let o = p;
			parents.push(o);
			p = o.parentNode;
		}
		return p === parentElement;
	}

	static getSelectorsElements(selectorString)
	{
		if (!selectorString || (selectorString && selectorString.trim() === ''))
		{
			return [document];
		}
		let selectorsElements = [],
				selectorsArray = selectorString.split(',').map((selectorStringItem) => {
					return selectorStringItem.trim();
				});
		selectorsArray = Util.uniqueArray(selectorsArray);
		for (let i = 0, l = selectorsArray.length; i < l; i++)
		{
			if (selectorsArray[i] === 'document')
			{
				selectorsElements.push(document);
			}
			else
			{
				let scopeNodeList = [].slice.call(document.querySelectorAll(selectorsArray[i]));
				selectorsElements = selectorsElements.concat(scopeNodeList);
			}
		}
		return selectorsElements;
	}

	static uniqueArray(sourceArray)
	{
		let resultArray = [], hash = {};
		for (let i = 0, elem, l = sourceArray.length; i < l && (elem = sourceArray[i]) !== null; i++)
		{
			if (!hash[elem])
			{
				resultArray.push(elem);
				hash[elem] = true;
			}
		}
		return resultArray;
	}

	//Extend on/off methods
	static extendOnOff(el)
	{
		if (el.length === 0)
			return null;
		let events = {
			on: function (event, callback, opts) {
				if (!this.namespaces) // save the namespaces on the DOM element itself
					this.namespaces = {};

				this.namespaces[event] = callback;
				let options = opts || false;

				this.addEventListener(event.split('.')[0], callback, options);
				return this;
			},
			off: function (event) {
				this.removeEventListener(event.split('.')[0], this.namespaces[event]);
				delete this.namespaces[event];
				return this;
			}
		};

		// Extend the DOM with these above custom methods
		if (!el.isExtendOnOff)
		{
			el.on = Element.prototype.on = events.on;
			el.off = Element.prototype.off = events.off;
			el.isExtendOnOff = true;
		}
		return el;
	}

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

	static getUrlQueryParams(url)
	{
		let query = {},
				searchStr = url ? (url.indexOf('?') !== -1 ? url.split('?')[1] : '') : window.location.search.substring(1),
				queryParams = searchStr.split("&");
		for (let i = 0; i < queryParams.length; i++)
		{
			let queryParam = queryParams[i].split("=");
			if (queryParam.length > 1)
			{
				query[queryParam[0]] = queryParam[1];
			}
		}
		return query;
	}

	static getCurrentScript(scriptName)
	{
		let allScripts = document.getElementsByTagName("script");

		if (scriptName)
		{
			for (let i = 0; i < allScripts.length; i++)
			{
				let script = allScripts.item(i);

				if (script.src && script.src.match(scriptName))
				{
					return script;
				}
			}
		}
		else
		{
			if (document.currentScript)
			{
				return document.currentScript;
			}
			else
			{
				return allScripts[allScripts.length - 1];
			}
		}
		return null;
	}
}

class PopupDismiss {
	constructor(elements, isDelegated = false)
	{
		this.name = 'popupDismiss';
		this.isTap = undefined;
		this.attr = {
			dataToggle: 'data-toggle',
			dataTarget: 'data-target',
			dataDismissScope: 'data-dismiss-scope',
			dataToggleClass: 'data-toggle-class',
			dataPopupHandler: 'data-popup-handler',
			dataDismissHandler: 'data-dismiss-handler',
			dataIsPopup: 'data-isPopup',
			dataPopupDismiss: 'data-popup-dismiss',
		};
		this.popupEvent = this.popupEvent.bind(this);

		if (elements === undefined)
		{
			this.initDelegate(document.body);
		}
		else
		{
			this.elements = Util.getElements(elements);
			this.isDelegated = isDelegated || (elements === undefined);

			this.init = this.isDelegated ? this.initDelegate : this.initElement;
			this.elements.forEach(element => this.init(element));
		}
	}

	initElement(element)
	{
		if (element.getAttribute(this.attr.dataToggle) === this.name && element.getAttribute(`data-${this.name}`) !== this.name)
		{
			element.setAttribute(`data-${this.name}`, this.name);
			element.addEventListener("click", this.popupEvent);
		}
	}

	initDelegate(element)
	{
		this.delegate(element, 'click', `[${this.attr.dataToggle}="${this.name}"]`, this.popupEvent);
	}

	delegate(element, eventName, selector, handler)
	{
		element.addEventListener(eventName, (event) => {
			let target = event.target,
					popupDismissElement = null;
			if (target.getAttribute(this.attr.dataToggle) === this.name)
			{
				popupDismissElement = target;
			}
			else
			{
				popupDismissElement = Util.findParent(target, selector);
			}
			popupDismissElement && handler.call(popupDismissElement, event);
		});
	}

	popupTarget(dataTarget, triggerElement)
	{
		let targetElement = null,
				parentParam = 'parent ';
		if (dataTarget.indexOf(parentParam) === 0)
		{
			targetElement = triggerElement.parentNode.querySelector(dataTarget.split(parentParam.trim())[1]);
			if (dataTarget.split(parentParam)[1].indexOf(parentParam) === 0)
			{
				targetElement = this.popupTarget(dataTarget.split(parentParam)[1], triggerElement);
			}
		}
		else
		{
			targetElement = document.querySelector(dataTarget);
		}
		return targetElement;
	}

	popupEvent(event)
	{
		let popupTrigger = event.target,
				that = this;
		if (popupTrigger.getAttribute(this.attr.dataToggle) !== this.name)
		{
			popupTrigger = Util.findParent(popupTrigger, `[${this.attr.dataToggle}="${this.name}"]`);
		}
		let dataDismissScope = popupTrigger.getAttribute(this.attr.dataDismissScope),
				dismissScopes = Util.getSelectorsElements(dataDismissScope),
				eventData = {
					type: event.type,
					namespace: popupTrigger.getAttribute(this.attr.dataTarget) + '-' + new Date().getTime(),
					popupTrigger: popupTrigger,
					popupTarget: this.popupTarget(popupTrigger.getAttribute(this.attr.dataTarget), popupTrigger),
					toggledClass: popupTrigger.getAttribute(this.attr.dataToggleClass) || null, // Recommend: 'open'
					popupHandler: popupTrigger.getAttribute(this.attr.dataPopupHandler) || null,
					dismissHandler: popupTrigger.getAttribute(this.attr.dataDismissHandler) || null,
					dismissScopes: dismissScopes
				};

		if (eventData.popupTarget.getAttribute(this.attr.dataIsPopup) !== 'true')
		{
			this.monitorTap();
			if (eventData.toggledClass)
			{
				Util.addClass(eventData.popupTrigger, eventData.toggledClass);
				Util.addClass(eventData.popupTarget, eventData.toggledClass);
			}
			eventData.popupTarget.setAttribute(this.attr.dataIsPopup, 'true');
			eventData.dismissScopes.forEach((scope) => {
				Util.extendOnOff(scope)
						.on(`${eventData.type}.${eventData.namespace}`, (newEvent) => {
							if (event === newEvent)
								return;
							let newEventData = {
								type: eventData.type,
								namespace: eventData.namespace,
								dismissTrigger: newEvent.target,
								popupTrigger: eventData.popupTrigger,
								popupTarget: eventData.popupTarget,
								toggledClass: eventData.toggledClass,
								dismissHandler: eventData.dismissHandler,
								dismissScopes: eventData.dismissScopes
							};
							that.dismiss(newEventData, true);
						});
			});
			eventData.popupHandler !== null && window[eventData.popupHandler](eventData.popupTarget);
			PopupDismiss.setBodyCursorInIOS("pointer");
		}
		else
		{
			eventData.dismissTrigger = popupTrigger;
			that.dismiss(eventData);
		}
	}

	dismiss(eventData, isTrigger)
	{
		if (this.isTap === false)
			return;

		if (!isTrigger ||
				(!Util.hasClosest(eventData.dismissTrigger, eventData.popupTrigger)
						&& this.isDismissTrigger(eventData.dismissTrigger, eventData.popupTarget)
						&& eventData.popupTarget.getAttribute(this.attr.dataIsPopup) === 'true'
				)
		)
		{
			if (eventData.toggledClass)
			{
				Util.removeClass(eventData.popupTrigger, eventData.toggledClass);
				Util.removeClass(eventData.popupTarget, eventData.toggledClass);
			}
			eventData.popupTarget.setAttribute(this.attr.dataIsPopup, 'false');
			eventData.dismissScopes.forEach((scope) => {
				scope.off(`${eventData.type}.${eventData.namespace}`, () => this.dismiss(eventData, true));
			});
			eventData.dismissHandler !== null && window[eventData.dismissHandler](eventData.popupTarget);

			PopupDismiss.setBodyCursorInIOS("default");
		}
	}

	monitorTap()
	{
		let that = this,
				start = {},
				end = {};
		this.isTap = undefined;

		document.body.addEventListener('mousedown', mouseDown);
		document.body.addEventListener('mouseup', mouseUp);

		function mouseDown(event)
		{
			that.isTap = false;
			start.x = event.pageX;
			start.y = event.pageY;
		}

		function mouseUp(event)
		{
			end.x = event.pageX;
			end.y = event.pageY;

			if (Math.abs(end.x - start.x) < 5 && Math.abs(end.y - start.y) < 5)
			{
				that.isTap = true;
				document.body.removeEventListener('mousedown', mouseDown);
				document.body.removeEventListener('mouseup', mouseUp);
			}
		}
	}

	// Default: all be dismiss trigger(return true);
	// Check click point ($child) has '[data-popup-dismiss="false"]'('[data-popup-dismiss="true"]') or not;
	isDismissTrigger(child, parent)
	{
		if (Util.hasClosest(child, parent))
		{
			let dataPopupDismiss = child.getAttribute(this.attr.dataPopupDismiss),
					parentDismissFalse;
			if (dataPopupDismiss === 'false' || dataPopupDismiss === 'true')
			{
				return dataPopupDismiss === 'true';
			}
			else if (parentDismissFalse = Util.findParent(child, `[${this.attr.dataPopupDismiss}="false"]`))
			{
				let parentDismissTrue = Util.findParent(child, `[${this.attr.dataPopupDismiss}="true"]`);
				return parentDismissTrue ? Util.hasClosest(parentDismissTrue, parentDismissFalse) : false;
			}
		}
		return true;
	}

	// Fix issue : In iOS device, the dismiss function could not be triggered;
	static setBodyCursorInIOS(val)
	{
		if (/iPhone|iPad|iPod/i.test(navigator.userAgent))
		{
			let body = document.querySelector('body'),
					popupCount = parseInt(body.getAttribute('popup-count') || '0', 10);
			if (val === 'pointer')
			{
				++popupCount === 1 && (body.style.cursor = val);
			}
			else if (val === 'default')
			{
				--popupCount && (body.style.cursor = val);
			}
			body.setAttribute('popup-count', popupCount.toString());
		}
	}
}

/**
 * Auto init plugin if plugin.js?init=auto
 */
(function () {
	let pluginFileName = 'popupDismiss',
			currentScript = Util.getCurrentScript(pluginFileName);
	if (!!currentScript)
	{
		let scriptParamInit = Util.getUrlQueryParams(currentScript['src'])['init'],
				initPopupDismiss = () => new PopupDismiss();
		if (scriptParamInit === 'auto')
		{
			if (document.readyState !== "complete")
			{
				document.addEventListener('DOMContentLoaded', initPopupDismiss);
			}
			else
			{
				initPopupDismiss();
			}
		}
	}
	else
	{
		console.log('PopupDismiss initialized failed if you import with "popupDismiss.min.js?init=auto"!');
	}
})();

export default PopupDismiss