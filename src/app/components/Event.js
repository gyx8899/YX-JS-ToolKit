/**
 * Event v1.1.3.20200321
 */
class Event {
	constructor() {
		this.cache = {};
		this.unread = {};
	}

	on(key, fn, isFirst = false) {
		if (!this.cache[key]) {
			this.cache[key] = [];
		}
		if (typeof fn === 'function') {
			this.cache[key][isFirst ? 'unshift' : 'push'](fn);

			const unReads = this.unread[key];
			if (unReads) {
				unReads.forEach((args) => {
					this.trigger(key, ...args);
				});
				this.unread[key] = [];
				delete this.unread[key];
			}
		} else {
			throw new Error(`Your listen on ${fn} is not one valid function!`);
		}

		return this;
	}

	off(key, fn) {
		const fns = this.cache[key];
		if (fns !== undefined && fns.length !== 0) {
			const index = fns.indexOf(fn);
			if (index >= 0) {
				this.cache[key].splice(index, 1);
			}
		}
		if (!fn) {
			delete this.cache[key];
		}
		return this;
	}

	once(key, fn) {
		const newFn = (...rest) => {
			fn.call(this, ...rest);
			this.off(key);
		};
		this.on(key, newFn);
	}

	trigger(_key, ...rest) {
		const key = _key;
		const args = [].slice.call(rest);
		const cacheFns = this.cache[key];
		if (cacheFns) {
			cacheFns.forEach((fn) => {
				fn.call(this, ...args);
			});
		} else {
			this.unread[key] = this.unread[key] || [];
			this.unread[key].push(rest);
		}

		return this;
	}

	destroy() {
		Object.keys(this.cache).forEach((key) => delete this.cache[key]);
		Object.keys(this.unread).forEach((key) => delete this.unread[key]);
	}
}

export default Event;
