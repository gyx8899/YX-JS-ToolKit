/**
 * Event v1.1.2.20190724
 */
class Event {
	constructor()
	{
		this._cache = {};
		this._unread = {};
	}

	on(key, fn, isFirst = false)
	{
		if (!this._cache[key])
		{
			this._cache[key] = [];
		}
		if (typeof fn === 'function')
		{
			this._cache[key][isFirst ? 'unshift' : 'push'](fn);

			let unReads = this._unread[key];
			if (!!unReads)
			{
				unReads.forEach(args => {
					this.trigger(key, ...args);
				});
				this._unread[key] = [];
				delete this._unread[key];
			}
		}
		else
		{
			throw new Error(`Your listen on ${fn} is not one valid function!`);
		}

		return this;
	}

	off(key, fn)
	{
		let fns = this._cache[key];
		if (fns !== undefined && fns.length !== 0)
		{
			let index = fns.indexOf(fn);
			if (index >= 0)
			{
				this._cache[key].splice(index, 1);
			}
		}
		if (!fn)
		{
			delete this._cache[key];
		}
		return this;
	}

	once(key, fn)
	{
		let that = this,
				newFn = function () {
					fn.call(that, ...arguments);
					that.off(key);
				};
		this.on(key, newFn);
	}

	trigger(key)
	{
		[].shift.call(arguments);
		let args = [].slice.call(arguments),
				cacheFns = this._cache[key];
		if (!!cacheFns)
		{
			cacheFns.forEach(fn => {
				fn.call(this, ...args);
			});
		}
		else
		{
			this._unread[key] = this._unread[key] || [];
			this._unread[key].push(arguments);
		}

		return this;
	}

	destroy()
	{
		Object.keys(this._cache).forEach(key => delete this._cache[key]);
		Object.keys(this._unread).forEach(key => delete this._unread[key]);
	}
}

export default Event;