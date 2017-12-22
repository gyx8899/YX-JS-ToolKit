/*
* jQuery extension: subscribe
* */
(function ($) {
	var o = $({});

	$.subscribe = function () {
		o.on.apply(o, arguments);
	};

	$.unsubscribe = function () {
		o.off.apply(o, arguments);
	};

	$.publish = function () {
		o.trigger.apply(o, arguments);
	};

})(jQuery);

/*
* jQuery Object: Topic
* */
(function ($) {
	var topics = {};

	$.Topic = function (id) {
		var callbacks, topic = id && topics[id];
		if (!topic)
		{
			callbacks = $.Callbacks();
			topic = {
				publish: callbacks.fire,
				subscribe: callbacks.add,
				unsubscribe: callbacks.remove
			};
			if (id)
			{
				topics[id] = topic;
			}
		}
		return topic;
	};
})(jQuery);