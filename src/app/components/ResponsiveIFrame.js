/**!
 * ResponsiveIFrame.js v1.0.0.20191025
 */

class ResponsiveIFrame {
	constructor() {
		this.name = 'ResponsiveIFrame';
		this.iframeIds = {};
		this.listener = null;

		this.iframeId = getURLParamByName(this.name);
		if (this.iframeId) {
			this.post();
		}
	}

	listen(iframeId) {
		if (!Object.keys(this.iframeIds).length) {
			this.listener = this._listen();
		}
		this.iframeIds[iframeId] = document.getElementById(iframeId);

		return () => {
			delete this.iframeIds[iframeId];

			if (!Object.keys(this.iframeIds).length) {
				this.listener();
			}
		}
	}

	_listen() {
		const msgEvent = (event) => {
			let data = event.data;
			if (typeof data === 'object') {
				let {key, id, height} = data;
				if (key === this.name && this.iframeIds[id]) {
					this.iframeIds[id].height = height + 'px';
				}
			}
		};
		window.addEventListener('message', msgEvent);

		return () => {
			window.removeEventListener('message', msgEvent);
		};
	}

	post() {
		const _postMessage = (hasChange) => {
			const body = document.body,
					html = document.documentElement,
					height = hasChange ? Math.max(body.scrollHeight, body.offsetHeight, html.offsetHeight) : Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
			const message = {
				key: this.name,
				id: this.iframeId,
				height
			};
			parent.postMessage(message);
		};
		const postMessage = throttle(_postMessage, 100);
		let observer = null;
		if (window.MutationObserver) {
			observer = new MutationObserver((mutationsList) => {
				for (let mutation of mutationsList) {
					let type = mutation.type;
					switch (type) {
						case "childList":
							if (mutation.addedNodes.length) {
								[].forEach.call(mutation.addedNodes, (node) => {
									if (node.tagName === 'IMG' || node.tagName === 'IFAME') {
										node.addEventListener('load', _postMessage);
										node.addEventListener('error', _postMessage);
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
					_postMessage(true);
				}, 100);
			});
			observer.observe(document.body, {
				attributes: true,
				childList: true,
				subtree: true
			});
		}
		window.addEventListener('load', postMessage);
		window.addEventListener('resize', postMessage);

		return () => {
			observer && observer.disconnect();
			window.removeEventListener('load', postMessage);
			window.removeEventListener('resize', postMessage);
		};
	}
}

function getURLParamByName(name, url = location.search) {
	if (!!URLSearchParams) {
		return new URLSearchParams(url).get(name);
	} else if (!!URL) {
		return new URL(url).searchParams.get(name);
	} else {
		const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		// 获取地址栏的查询参数字符串
		const search = url.indexOf('http') !== -1 ? url.split('?')[1] : url;
		if (search) {
			const r = decodeURIComponent(search.split('#')[0]).substring(1).match(reg);
			if (r) {
				return unescape(r[2]);
			}
		}
		return '';
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