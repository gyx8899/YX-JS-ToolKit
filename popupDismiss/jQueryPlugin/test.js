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
		if (targetElement && targetElement.children)
		{
			clickedElements = clickedElements.concat(Array.prototype.slice.call(targetElement.children));
		}

		for (var i = 0, l = clickedElements.length; i < l; i++)
		{
			testTargetCase(sourceElement, targetElement, clickedElements[i], callback);
		}
	}

	function testTargetCase(sourceElement, targetElement, clickedElement, callback)
	{
		if (!isDisplay(targetElement))
		{
			triggerClick(sourceElement);
		}

		// Test element
		if (isDisplay(targetElement))
		{
			triggerClick(clickedElement);

			if (sourceElement !== clickedElement && clickedElement.getAttribute('data-toggle') === 'popupDismiss')
			{
				test(clickedElement.getAttribute('data-target'));
			}
			else
			{
				verifyPopupDismiss(targetElement, clickedElement, callback);
			}
		}
	}

	function verifyPopupDismiss(targetElement, clickedElement, callback)
	{
		var hasDismissFalse = !!findParent(clickedElement, '[data-popup-dismiss="false"]'),
				isTargetDisplayed = isDisplay(targetElement),
				clickedElementTag = clickedElement.tagName + ' ' + (clickedElement.childNodes.length === 1 ? clickedElement.innerText : clickedElement.classList);
		callback && callback(isTargetDisplayed === !hasDismissFalse, "Element Click Passed: " + clickedElementTag);
	}

	function triggerClick(element)
	{
		element && element.click();
	}

	function isDisplay(element)
	{
		return element && element.style.display !== 'none';
	}
})();
