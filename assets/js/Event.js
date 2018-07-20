class Event
{
	constructor()
	{
		this._cache = {};
	}
	on(eventName, callback)
	{
		if (!this._cache[eventName])
		{
			this._cache[eventName] = [];
		}

		if (typeof callback === 'function' && this._cache[eventName].indexOf(callback) === -1)
		{
			this._cache[eventName].push(callback);
		}
		else
		{
			typeof callback !== 'function' && alert(`Your added callback ${callback} is not one valid function.`);
			this._cache[eventName].indexOf(callback) !== -1 && alert(`Same on(eventName, callback) have been called!`);
		}
		return this;
	}
	off(eventName, callback)
	{
		let eventCallbacks = this._cache[eventName];
		if (Array.isArray(eventCallbacks) && eventCallbacks.length)
		{
			if (callback)
			{
				eventCallbacks.splice(eventCallbacks.indexOf(callback), 1);
			}
			else
			{
				eventCallbacks.length = 0;
			}
		}
		return this;
	}
	trigger(eventName, data)
	{
		let eventCallbacks = this._cache[eventName];
		if (eventCallbacks && eventCallbacks.length)
		{
			eventCallbacks.forEach((callback) => {
				callback(data);
			});
		}
		return this;
	}
}

export default Event;