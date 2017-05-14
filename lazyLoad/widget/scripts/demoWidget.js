$.widget("js.demowidget", {
	// default options
	options: {
		lazyLoad: false,
		id: ''
	},

	_create: function ()
	{
		this._super();

		this._on(this.element, {
			"lazyLoad": "_lazyLoadInit" // Note: function name must be passed as a string!
		});

		$(this.element).html('<div class="widget-item">' + this.options.id + ' : widget item</div>');

		// lazyLoad, false: execute to lazyLoadInit; true: not execute
		if (!this.options.lazyLoad)
		{
			this._lazyLoadInit();
		}
	},
	_destroy: function ()
	{
		// remove generated elements
		this.element.text("")
				.empty();
	},
	_init: function ()
	{

	},
	_setOption: function (key, value)
	{
		this._super(key, value);
	},
	destroy: function ()
	{
		this._destroy();
		$.Widget.prototype.destroy.call(this);
	},
	_lazyLoadInit: function ()
	{
		// Check lazyLoad state
		if (this.options.lazyLoad)
		{
			var that = this;
			setTimeout(function ()
			{
				$('.widget-item', that.element).append('<div class="sub-item">Lazy load .... sub item</div>');

				// Set lazyLoad with false: loaded
				that.options.lazyLoad = false;
			}, 1000);
		}
	}
});