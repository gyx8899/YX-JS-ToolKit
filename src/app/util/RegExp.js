/***
 * regExpG
 * @param expStr
 * @returns {RegExp}
 */
function regExpG(expStr) {
	return new RegExp(expStr, "g");
}

/***
 * isURL
 * @param url
 * @returns {boolean}
 */
function isURL(url) {
	let expression = /(((http|ftp|https):\/\/)?([\w\-_]+(\.(?!(\d)+)[\w\-_]+))+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?)|(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)/g;
	return (new RegExp(expression)).test(url);
}

export {
	regExpG,
	isURL,
}