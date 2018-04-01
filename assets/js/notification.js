'use strict';

// https://developer.mozilla.org/zh-CN/docs/Web/API/notification

var title = "notification Title";
var options = {
	dir: '', // 'auto', 'ltr', 'rtl'
	lang: '', //
	body: '', // content string
	tag: '', // ID
	icon: '' // icon url
};
// Notification.permission
// Notification.title
// Notification.dir
// Notification.lang
// Notification.body
// Notification.tag
// Notification.icon

// Notification.onclick = function ()
// {
//
// };
// Notification.onerror = EventListener
// Notification.onerror = function ()
// {
//
// };
// Notification.onshow = function ()
// {
//
// };
// Notification.onclose = function ()
// {
//
// };

var notification = new Notification(title, options);

function notifyMe() {
	// 先检查浏览器是否支持
	if (!("Notification" in window)) {
		alert("This browser does not support desktop notification");
	}

	// 检查用户是否同意接受通知
	else if (Notification.permission === "granted") {
			// If it's okay let's create a notification
			var _notification = new Notification("Hi there!");
		}

		// 否则我们需要向用户获取权限
		else if (Notification.permission !== 'denied') {
				Notification.requestPermission(function (permission) {
					// 如果用户同意，就可以向他们发送通知
					if (permission === "granted") {
						var _notification2 = new Notification("Hi there!");
					}
				});
			}

	// 最后，如果执行到这里，说明用户已经拒绝对相关通知进行授权
	// 出于尊重，我们不应该再打扰他们了
}

//# sourceMappingURL=notification.js.map