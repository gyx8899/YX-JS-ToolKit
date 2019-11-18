import {call} from '../util/Tool.js';

class SharedWorkers {
	constructor(options) {
		if (window.Worker && options.workerUrl) {
			this.worker = new SharedWorker(options.workerUrl);
			// this.worker.port.start();
		} else {
			alert('Browser does not support Worker, or workUrl not set!');
		}
	}

	static getInstance(options) {
		if (!this.instance) {
			this.instance = new SharedWorkers(options);
		}
		return this.instance;
	}

	onMessage(callback) {
		this.worker.port.onmessage = (e) => {
			callback && callback(e);
			if (e.data.callback) {
				let {message, callback} = e.data;
				call(callback, message);
			}
		};
	}

	postMessage(postData) {
		// Case 1: call function like webworker, just compute;
		// postData =
		// {
		// 	type: 'apply',
		// 	// method: 'isPrime', // function name or calling path
		// 	method: 'isPrime', // function name or calling path
		// 	// params: 8, // one param or array params;
		// 	params: [8], // one param or array params;
		// 	// scripts: 'common.js', // method dependency script files (relative/absolute) path;
		// 	scripts: ['common.js', 'util.js'], // method dependency script files (relative/absolute) path;;
		// 	// callback: 'isPrimeCallback', // function name or calling path
		// 	callback: 'consoleLog'
		// };

		// Case 2.1: Post the called function result to which post listen this event
		// postData =
		// {
		// 	type: 'post',
		// 	event: 'postComputeResult', // post to this event listener;
		// 	// method: 'isPrime', // function name or calling path;
		// 	method: 'isPrime', // function name or calling path;
		// 	// params: 8, // one param or array params;
		// 	params: [8], // one param or array params;
		// 	// scripts: 'common.js', // method dependency script files (relative/absolute) path;
		// 	scripts: ['common.js', 'util.js'], // method dependency script files (relative/absolute) path;
		// 	// callback: 'isPrimeCallback', // function name or calling path;
		// 	callback: 'consoleLog'
		// };
		// Case 2.2: Post message to special event listener;
		// postData =
		// {
		// 	type: 'post',
		// 	event: 'postEventMessage',
		// 	message: 'This is post message'
		// };
		// Case 3: Get message from special event listener;
		// postData =
		// {
		// 	type: 'get',
		// 	event: 'postEventMessage'
		// };
		this.worker.port.postMessage(postData);
	}
}

export default SharedWorkers;