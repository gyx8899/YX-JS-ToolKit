/**
 * ObserverMutation v1.0.0.20190721
 */

class ObserverMutation {
	CONFIG = {
		attributes: true,
		childList: true,
		subtree: true
	};

	constructor(targetNode, callback, config = {}) {
		this.targetNode = targetNode;
		this.callback = callback;
		this.config = {...this.CONFIG, ...config};

		this._mutationCallback = this._mutationCallback.bind(this);

		this.init(this.targetNode, this.config);
	}

	init(targetNode = this.targetNode, config = this.CONFIG) {
		if (!!targetNode) {
			// Create an observer instance linked to the callback function
			this.observer = new MutationObserver(this._mutationCallback);

			// Start observing the target node for configured mutations
			this.observer.observe(targetNode, config);
		}
	}

	destroy() {
		// Later, you can stop observing
		this.observer.disconnect();
	}

	// Callback function to execute when mutations are observed
	_mutationCallback(mutationsList) {
		for (let mutation of mutationsList) {
			let type = mutation.type;
			switch (type) {
				case "childList":
					// console.log("A child node has been added or removed.");
					break;
				case "attributes":
					// console.log(`The ${mutation.attributeName} attribute was modified.`);
					break;
				case "subtree":
					// console.log(`The subtree was modified.`);
					break;
				default:
					break;
			}

			this.callback && this.callback(this.targetNode, type);
		}
	}
}

export default ObserverMutation;