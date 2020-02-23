/**!
 * ResponsiveIFrame.js v1.1.4.20200213
 */
/**
 * Webpack devDependency: babel-plugin-transform-runtime
 * Webpack babel-loader plugins: "transform-runtime"
 * Such as:
 * {
		test: /\.js$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ["env", "stage-1"],
				plugins: [
					"transform-runtime"
				]
			}
		}
 */

class ResponsiveIFrame {
	constructor(selector, heightChangeCallback) {
		this.heightChangeCallback = heightChangeCallback || (() => {});
		const iframeElements = document.querySelectorAll(selector);
		if (iframeElements && iframeElements.length) {
			this._listeners = [];
			[].forEach.call(iframeElements, (element) => {
				this._listeners.push(this._listen(element));
			});
		}
	}

	destroy() {
		if (this._listeners && this._listeners.length) {
			this._listeners.forEach(_listener => _listener());
			this._listeners = null;
		}
	}

	_listen(iframeElement) {
		const userAgent = navigator.userAgent;
		const isIE11 = /Trident.*rv[ :]*11\./.test(userAgent);
		const isEdge = userAgent.indexOf("Edge") > -1;
		const isFireFox = userAgent.toLowerCase().indexOf('firefox') > -1;

		const _listenChange = (hasChange) => {
			let iframeDocument = iframeElement.contentWindow.document;
			const {scrollHeight, offsetHeight} = iframeDocument.body;
			const {clientHeight: _clientHeight, scrollHeight: _scrollHeight, offsetHeight: _offsetHeight} = iframeDocument.documentElement;
			let height = 0;
			switch (hasChange) {
				case undefined:
					height = Math.max(scrollHeight, offsetHeight);
					break;
				case true:
					height = Math.max(scrollHeight, offsetHeight, _offsetHeight);
					break;
				case false:
					if (scrollHeight > _scrollHeight && isEdge) {
						height = Math.max(offsetHeight, _offsetHeight, _scrollHeight);
					} else {
						height = Math.max(scrollHeight, offsetHeight, _offsetHeight, _clientHeight, _scrollHeight);
					}
					break;
				default:
					height = 0;
			}

			let heightValue = height + 'px';
			if (iframeElement.getAttribute('height') !== heightValue || iframeElement.height !== heightValue) {
				iframeElement.height = heightValue;
				this.heightChangeCallback(height, iframeElement);
			}
		};
		const listenChange = () => {
			_listenChange();
			let iframeDocEl = iframeElement.contentWindow.document.documentElement;
			if (iframeDocEl.scrollHeight > iframeDocEl.clientHeight || isEdge) {
				_listenChange(true);
			}
			if (iframeDocEl.scrollHeight > iframeDocEl.clientHeight || isEdge) {
				_listenChange(false);
			}
		};
		const listenChangeThrottle = throttle(listenChange, 100);

		let hasListenLoadEvent = false;
		let observer = null;
		const observeIframe = () => {
			listenChange();
			let observeObj = iframeElement.contentWindow.document.body;
			if (isIE11 || isEdge || isFireFox) {
				observeObj.style.overflow = 'hidden';
			}
			observer = this._initObserve(observeObj, listenChange);
		};
		if (iframeElement.readyState !== "complete")
		{
			iframeElement.addEventListener('DOMContentLoaded', listenChange);
			iframeElement.addEventListener('load', observeIframe);
			hasListenLoadEvent = true;

			iframeElement.readyState === undefined && listenChange();
		}
		else
		{
			observeIframe();
		}
		window.addEventListener('resize', listenChangeThrottle);

		return () => {
			observer && observer.disconnect();
			if (hasListenLoadEvent) {
				iframeElement.removeEventListener('DOMContentLoaded', listenChangeThrottle);
				iframeElement.removeEventListener('load', observeIframe);
			}
			window.removeEventListener('resize', listenChangeThrottle);
		};
	}

	_initObserve(element, mutationCallback) {
		let _observer = null;
		if (window.MutationObserver) {
			_observer = new MutationObserver((mutationsList) => {
				for (let mutation of mutationsList) {
					let type = mutation.type;
					switch (type) {
						case "childList":
							if (mutation.addedNodes.length) {
								[].forEach.call(mutation.addedNodes, (node) => {
									if (node.tagName === 'IMG' || node.tagName === 'IFAME') {
										node.addEventListener('load', mutationCallback);
										node.addEventListener('error', mutationCallback);
									}
								});
							}
							// console.log("A child node has been added or removed.");
							break;
						case "attributes":
							// console.log(`The ${mutation.attributeName} attribute was modified.`);
							break;
						case "subtree":
							// console.log(`The subtree was modified.`);
							break;
						default:
							break;
					}
				}
				setTimeout(() => {
					mutationCallback();
				}, 10);
			});
			_observer.observe(element, {
				attributes: true,
				childList: true,
				subtree: true
			});
		}
		return _observer;
	}
}

function throttle(func, wait, options) {
	let context, args, result;
	let timeout = null;
	let previous = 0;
	if (!options) options = {};
	let later = function () {
		previous = options.leading === false ? 0 : Date.now();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};
	return function () {
		let now = Date.now();
		if (!previous && options.leading === false) previous = now;
		let remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
}

export default ResponsiveIFrame;