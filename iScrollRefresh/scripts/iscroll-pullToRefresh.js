function pullToRefreshiScroll(options, iScrollSelector, iScrollOptions)
{
	this.options = {
		$iscrollWrapper: $('.list-wrapper'),
		$iscrollScroller: $('.list-wrapper .list-scroller'),
		$iscrollUl: $('.list-wrapper .list-scroller ul'),
		$iscrollPullDown: $('.list-wrapper .pullDown'),
		$iscrollPullUp: $('.list-wrapper .pullUp'),
		pullDownRefresh: null,
		pullUpRefresh: null
	};
	for (var i in options)
	{
		this.options[i] = options[i];
	}

	this.iScrollOptions = {
		probeType: 1,
		tap: true,
		click: true,
		preventDefaultException: {tagName: /.*/},
		mouseWheel: true,
		scrollbars: true,
		fadeScrollbars: true,
		interactiveScrollbars: false,
		keyBindings: false,
		deceleration: 0.0002
	};
	for (var j in iScrollOptions)
	{
		this.iScrollOptions[j] = iScrollOptions[j];
	}

	this.isScrolling = false;
	this.iScroll = null;
	this.iScrollSelector = iScrollSelector;
	this.pullDownOffset = 0;
	this.pullUpOffset = 0;
	this.pullActionDetect = {
		count: 0,
		limit: 10
	};
	this.debug = false;
	this._events = {};
	this._init();
}
pullToRefreshiScroll.prototype = {
	_init: function ()
	{
		this.pullDownOffset = 40;
		this.pullUpOffset = 40;
		this.options.$iscrollWrapper.on('touchmove', function (event)
		{
			event.preventDefault();
		});

		if (this.options.$iscrollUl.height() < this.options.$iscrollWrapper.height())
		{
			this.pullUpOffset = this.pullDownOffset = 0;
			this.options.$iscrollPullDown.hide();
			this.options.$iscrollPullUp.hide();
		}
		this.iScrollOptions.startY = parseInt(this.pullDownOffset, 10) * (-1);
		this.initiScroll();
	},
	destroy: function ()
	{
		// remove generated elements
	},

	// Custom event
	on: function (type, fn)
	{
		if (!this._events[type])
		{
			this._events[type] = [];
		}

		this._events[type].push(fn);
	},

	off: function (type, fn)
	{
		if (!this._events[type])
		{
			return;
		}

		var index = this._events[type].indexOf(fn);

		if (index > -1)
		{
			this._events[type].splice(index, 1);
		}
	},

	refreshContent: function (refresh)
	{
		if (refresh)
		{
			this.iScroll.refresh();
		}
		else
		{
			this.destroyScroll();
			this.initiScroll();
		}
	},
	destroyScroll: function ()
	{
		if (this.iScroll)
		{
			this.iScroll.destroy();
			this.options.$iscrollScroller.css({
				'transition-timing-function': '',
				'transition-duration': '',
				'transform': ''
			});
			this.iScroll = null;
		}
	},
	pullDownLoading: function ()
	{
		this.debug && window.console && console.log('Pull down loading...');
		this.iScroll.scrollTo(0, 0, 200);
		this.options.$iscrollPullDown.addClass('loading');
	},
	pullDownLoaded: function ()
	{
		this.iScroll.scrollTo(0, -this.pullDownOffset, 200);
		this.options.$iscrollPullDown.removeClass('loading');
		this.refreshContent(true);
		this.debug && window.console && console.log('Pull down loaded!');
	},
	pullUpLoading: function ()
	{
		this.debug && window.console && console.log('Pull up loading...');
		this.options.$iscrollPullUp.addClass('loading').html('<span class="pullDownIcon">&nbsp;</span>');
		this.iScroll.refresh();
		this.iScroll.scrollTo(0, this.iScroll.maxScrollY - this.pullUpOffset, 200);
	},
	pullUpLoaded: function ()
	{
		this.iScroll.scrollTo(0, this.iScroll.maxScrollY, 200);
		this.options.$iscrollPullUp.removeClass('loading').html('');
		this.refreshContent(true);
		this.debug && window.console && console.log('Pull up loaded!');
	},
	pullDownAction: function (self, callback)
	{
		var that = self ? self : this;
		if (typeof(callback) === 'function')
		{
			that.pullDownLoading();
			callback();
		}
		this.options.$iscrollUl.data('page', 1);
	},
	pullUpAction: function (self, callback)
	{
		var dataPage = this.options.$iscrollUl.data('page'),
				nextPage = dataPage ? (parseInt(dataPage, 10) + 1) : 2;
		this.options.$iscrollUl.data('page', nextPage);

		var that = self ? self : this;
		if (typeof(callback) === 'function')
		{
			that.pullUpLoading();
			callback();
		}
	},
	check: function (count, thatScroll)
	{
		var that = this;
		if (count)
		{
			this.pullActionDetect.count = 0;
		}
		setTimeout(function ()
		{
			if (thatScroll.y <= thatScroll.maxScrollY - that.pullUpOffset && !that.options.$iscrollPullUp.hasClass('loading'))
			{
				that.pullUpAction(that, that.options.pullUpRefresh);
			}
			else if (that.pullActionDetect.count < that.pullActionDetect.limit)
			{
				that.check(0, thatScroll);
				that.pullActionDetect.count++;
			}
		}, 100);
	},
	initiScroll: function ()
	{
		var that = this;
		this.iScroll = new IScroll(this.iScrollSelector, this.iScrollOptions);
		this.iScroll.on('scrollStart', function ()
		{
			that.debug && console.log('\nScroll started');
			that.isScrolling = true;
		});
		this.iScroll.on('scroll', function ()
		{
			that.debug && console.log('Scrolling Y: ' + this.y);
			that.isScrolling = true;
			if (this.y > -that.pullDownOffset && !that.options.$iscrollPullDown.hasClass('flip'))
			{
				that.options.$iscrollPullDown.addClass('flip');
			}
			else if (this.y <= -that.pullDownOffset && that.options.$iscrollPullDown.hasClass('flip'))
			{
				that.options.$iscrollPullDown.removeClass('flip');
			}
			if (this.y < this.maxScrollY && !that.options.$iscrollPullUp.hasClass('flip'))
			{
				that.options.$iscrollPullUp.addClass('flip');
			}
			else if (this.y >= this.maxScrollY && that.options.$iscrollPullUp.hasClass('flip'))
			{
				that.options.$iscrollPullUp.removeClass('flip');
			}
			that.check(0, this);
		});
		this.iScroll.on('scrollEnd', function ()
		{
			that.debug && console.log('ScrollEnd Y: ' + this.y);
			that.debug && console.log('Scroll ended\n');
			setTimeout(function ()
			{
				that.isScrolling = false;
			}, 100);
			if (that.options.$iscrollPullDown.hasClass('flip'))
			{
				that.options.$iscrollPullDown.removeClass('flip');
			}
			if (that.options.$iscrollPullUp.hasClass('flip'))
			{
				that.options.$iscrollPullUp.removeClass('flip');
			}
			if (that.iScroll.y < 0 && that.iScroll.y > -40 && !that.options.$iscrollPullDown.hasClass("loading"))
			{
				that.iScroll.scrollTo(0, -that.pullDownOffset, 200);
			}
			else if (that.iScroll.y >= 0)
			{
				that.pullDownAction(that, that.options.pullDownRefresh);
			}
			that.check(0, this);
		});
		setTimeout(function ()
		{
			that.options.$iscrollWrapper.css({left: 0});
		}, 100);
	}
};