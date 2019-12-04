import ObserverNode from './ObserverNode.js';
import ObserverClassName from './ObserverClassName.js';
import ObserverAttribute from "./ObserverAttribute.js";

/**!
 * MVVM v1.1.0.20191204
 */

class MVVM {
	constructor(opt) {
		this.opt = opt
		this.data = this.opt.data
		this.classNameObv = new ObserverClassName();
		this.attributeObv = new ObserverAttribute();

		this.observe(opt.data)

		let root = document.querySelector(opt.el)
		this.compile(root)
	}

	observe(data) {
		Object.keys(data).forEach(key => {
			let _nodeObv = new ObserverNode(),
					_classNameObv = new ObserverClassName(),
					_attributeObv = new ObserverAttribute();
			data['_' + key] = data[key]

			Object.defineProperty(data, key, {
				get() {
					ObserverNode.target && _nodeObv.addSubNode(ObserverNode.target);
					ObserverClassName.target && ObserverClassName.className && _classNameObv.addSubNode(ObserverClassName.target, ObserverClassName.className);
					if (ObserverAttribute.target && ObserverAttribute.target.attributes) {
						let attrKey = key.replace(/([A-Z])/g,"-$1").toLowerCase();
						if (ObserverAttribute.target.attributes[attrKey]) {
							_attributeObv.addSubNode(ObserverAttribute.target, attrKey);
						}
					}
					return data['_' + key];
				},
				set(newVal) {
					_nodeObv.update(newVal);
					_classNameObv.update(newVal);
					_attributeObv.update(newVal);
					data['_' + key] = newVal;
				}
			})
		})
	}

	compile(node) {
		this._compileClass(node);
		this._compileAttribute(node);

		if (node.childNodes && node.childNodes.length) {
			[].forEach.call(node.childNodes, child => {
				if (!child.firstElementChild) {
					this._compileHTML(child);
					this._compileClass(child);
					this._compileAttribute(child);

				} else if (child.firstElementChild) {
					this._compileClass(child);
					this._compileAttribute(child);

					this.compile(child)
				}
			});
		}
	}
	_compileHTML(element) {
		let hasHTMLBrace = /\{\{(.*)\}\}/.test(element.innerHTML);
		if (hasHTMLBrace) {
			let key = RegExp.$1.trim(),
					value = this.opt.data[key];
			element.innerHTML = element.innerHTML.replace(new RegExp('\\{\\{\\s*' + key + '\\s*\\}\\}', 'gm'), value);
			ObserverNode.target = element;
			this.opt.data[key];
			ObserverNode.target = null;
		}
	}
	_compileClass(element) {
		let hasClassBrace = /\{\{(.*)\}\}/.test(element.className);
		if (hasClassBrace) {
			let key = RegExp.$1.trim(),
					value = this.opt.data[key];
			this.classNameObv.replace(element, `{{${key}}}`, value);
			ObserverClassName.target = element;
			ObserverClassName.className = value;
			this.opt.data[key];
			ObserverClassName.target = null;
			ObserverClassName.className = null;
		}
	}
	_compileAttribute(element) {
		if (element.attributes && element.attributes.length) {
			for (let i = 0, l = element.attributes.length; i < l; i++) {
				let attrName = element.attributes[i].name;
				if (attrName !== 'class') {
					let hasAttributeBrace = /\{\{(.*)\}\}/.test(element.attributes[i].value);
					if (hasAttributeBrace) {
						let key = RegExp.$1.trim();
						if (attrName === key.replace(/([A-Z])/g,"-$1").toLowerCase()) {
							this.attributeObv.replace(element, attrName, this.opt.data[key]);
							ObserverAttribute.target = element;
							ObserverAttribute.attributeKey = attrName;
							this.opt.data[key];
							ObserverAttribute.target = null;
							ObserverAttribute.attributeKey = '';
						}
					}
				}
			}
		}
	}
}

export default MVVM