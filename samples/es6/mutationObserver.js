// Select the node that will be observed for mutations
let targetNode = document.querySelector(`#id`);

// Options for the observer (which mutations to observe)
let config = {
	attributes: true,
	childList: true,
	subtree: true
};

// Callback function to execute when mutations are observed
const mutationCallback = (mutationsList) => {
	for (let mutation of mutationsList) {
		let type = mutation.type;
		switch (type) {
			case "childList":
				console.log("A child node has been added or removed.");
				break;
			case "attributes":
				console.log(`The ${mutation.attributeName} attribute was modified.`);
				break;
			case "subtree":
				console.log(`The subtree was modified.`);
				break;
			default:
				break;
		}
	}
};

// Create an observer instance linked to the callback function
let observer = new MutationObserver(mutationCallback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
observer.disconnect();