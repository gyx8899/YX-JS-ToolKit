/**
 * Javascript plugin: popupDismiss v4.4.20180411
 *
 */
(function () {
	var pluginName = 'popupDismiss',
		that = this,
		method = {
			isTap: undefined,

			popupEvent: function (event) {
				var popupTrigger = event.target;
				if (popupTrigger.getAttribute('data-toggle') !== pluginName)
				{
					popupTrigger = findParent(popupTrigger, '[data-toggle="' + pluginName + '"]');
				}
				var dataDismissScope = popupTrigger.getAttribute('data-dismiss-scope'),
					dismissScopes = getSelectorsElements(dataDismissScope),
					eventData = {
						type: event.type,
						namespace: popupTrigger.getAttribute('data-target'),
						popupTrigger: popupTrigger,
						popupTarget: document.querySelector(popupTrigger.getAttribute('data-target')),
						toggledClass: popupTrigger.getAttribute('data-toggle-class') || null, // Recommend: 'open'
						popupHandler: popupTrigger.getAttribute('data-popup-handler') || null,
						dismissHandler: popupTrigger.getAttribute('data-dismiss-handler') || null,
						dismissScopes: dismissScopes
					};

				if (eventData.popupTarget.getAttribute('data-isPopup') !== 'true')
				{
					method.monitorTap();
					if (eventData.toggledClass)
					{
						addClass(eventData.popupTrigger, eventData.toggledClass);
						addClass(eventData.popupTarget, eventData.toggledClass);
					}
					eventData.popupTarget.setAttribute('data-isPopup', 'true');
					eventData.dismissScopes.forEach(function (scope) {
						extendOnOff(scope).on(eventData.type + "." + eventData.namespace, function (newEvent) {
							if (event === newEvent)
								return;
							var newEventData = {
								type: eventData.type,
								namespace: eventData.namespace,
								dismissTrigger: newEvent.target,
								popupTrigger: eventData.popupTrigger,
								popupTarget: eventData.popupTarget,
								toggledClass: eventData.toggledClass,
								dismissHandler: eventData.dismissHandler,
								dismissScopes: eventData.dismissScopes
							};
							method.popupDismiss(newEventData, true);
						});
					});
					eventData.popupHandler !== null && window[eventData.popupHandler](eventData.popupTarget);
					method.setBodyCursorInIOS("pointer");
				}
				else
				{
					eventData.dismissTrigger = popupTrigger;
					method.popupDismiss(eventData);
				}
			},

			popupDismiss: function (eventData, isTrigger) {
				if (method.isTap === false)
					return;

				if (!isTrigger ||
						(!hasCloset(eventData.dismissTrigger, eventData.popupTrigger)
								&& method.isDismissTrigger(eventData.dismissTrigger, eventData.popupTarget)
								&& eventData.popupTarget.getAttribute('data-isPopup') === 'true'
						)
				)
				{
					if (eventData.toggledClass)
					{
						removeClass(eventData.popupTrigger, eventData.toggledClass);
						removeClass(eventData.popupTarget, eventData.toggledClass);
					}
					eventData.popupTarget.setAttribute('data-isPopup', 'false');
					eventData.dismissScopes.forEach(function (scope) {
						scope.off(eventData.type + "." + eventData.namespace, function () {
							method.popupDismiss(eventData, true);
						});
					});
					eventData.dismissHandler !== null && window[eventData.dismissHandler](eventData.popupTarget);

					method.setBodyCursorInIOS("default");
				}
			},

			monitorTap: function () {
				method.isTap = undefined;
				var start = {}, end = {};
				document.body.addEventListener('mousedown', mouseDown);
				document.body.addEventListener('mouseup', mouseUp);

				function mouseDown(event)
				{
					method.isTap = false;
					start.x = event.pageX;
					start.y = event.pageY;
				}

				function mouseUp(event)
				{
					end.x = event.pageX;
					end.y = event.pageY;

					if (Math.abs(end.x - start.x) < 5 && Math.abs(end.y - start.y) < 5)
					{
						method.isTap = true;
						document.body.removeEventListener('mousedown', mouseDown);
						document.body.removeEventListener('mouseup', mouseUp);
					}
				}
			},

			// Default: all be dismiss trigger(return true);
			// Check click point ($child) has '[data-popup-dismiss="false"]'('[data-popup-dismiss="true"]') or not;
			isDismissTrigger: function (child, parent) {
				if (hasCloset(child, parent))
				{
					var dataPopupDismiss = child.getAttribute('data-popup-dismiss'),
							parentDismissFalse;
					if (dataPopupDismiss === 'false' || dataPopupDismiss === 'true')
					{
						return dataPopupDismiss === 'true';
					}
					else if (parentDismissFalse = findParent(child, '[data-popup-dismiss="false"]'))
					{
						var parentDismissTrue = findParent(child, '[data-popup-dismiss="true"]');
						return parentDismissTrue ? hasCloset(parentDismissTrue, parentDismissFalse) : false;
					}
				}
				return true;
			},

			// Fix issue : In iOS device, the dismiss function could not be triggered;
			setBodyCursorInIOS: function (val) {
				if (/iPhone|iPad|iPod/i.test(navigator.userAgent))
				{
					var body = document.querySelector('body'),
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
		};

	// Utils
	function addClass(el, className)
	{
		if (el.classList)
			el.classList.add(className);
		else
			el.className += ' ' + className;
	}

	function removeClass(el, className)
	{
		if (el.classList)
			el.classList.remove(className);
		else
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}

	function findParent(element, selector)
	{
		while ((element = element.parentElement) && !matches(element, selector)) {}
		return element;
	}

	function matches(el, selector)
	{
		return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
	}

	function hasCloset(el, parentElement)
	{
		if (el === parentElement)
		{
			return true;
		}
		if (parentElement === undefined)
		{
			return false;
		}

		var parents = [], p = el.parentNode;
		while (p !== parentElement && p.parentNode)
		{
			var o = p;
			parents.push(o);
			p = o.parentNode;
		}
		return p === parentElement;
	}

	function convertNodeListToArray(nodeList)
	{
		var resultArray = [];
		for (var i = 0, l = nodeList.length; i < l; i++)
		{
			resultArray[i] = nodeList[i];
		}
		return resultArray;
	}

	function getSelectorsElements(selectorString)
	{
		if (!selectorString || (selectorString && selectorString.trim() === ''))
		{
			return [document];
		}
		var selectorsElements = [],
				selectorsArray = selectorString.split(',').map(function (selectorStringItem) {
					return selectorStringItem.trim();
				});
		selectorsArray = uniqueArray(selectorsArray);
		for (var i = 0, l = selectorsArray.length; i < l; i++)
		{
			if (selectorsArray[i] === 'document')
			{
				selectorsElements.push(document);
			}
			else
			{
				var scopeNodeList = convertNodeListToArray(document.querySelectorAll(selectorsArray[i]));
				selectorsElements = selectorsElements.concat(scopeNodeList);
			}
		}
		return selectorsElements;
	}

	function uniqueArray(sourceArray)
	{
		var resultArray = [], hash = {};
		for (var i = 0, elem, l = sourceArray.length; i < l && (elem = sourceArray[i]) !== null; i++)
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
	function extendOnOff(el)
	{
		if (el.length === 0)
			return null;
		var events = {
			on: function (event, callback, opts) {
				if (!this.namespaces) // save the namespaces on the DOM element itself
					this.namespaces = {};

				this.namespaces[event] = callback;
				var options = opts || false;

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

	function delegate(element, eventName, selector, handler)
	{
		element.addEventListener(eventName, listenerHandler);

		function listenerHandler(event)
		{
			var target = event.target,
					popupDismissElement = null;
			if (target.getAttribute('data-toggle') === pluginName)
			{
				popupDismissElement = target;
			}
			else
			{
				popupDismissElement = findParent(target, selector);
			}
			popupDismissElement && handler.call(popupDismissElement, event);
		}
	}

	function getElements(elements)
	{
		var resultElement = [];
		if (elements.jquery)
		{
			resultElement = elements.length > 1 ? elements.get() : (elements.length === 0 ? [] : [elements[0]]);
		}
		else if (elements instanceof window.NodeList || elements instanceof NodeList || elements instanceof HTMLCollection)
		{
			resultElement = Array.prototype.slice.call(elements);
		}
		else if (Array.isArray(elements))
		{
			resultElement = elements;
		}
		else if (elements.nodeType)
		{
			resultElement = [elements];
		}
		return resultElement;
	}

	this.popupDismissDelegate = function (elements) {
		delegate(elements, 'click', '[data-toggle="' + pluginName + '"]', method.popupEvent);
	};

	this.popupDismiss = function (elements) {
		if (elements !== undefined)
		{
			var allElements = getElements(elements);
			allElements.map(function (element) {
				element.addEventListener("click", method.popupEvent);
			});
		}
		else
		{
			that.popupDismissDelegate(document.body);
		}
	};
})();