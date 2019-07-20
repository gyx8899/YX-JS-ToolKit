/**!
 * ObserverObject V1.0.1.20190720
 */
class ObserverObject {
	constructor(obj = {}, options, keys = [])
	{
		this.obj = obj;
		this.observerKeys = [...Object.keys(obj), ...keys];
		this.observerKeys.push(ObserverObject.updateEventKey);
		this.hasProxy = !!window.Proxy;
		this.onChange = options.onChange || (() => {});
		this.onUpdate = options.onUpdate || (() => {});
		this.prevState = {};
		this.nextState = {};
		this._set = this._set.bind(this);
		this._get = this._get.bind(this);

		return this.proxy();
	}

	initState()
	{
		this.prevState = ObserverObject.clearObject(this.prevState);
		this.nextState = ObserverObject.clearObject(this.nextState);
	}

	updateState(key, prevValue, nextValue)
	{
		if (key !== ObserverObject.updateEventKey)
		{
			this.prevState[key] = prevValue;
			this.nextState[key] = nextValue;
		}
	}

	proxy()
	{
		if (this.hasProxy)
		{
			return new Proxy(this.obj, {
				get: this._get,
				set: this._set
			});
		}
		else
		{
			this.observerKeys.forEach((key) => {
				Object.defineProperty(this.obj, key, {
					get: () => {
						return this._get(this.obj, key);
					},
					set: (nextValue) => {
						return this._set(this.obj, key, nextValue);
					},
					enumerable: true,
					configurable: true
				});
			});
			return this.obj;
		}
	}

	shouldUpdate(target)
	{
		if (JSON.stringify(this.prevState) !== JSON.stringify(this.nextState))
		{
			this.onUpdate(this.prevState, this.nextState, target);

			this.initState();
		}
	}

	_get(target, key, receiver)
	{
		if (this.hasProxy)
		{
			return target[key];
		}
		else
		{
			return this[`_${key}`];
		}
	}

	_set(target, key, nextValue, receiver)
	{
		let prevValue = target[key];
		this.updateState(key, prevValue, nextValue);
		this.onChange(target, key, nextValue, prevValue);
		if (key === ObserverObject.updateEventKey)
		{
			this.shouldUpdate(target);
		}
		if (this.hasProxy)
		{
			return Reflect.set(target, key, nextValue, receiver);
		}
		else
		{
			this[`_${key}`] = nextValue;
		}
	}

	static clearObject(obj)
	{
		for (let key in obj)
		{
			if (obj.hasOwnProperty(key))
			{
				delete obj[key];
			}
		}
		return obj;
	}
}

ObserverObject.updateEventKey = '_update';

export default ObserverObject