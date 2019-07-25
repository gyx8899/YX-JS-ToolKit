/**!
 * ObserverObject V1.0.2.20190725
 */
class ObserverObject {
	UPDATE_EVENT_KEY = 'triggerUpdate';

	constructor(obj = {}, options, extraKeys = []) {
		this.obj = {...obj};

		this.onChange = options.onChange || (() => {});
		this.onUpdate = options.onUpdate || (() => {});
		this.prevState = {};
		this.nextState = {};
		this._set = this._set.bind(this);
		this._get = this._get.bind(this);

		if (!window.Proxy) {
			this.observerKeys = [...Object.keys(obj), ...extraKeys, this.UPDATE_EVENT_KEY];
			this.proxy = this._proxy;
			this.getValue = this._getValue;
			this.setValue = this._setValue;
		}

		return this.proxy();
	}

	initState() {
		this.prevState = ObserverObject.clearObject(this.prevState);
		this.nextState = ObserverObject.clearObject(this.nextState);
	}

	updateState(key, prevValue, nextValue) {
		if (key !== this.UPDATE_EVENT_KEY) {
			this.prevState[key] = prevValue;
			this.nextState[key] = nextValue;
		}
	}

	proxy() {
		return new Proxy(this.obj, {
			get: this._get,
			set: this._set
		});
	}

	_proxy() {
		this.observerKeys
				.forEach((key) => {
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

	triggerUpdate(target) {
		if (JSON.stringify(this.prevState) !== JSON.stringify(this.nextState)) {
			this.onUpdate(this.prevState, this.nextState, target);

			this.initState();
		}
	}

	getValue(target, key) {
		return target[key];
	}

	_getValue(target, key) {
		return this[`_${key}`];
	}

	setValue(target, key, nextValue, receiver) {
		return Reflect.set(target, key, nextValue, receiver);
	}

	_setValue(target, key, nextValue) {
		this[`_${key}`] = nextValue;
	}

	_get(target, key, receiver) {
		if (key === this.UPDATE_EVENT_KEY) {
			this.triggerUpdate(target);
			return;
		}
		return this.getValue(target, key, receiver);
	}

	_set(target, key, nextValue, receiver) {
		let prevValue = this.getValue(target, key);
		this.updateState(key, prevValue, nextValue);
		this.onChange(target, key, nextValue, prevValue);
		return this.setValue(target, key, nextValue, receiver);
	}

	static clearObject(obj) {
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				delete obj[key];
			}
		}
		return obj;
	}
}

export default ObserverObject