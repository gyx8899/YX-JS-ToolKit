/**
 * Initialize template with template/templateData and source data
 * @param {string} template
 * @param {object} templateData
 * @param {object} [sourceData], for external data process from templateData function
 * @returns {string}
 */
function initTemplate(template, templateData, sourceData) {
	let result = template;
	for (let key in templateData) {
		if (templateData.hasOwnProperty(key)) {
			let dataValue = templateData[key];
			// Process source data to required data if the templateData key's value is function
			if (typeof templateData[key] === 'function') {
				dataValue = templateData[key](sourceData);
			}
			result = result.replace(new RegExp('{{' + key + '}}', "g"), dataValue);
		}
	}
	return result;
}

/**
 * Render template with data and put it to target element
 * @param targetElement
 * @param template
 * @param sourceData
 * @param templateDataFn
 * @param [position], values=[update,beforebegin,afterbegin,beforeend,afterend], default update
 */
function renderTemplate(targetElement, template, sourceData, templateDataFn, position) {
	let resultHtml = '';
	for (let i = 0; i < sourceData.length; i++) {
		resultHtml += initTemplate(template, templateDataFn(sourceData[i]), sourceData[i]);
	}
	if (!position || position === 'update') {
		targetElement.innerHTML = resultHtml;
	} else {
		targetElement.insertAdjacentHTML(position, resultHtml);
	}
}

export {
	initTemplate,
	renderTemplate,
}