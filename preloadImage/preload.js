// Preload images;
(function ($)
{
	function PreLoad(imgs, options)
	{
		this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
		this.opts = $.extend({}, PreLoad.DEFAULTS, options);

		if (this.opts.order == 'ordered')
		{
			this._ordered();
		}
		else
		{
			this._unordered();
		}
	}

	PreLoad.DEFAULTS = {
		order: 'unordered',
		each: null, //the function when each image loaded;
		all: null // the function when all images loaded;
	};
	PreLoad.prototype._ordered = function ()
	{
		"use strict";
		var imgs = this.imgs,
				count = 0,
				errorIndex = -1,
				len = imgs.length,
				opts = this.opts;

		orderedLoad();

		function orderedLoad()
		{
			var imgObj = new Image();
			$(imgObj).on('load error', function ()
			{
				if (event.type === 'load')
				{
					opts.each && opts.each();
					count++;
				}
				else // Ignore the error which the same object loaded twice error.
				{
					errorIndex != count ? errorIndex = count : count++;
				}
				if (count >= len)
				{
					opts.all && typeof opts.all === 'function' && opts.all(); // All loaded
				}
				else
				{
					orderedLoad();
				}
			});
			imgObj.src = imgs[count];
		}
	};
	PreLoad.prototype._unordered = function ()
	{
		"use strict";
		var imgs = this.imgs,
				opts = this.opts,
				count = 0;
		$.each(imgs, function (i, src)
		{
			if (typeof src !== 'string')
			{
				return;
			}
			var image = new Image();
			$(image).on('load error', function ()
			{
				opts.each && opts.each();
				if (count >= length - 1)
				{
					opts.all && opts.all();
				}
				count++;
			});
			image.src = src;
		})
	};

	$.extend({
		preload: function (imgs, options)
		{
			"use strict";
			new PreLoad(imgs, options);
		}
	})
})(jQuery);