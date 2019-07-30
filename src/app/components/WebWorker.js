import {call} from '../util/Tool';

class WebWorker {
	constructor(options) {
		if (window.Worker && options.workerUrl) {
			this.worker = new Worker(options.workerUrl);
			this.onMessage();
			this.onError(options && options.errorCallback);
		} else {
			alert('Browser does not support Worker, or workerUrl not set!');
		}
	}

	static getInstance(options) {
		if (!this.instance) {
			this.instance = new WebWorker(options);
		}
		return this.instance;
	}

	onMessage() {
		this.worker.onmessage = function (e) {
			if (e.data) {
				let {result, callback} = e.data;
				call(callback, result);
			} else {
				alert(`onmessage error: ${e}!`);
			}
			// throw new Error('Something wrong!'); // onerror
		};
	}

	postMessage(method = null, params = [], callback = null, scripts = [], isClose = false) {
		scripts = Array.isArray(scripts) ? scripts : [scripts];
		this.worker.postMessage({method, params, callback, scripts});
	}

	onError(errorCallback) {
		this.worker.onerror = function (err) {
			console.table(err);
			errorCallback && errorCallback(err);
		};
	}

	terminate() {
		this.worker.terminate();
	}
}

export default WebWorker;