/**
 * Check browser language setting which has zh[-CN/TW/HK]
 * @return {boolean}
 */
function isZHLanguage() {
	let browserLanguage = navigator.languages ? navigator.languages : navigator.browserLanguage;
	return !!browserLanguage && browserLanguage.some(language => {
		return language.indexOf('zh') === 0;
	});
}

export {
	isZHLanguage,
}