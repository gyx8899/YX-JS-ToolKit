/**
 * Capitalize the first word
 * @param string
 * @return {string}
 */
function titleCase(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

/***
 * escapeHTML
 * @param {string} str
 * @returns {void|string}
 */
function escapeHTML(str) {
	let map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};

	return str.replace(/[&<>"']/g, function (m) {
		return map[m];
	});
}

/**
 * Escape string for js parameter
 * @param str
 * @return {*}
 */
function escapeJS(str) {
	return escapeHTML(str.replace(/[\\]/g, '\\\\').replace(/["]/g, '\\\"').replace(/[']/g, "\\\'"));
}

export {
	titleCase,
	escapeHTML,
	escapeJS,
}