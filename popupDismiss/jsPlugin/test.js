(function () {
	/**
	 * Case1:
	 * data-toggle="popupDismiss" data-target="#demo1List" data-toggle-class="open"
	 * */
	QUnit.module("popupDismiss1");
	QUnit.test("Demo1-Base-Outer1", function (assert) {
		var targetSelector = '#demo11List',
				targetElement = document.querySelector(targetSelector),
				clickedElements = [targetElement, document.body].concat(targetElement.children);

		for (var i = 0, l = clickedElements.length; i < l; i++)
		{
			testTargetCase(targetElement, targetSelector, clickedElements[i]);
		}

		function testTargetCase(targetElement, targetSelector, clickedElement)
		{
			collapseOn(targetSelector);

			// Test element
			if (isDisplay(targetElement))
			{
				triggerClick(clickedElement);

				assert.ok(isDisplay(targetElement) === findParent(clickedElement, '[data-popup-dismiss="false"]'), "Passed!");
			}
		}
	});

	function collapseOn(targetSelector)
	{
		var sourceElement = document.querySelector('[data-target="' + targetSelector + '"]');
		triggerClick(sourceElement);
	}

	function triggerClick(element)
	{
		element && element.click();
	}
	function isDisplay(element)
	{
		return element.style.display !== 'none';
	}
})();
