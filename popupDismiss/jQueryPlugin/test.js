(function () {
	/**
	 * Case1:
	 * data-toggle="popupDismiss" data-target="#demo1List" data-toggle-class="open"
	 * */
	QUnit.module("popupDismiss1");
	QUnit.test("Demo1-Base-Outer1", function (assert) {
		var outerElement = document.getElementById('demos');
		test('#demo1List', [outerElement], verifyCallback);
		test('#demo2List', [outerElement], verifyCallback);
		test('#demo3List', [outerElement], verifyCallback);
		test('#demo4List', [outerElement, document.querySelector('.demo4-scope')], verifyCallback);

		function verifyCallback(isSuccess, info)
		{
			assert.ok(isSuccess, info);
		}
	});

	function test(targetSelector, outerTestElements, callback)
	{
		var sourceElement = document.querySelector('[data-target="' + targetSelector + '"]'),
				targetElement = document.querySelector(targetSelector),
				clickedElements = [sourceElement].concat(outerTestElements);

		for (var i = 0, l = clickedElements.length; i < l; i++)
		{
			testTargetCase(sourceElement, targetElement, clickedElements[i], callback);
		}

		if (targetElement && targetElement.children)
		{
			for (i = 0, l = targetElement.children.length; i < l; i++)
			{
				testTargetCase(sourceElement, targetElement, targetElement.children[i], callback, true);
			}
		}
	}

	function testTargetCase(sourceElement, targetElement, clickedElement, callback, isSubItem)
	{
		if (!isDisplay(targetElement))
		{
			triggerClick(sourceElement);

			// Test element
			if (isDisplay(targetElement))
			{
				triggerClick(clickedElement);

				if (!!isSubItem && sourceElement !== clickedElement &&
						((clickedElement.getAttribute('data-toggle') === 'popupDismiss') || clickedElement.querySelector('[data-toggle="popupDismiss"]')))
				{
					test(clickedElement.querySelector('[data-toggle="popupDismiss"]').getAttribute('data-target'), [], callback);
				}
				else
				{
					verifyPopupDismiss(sourceElement, targetElement, clickedElement, callback);
				}
			}
		}
	}

	function verifyPopupDismiss(sourceElement, targetElement, clickedElement, callback)
	{
		var isDismissScope = sourceElement.getAttribute('data-dismiss-scope'),
				isDismiss = false,
				isTargetDisplayed = isDisplay(targetElement),
				clickedElementTag = clickedElement.tagName + ' ' + (clickedElement.childNodes.length === 1 ? clickedElement.innerText : clickedElement.classList);
		if (sourceElement === clickedElement ||
				(!!isDismissScope && (hasCloset(clickedElement, document.querySelector(isDismissScope)) || hasCloset(clickedElement, targetElement))) ||
				!isDismissScope)
		{
			isDismiss = isDismissTrigger(clickedElement, targetElement);
		}

		!isDismiss && sourceElement.click();
		callback && callback(isTargetDisplayed === !isDismiss, "Element Click Passed: " + clickedElementTag);
	}

	function triggerClick(element)
	{
		element && element.click();
	}

	function isDisplay(element)
	{
		// return element && element.style.display !== 'none';
		return $(element).css('display') !== 'none';
	}

	function isDismissTrigger(child, parent)
	{
		if (hasCloset(child, parent))
		{
			var dataPopupDismiss = child.getAttribute('data-popup-dismiss'),
					parentDismissFalse;
			if (dataPopupDismiss === 'false' || dataPopupDismiss === 'true')
			{
				return dataPopupDismiss === 'true';
			}
			else if (parentDismissFalse = findParent(child, '[data-popup-dismiss="false"]'))
			{
				var parentDismissTrue = findParent(child, '[data-popup-dismiss="true"]');
				return parentDismissTrue ? hasCloset(parentDismissTrue, parentDismissFalse) : false;
			}
		}
		return true;
	}
})();