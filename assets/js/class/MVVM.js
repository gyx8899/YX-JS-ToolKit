import NodeObserver from './NodeObserver'

class MVVM {
	constructor(opt)
	{
		this.opt = opt
		this.data = this.opt.data

		this.observe(opt.data)

		let root = document.querySelector(opt.el)
		this.compile(root)
	}

	observe(data)
	{
		Object.keys(data).forEach(key => {
			let obv = new NodeObserver()
			data['_' + key] = data[key]

			Object.defineProperty(data, key, {
				get(){
					NodeObserver.target && obv.addSubNode(NodeObserver.target);
					return data['_' + key];
				},
				set(newVal)
				{
					obv.update(newVal);
					data['_' + key] = newVal;
				}
			})
		})
	}

	compile(node){
		[].forEach.call(node.childNodes, child => {
			if (!child.firstElementChild && /\{\{(.*)\}\}/.test(child.innerHTML))
			{
				let key = RegExp.$1.trim()
				child.innerHTML = child.innerHTML.replace(new RegExp('\\{\\{\\s*' + key + '\\s*\\}\\}', 'gm'), this.opt.data[key])
				NodeObserver.target = child

				this.opt.data[key]
				NodeObserver.target = null
			}
			else if (child.firstElementChild)
			{
				this.compile(child)
			}
		})
	}
}

export default MVVM