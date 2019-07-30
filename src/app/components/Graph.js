function Graph() {
	this.vertices = [] // 顶点集合
	this.edges = new Map() // 边集合
}

Graph.prototype.addVertex = function (v) { // 添加顶点方法
	this.vertices.push(v)
	this.edges.set(v, [])
}
Graph.prototype.addEdge = function (v, w) { // 添加边方法
	let vEdge = this.edges.get(v)
	vEdge.push(w)
	let wEdge = this.edges.get(w)
	wEdge.push(v)
	this.edges.set(v, vEdge)
	this.edges.set(w, wEdge)
}
Graph.prototype.toString = function () {
	let s = ''
	for (let i = 0; i < this.vertices.length; i++) {
		s += this.vertices[i] + ' -> '
		let neighors = this.edges.get(this.vertices[i])
		for (let j = 0; j < neighors.length; j++) {
			s += neighors[j] + ' '
		}
		s += '\n'
	}
	return s
}
Graph.prototype.dfs = function () {
	let marked = []
	for (let i = 0; i < this.vertices.length; i++) {
		if (!marked[this.vertices[i]]) {
			dfsVisit(this.vertices[i])
		}
	}

	function dfsVisit(u) {
		let edges = this.edges
		marked[u] = true
		console.log(u)
		let neighbors = edges.get(u)
		for (let i = 0; i < neighbors.length; i++) {
			let w = neighbors[i]
			if (!marked[w]) {
				dfsVisit(w)
			}
		}
	}
}

Graph.prototype.bfs = function (v) {
	let queue = [], marked = []
	marked[v] = true
	queue.push(v) // 添加到队尾
	while (queue.length > 0) {
		let s = queue.shift() // 从队首移除
		if (this.edges.has(s)) {
			console.log('visited vertex: ', s)
		}
		let neighbors = this.edges.get(s)
		for (let i = 0; i < neighbors.length; i++) {
			let w = neighbors[i]
			if (!marked[w]) {
				marked[w] = true
				queue.push(w)
			}
		}
	}
}

export default Graph