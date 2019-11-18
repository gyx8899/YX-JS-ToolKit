import ObserverNode from './ObserverNode.js'
import ObserverClassName from './ObserverClassName.js'

/**!
 * MVVM v1.0.1.20190416
 */

class MVVM {
	constructor(opt)
	{
		this.opt = opt
		this.data = this.opt.data
		this.classNameObv = new ObserverClassName();

		this.observe(opt.data)

		let root = document.querySelector(opt.el)
		this.compile(root)
	}

	observe(data)
	{
		Object.keys(data).forEach(key => {
			let _nodeObv = new ObserverNode(),
					_classNameObv = new ObserverClassName();
			data['_' + key] = data[key]

			Object.defineProperty(data, key, {
				get(){
					ObserverNode.target && _nodeObv.addSubNode(ObserverNode.target);
					ObserverClassName.target && ObserverClassName.className && _classNameObv.addSubNode(ObserverClassName.target, ObserverClassName.className);
					return data['_' + key];
				},
				set(newVal)
				{
					_nodeObv.update(newVal);
					_classNameObv.update(newVal);
					data['_' + key] = newVal;
				}
			})
		})
	}

	compile(node){
		[].forEach.call(node.childNodes, child => {
			if (!child.firstElementChild)
			{
				let hasHTMLBrace = /\{\{(.*)\}\}/.test(child.innerHTML),
						hasClassBrace = /\{\{(.*)\}\}/.test(child.className);
				if (hasHTMLBrace || hasClassBrace)
				{
					let key = RegExp.$1.trim(),
							value = this.opt.data[key];
					if (hasHTMLBrace)
					{
						child.innerHTML = child.innerHTML.replace(new RegExp('\\{\\{\\s*' + key + '\\s*\\}\\}', 'gm'), value);
						ObserverNode.target = child;
						this.opt.data[key];
						ObserverNode.target = null;
					}
					if (hasClassBrace)
					{
						this.classNameObv.replace(child, `{{${key}}}`, value);
						ObserverClassName.target = child;
						ObserverClassName.className = value;
						this.opt.data[key];
						ObserverClassName.target = null;
						ObserverClassName.className = null;
					}
				}
			}
			else if (child.firstElementChild)
			{
				this.compile(child)
			}
		})
	}
}

export default MVVM