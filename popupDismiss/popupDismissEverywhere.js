/**
 * JQuery plugin: Popup with dismiss v2.0
 *
 */
(function ($)
{
	var method = {
		popupEvent: function (event)
		{
			var $popupTrigger = $(event.target);
			if ($popupTrigger.data('toggle') != 'popupDismissEveryWhere')
			{
				$popupTrigger = $popupTrigger.parents('[data-toggle="popupDismissEveryWhere"]');
			}
			var eventData = {
				type: event.type,
				namespace: $popupTrigger.data('target'),
				$popupTrigger: $popupTrigger,
				$popupTarget: $($popupTrigger.data('target')),
				toggledClass: $popupTrigger.data('toggle-class') || null, // Recommend: 'open'
				popupHandler: $popupTrigger.data('popup-handler') || null,
				dismissHandler: $popupTrigger.data('dismiss-handler') || null
			};

			if (eventData.$popupTarget.data('isPopup') != 'true')
			{
				eventData.toggledClass && eventData.$popupTrigger.addClass(eventData.toggledClass) && eventData.$popupTarget.addClass(eventData.toggledClass);
				eventData.$popupTarget.data('isPopup', 'true');
				$(document).on(eventData.type + "." + eventData.namespace, eventData, method.popupDismiss);
				eventData.popupHandler && eventData.popupHandler(eventData.$popupTarget);

				method.setBodyCursorInIOS("pointer");
			}
			else
			{
				method.popupDismiss(eventData);
			}
		},

		popupDismiss: function (event)
		{
			var eventData = {}, isListenerEvent = !!event.data;
			if (isListenerEvent)
			{
				eventData = {
					type: event.data.type,
					namespace: event.data.namespace,
					$dismissTrigger: $(event.target),
					$popupTrigger: event.data.$popupTrigger,
					$popupTarget: event.data.$popupTarget,
					toggledClass: event.data.toggledClass,
					dismissHandler: event.data.dismissHandler
				};
				event.stopPropagation();
			}
			else
			{
				eventData = event;
			}

			if (!isListenerEvent ||
					(eventData.$dismissTrigger.closest(eventData.$popupTrigger).length == 0
					&& method.isDismissTrigger(eventData.$dismissTrigger, eventData.$popupTarget)
					&& eventData.$popupTarget.data('isPopup') == 'true'))
			{
				eventData.toggledClass && eventData.$popupTrigger.removeClass(eventData.toggledClass) && eventData.$popupTarget.removeClass(eventData.toggledClass);
				eventData.$popupTarget.data('isPopup', 'false');
				$(document).off(eventData.type + "." + eventData.namespace, method.popupDismiss);
				eventData.dismissHandler && eventData.dismissHandler(eventData.$popupTarget);

				method.setBodyCursorInIOS("default");
			}
		},

		// If $child doesn't have parent $parent and $child's closest has data-popup-dismiss="false', return true;
		// else return false;
		isDismissTrigger: function ($child, $parent)
		{
			var hasParent = $child.closest($parent);
			if (hasParent && hasParent.length > 0)
			{
				return $child.closest($('[data-popup-dismiss="false"]'), $parent).length == 0;
			}
			return true;
		},

		// Fix issue : In iOS device, the dismiss function could not be triggered;
		setBodyCursorInIOS: function (val)
		{
			if (method.isIOSDevice())
			{
				var $body = $("body"), popupCount = parseInt($body.data('popup-count') || '0', 10);
				if (val == 'pointer')
				{
					popupCount++;
					if (popupCount == 1)
					{
						$body.css("cursor", val);
					}
				}
				else if (val == 'default')
				{
					popupCount--;
					if (popupCount == 0)
					{
						$body.css("cursor", val);
					}
				}
				$body.data('popup-count', popupCount);
			}
		},

		isIOSDevice: function ()
		{
			if (/iPhone|iPad|iPod/i.test(navigator.userAgent))
			{
				// tasks to do if it is a iOS Mobile Device
				return true;
			}
			return false;
		}
	};
	$.fn.popupDismissEverywhere = function ()
	{
		return this.each(function ()
		{
			$(this).on('click', method.popupEvent);
		});
	};
})(jQuery);