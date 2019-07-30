/**
 * delegate element event
 * @param element
 * @param eventName
 * @param selector
 * @param handler
 */
function delegate(element, eventName, selector, handler) {
	let possibleTargets = element.querySelectorAll(selector);
	element.addEventListener(eventName, listenerHandler);

	function listenerHandler(event) {
		let target = event.target;

		for (let i = 0, l = possibleTargets.length; i < l; i++) {
			let el = target,
					p = possibleTargets[i];

			while (el && el !== element) {
				if (el === p) {
					return handler.call(p, event);
				}
				el = el.parentNode;
			}
		}
	}
}

/**
 * bindClickIgnoreDrag
 * @param elements
 * @param callback
 * @param isBind
 */
function bindClickIgnoreDrag(elements, callback, isBind) {
	let eventListenerName = isBind !== false ? 'on' : 'off',
			mouseDownX = 0,
			mouseDownY = 0;

	[].forEach.call(elements, function (element) {
		extendOnOff(element)[eventListenerName]('mousedown', mouseDownHandler);
	});

	function mouseDownHandler(event) {
		mouseDownX = event.pageX;
		mouseDownY = event.pageY;
		event.target.addEventListener('mouseup', mouseUpMoveHandler);
		event.target.addEventListener('mousemove', mouseUpMoveHandler);
	}

	function mouseUpMoveHandler(event) {
		if (event.type === 'mouseup' && event.which <= 1) //only for left key
		{
			callback(event);
		} else if (event.type === 'mousemove' && event.pageX === mouseDownX && event.pageY === mouseDownY) {
			return;
		}
		event.target.removeEventListener('mouseup', mouseUpMoveHandler);
		event.target.removeEventListener('mousemove', mouseUpMoveHandler);
	}
}

/**
 * triggerEvent
 * @param element
 * @param eventName
 * @param data
 */
function triggerEvent(element, eventName, data) {
	let event = null;
	if (CustomEvent) {
		event = new CustomEvent(eventName, {detail: data});
	} else {
		event = document.createEvent('CustomEvent');
		event.initCustomEvent(eventName, true, true, data);
	}

	element.dispatchEvent(event);
}

/**
 * Extend on/off methods
 * @param el: element
 * @returns {*}
 */
function extendOnOff(el) {
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
	if (!el.isExtendOnOff) {
		el.on = Element.prototype.on = events.on;
		el.off = Element.prototype.off = events.off;
		el.isExtendOnOff = true;
	}
	return el;
}

/**
 * mouseTouchTrack
 * @param element
 * @param infoCallback
 */
function mouseTouchTrack(element, infoCallback) {
	let touchStartBeginTime = 0,
			lastEventType = '';

	element.onclick = trackEvent;
	element.ontouchstart = trackEvent;
	element.ontouchend = trackEvent;
	element.ontouchmove = trackEvent;
	element.onmousedown = trackEvent;
	element.onmouseenter = trackEvent;
	element.onmouseleave = trackEvent;
	element.onmousemove = trackEvent;
	element.onmouseout = trackEvent;
	element.onmouseover = trackEvent;
	element.onmouseup = trackEvent;

	function trackEvent(event) {
		if (event.type === "touchstart") {
			touchStartBeginTime = Date.now();
		}
		if (event.type !== lastEventType) {
			infoCallback = infoCallback ? infoCallback : console.log;
			infoCallback(arguments, event.type, Date.now() - touchStartBeginTime);

			lastEventType = event.type;
		}
	}
}

function notification(option, spopOption) {
	let showNotification = (option) => {
		if (option.registration && option.registration.showNotification) {
			option.registration.showNotification(option.title, option);
		} else {
			let noti = new Notification(option.title, option);
			let autoclose = option.autoclose;
			if (autoclose !== undefined) {
				noti.onshow = () => {
					setTimeout(noti.close.bind(noti), autoclose);
				}
			}
		}
	};
	if (!("Notification" in window)) {
		YX.Plugin.spop(spopOption);
	} else if (Notification.permission === "granted") {
		showNotification(option);
	} else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function (permission) {
			if (permission === "granted") {
				showNotification(option);
			} else {
				YX.Plugin.spop(spopOption);
			}
		});
	} else {
		YX.Plugin.spop(spopOption);
	}
}

export {
	delegate,
	bindClickIgnoreDrag,
	triggerEvent,
	extendOnOff,
	mouseTouchTrack,
	notification,
}