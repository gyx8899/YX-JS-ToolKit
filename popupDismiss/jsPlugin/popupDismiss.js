/**
 * Javascript plugin: popupDismiss v4
 *
 */
(function () {
	var pluginName = 'popupDismiss';
	var documentExtend = null;
	var method = {
		isTap: undefined,

		popupEvent: function (event) {
			var popupTrigger = event.target;
			if (popupTrigger.getAttribute('data-toggle') !== pluginName)
			{
				popupTrigger = method.findAncestor(popupTrigger, '[data-toggle="' + pluginName + '"]');
			}
			var dataDismissScope = popupTrigger.getAttribute('data-dismiss-scope'),
				dismissScopes = getScopeElementArray(dataDismissScope),
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
					method.addClass(eventData.popupTrigger, eventData.toggledClass);
					method.addClass(eventData.popupTarget, eventData.toggledClass);
				}
				eventData.popupTarget.setAttribute('data-isPopup', 'true');
				eventData.dismissScopes.forEach(function (scope) {
					scope.on(eventData.type + "." + eventData.namespace, function (newEvent) {
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
						newEvent.stopPropagation();
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
			function getScopeElementArray(scopeSelectors)
			{
				if (!scopeSelectors)
				{
					return [documentExtend];
				}
				var scopeElements = [],
					scopeSelectorArray = scopeSelectors.split(',');
				for (var i = 0, l = scopeSelectorArray.length; i < l; i++)
				{
					var trimmedScopeSelector = scopeSelectorArray[i].trim();
					if (trimmedScopeSelector === 'document')
					{
						scopeElements.push(documentExtend);
					}
					else
					{
						var scopeNodeList = method.convertNodeListToArray(document.querySelectorAll(scopeSelectorArray[i]));
						scopeNodeList.map(function (t) {
							method.extendOnOff(t);
						});
						scopeElements = scopeElements.concat(scopeNodeList);
					}
				}
				return scopeElements;
			}
		},

		popupDismiss: function (eventData, isTrigger) {
			if (method.isTap === false)
				return;

			if (!isTrigger ||
					(!method.hasCloset(eventData.dismissTrigger, eventData.popupTrigger)
							&& method.isDismissTrigger(eventData.dismissTrigger, eventData.popupTarget)
							&& eventData.popupTarget.getAttribute('data-isPopup') === 'true'
					)
			)
			{
				if (eventData.toggledClass)
				{
					method.removeClass(eventData.popupTrigger, eventData.toggledClass);
					method.removeClass(eventData.popupTarget, eventData.toggledClass);
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
			if (method.hasCloset(child, parent))
			{
				var parentDismissTrue = method.findAncestor(child, '[data-popup-dismiss="true"]'),
						parentDismissFalse = method.findAncestor(child, '[data-popup-dismiss="false"]');
				if (child.getAttribute('data-popup-dismiss') === 'false')
				{
					return false;
				}
				else if (child.getAttribute('data-popup-dismiss') === 'true')
				{
					return true;
				}
				else if (parentDismissFalse)
				{
					return parentDismissTrue ? method.hasCloset(parentDismissTrue, parentDismissFalse) : false;
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
		},

		findAncestor: function (el, sel) {
			while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el, sel))) ;
			return el;
		},

		convertNodeListToArray: function (nodeList)
		{
			var resultArray = [];
			for (var i = 0, l = nodeList.length; i < l; i++)
			{
				resultArray[i] = nodeList[i];
			}
			return resultArray;
		},

		hasCloset: function (el, parentElement) {
			if (el === parentElement)
			{
				return true;
			}
			// If no parentSelector defined will bubble up all the way to *document*
			if (parentElement === undefined)
			{
				parentElement = document;
			}

			var parents = [];
			var p = el.parentNode;

			while (p !== parentElement && p.parentNode)
			{
				var o = p;
				parents.push(o);
				p = o.parentNode;
			}

			return p === parentElement;
		},

		on: function (elSelector, eventName, selector, fn) {
			var element = document.querySelector(elSelector);
			element.addEventListener(eventName, function (event) {
				var possibleTargets = element.querySelectorAll(selector);
				var target = event.target;

				for (var i = 0, l = possibleTargets.length; i < l; i++)
				{
					var el = target;
					var p = possibleTargets[i];

					while (el && el !== element)
					{
						if (el === p)
						{
							return fn.call(p, event);
						}

						el = el.parentNode;
					}
				}
			});
		},

		addClass: function (el, className) {
			if (el.classList)
				el.classList.add(className);
			else
				el.className += ' ' + className;
		},

		removeClass: function (el, className) {
			if (el.classList)
				el.classList.remove(className);
			else
				el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		},

		//Extend on/off methods
		extendOnOff: function (el) {
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
			el.on = Element.prototype.on = events.on;
			el.off = Element.prototype.off = events.off;
			return el;
		}
	};

	documentExtend = method.extendOnOff(document);

	this.popupDismiss = function (elements) {
		if (elements)
		{
			if (elements.jquery)
			{
				elements = elements.length > 1 ? elements.get() : elements[0];
			}
			if (NodeList.prototype.isPrototypeOf(elements) || Array.isArray(elements))
			{
				for (var i = 0, l = elements.length; i < l; i++)
				{
					elements[i].addEventListener("click", method.popupEvent);
				}
			}
			else if (elements.nodeType)
			{
				elements.addEventListener("click", method.popupEvent);
			}
		}
		else
		{
			method.on('body', 'click', '[data-toggle="' + pluginName + '"]', method.popupEvent);
		}
	};
})();