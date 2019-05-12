/**
 * Event v1.0.2.20190512
 */
class Event {
	constructor()
	{
		this._cache = {};
		this._unread = {};
	}

	on(key, fn)
	{
		if (!this._cache[key])
		{
			this._cache[key] = [];
		}
		if (typeof fn === 'function')
		{
			this._cache[key].push(fn);

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
		if (!!fns)
		{
			this._cache[key].splice(fns.indexOf(fn), 1);
		}
		if (!fn)
		{
			delete this._cache[key];
		}
		return this;
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
			if (!this._unread[key])
			{
				this._unread[key] = [];
			}
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