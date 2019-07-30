import {loadScriptWithPromise, loadCSSWithPromise, checkResourceLoaded} from "./Load";

function spop(options) {
	const commonPath = 'https://gyx8899.github.io/YX-WebThemeKit/';
	const spopScript = commonPath + 'theme-pop/spop/spop.min.js';
	const spopStyle = commonPath + 'theme-pop/spop/spop.min.css';
	const successCallback = () => {

	};
	let promiseArray = [];
	if (!checkResourceLoaded(spopScript)) {
		promiseArray.push(loadScriptWithPromise(spopScript));
	}
	if (!checkResourceLoaded(spopStyle)) {
		promiseArray.push(loadCSSWithPromise(spopStyle));
	}
	Promise.all(promiseArray)
			.then((results) => {
				if (results.every(item => !!item)) {
					spop(options);
				}
			});
}

export {
	spop
}