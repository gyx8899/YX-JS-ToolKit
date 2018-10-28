/**
 * Event: v1.2.0.20181021
 * Copyright (c) 2018 Kate Kuo @Steper
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
			alert(`Your listen on ${fn.toString()} is not one valid function`);
		}

		return this;
	}

	off(key, fn)
	{
		let fns = this._cache[key];
		if (!!fns)
		{
			fns.slice(fns.indexOf(fn), 1);
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
}

export default Event;