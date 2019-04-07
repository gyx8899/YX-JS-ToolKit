class NodeObserver {
	constructor(){
		this.subNode = []
	}
	addSubNode(node){
		this.subNode.push(node)
	}
	update(newVal){
		this.subNode.forEach(node => {
			node.innerHTML = newVal
		})
	}
}

export default NodeObserver