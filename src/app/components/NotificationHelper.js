/**
 * // https://developer.mozilla.org/zh-CN/docs/Web/API/notification
 */

class NotificationHelper
{
	_options = {
		dir: '', // 'auto', 'ltr', 'rtl'
		lang: '', //
		body: '', // content string
		tag: '', // ID
		icon: '' // icon url
	};

	constructor(title, options = {}) {
		this.instance = null;
		this.title = title;
		this.options = {...this._options, options};
	}

	init(title = this.title, options = this.options) {
		if (!("Notification" in window)) {
			alert("This browser does not support desktop notification");
		} else if (Notification.permission === "granted") {
			this.instance = new Notification(title, options);
		} else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function (permission) {
				// 如果用户同意，就可以向他们发送通知
				if (permission === "granted") {
					this.instance = new Notification(title, options);
				} else {
					// Nothing
				}
			});
		}
		return this.instance;
	}
}

// Notification.permission, static
// Notification.title
// Notification.dir
// Notification.lang
// Notification.body
// Notification.tag
// Notification.icon

// Notification.onclick = function () {}
// Notification.onerror = function () {}
// Notification.onshow = function () {}
// Notification.onclose = function () {}

export default NotificationHelper