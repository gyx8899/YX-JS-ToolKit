import MVVM from './MVVM';
import {addClass, removeClass} from './ElementClassName';
import {addElement} from './Utils';

class MVVMComponent
{
	constructor(options, data)
	{
		this.inited = false;
		this.mvvm = null;
		this.defaultOption = {
			hookSelector: '',
			hookPosition: '',
			componentId: `mvvmComponent${Date.now()}`,
			appearDelaySeconds: 0,
			durationSeconds: 0,
			showClass: '',
			hideClass: '',
			template: ''
		};
		this.options = {...this.defaultOption, ...options};
		this.componentElment = null;

		this.init(data);

		return this;
	}
	init(data)
	{
		if (data)
		{
			const {hookSelector, hookPosition, componentId, template} = this.options;
			if (hookSelector !== '' && template)
			{
				let hookElement = document.querySelector(hookSelector);
				this.componentElment = hookElement && addElement(hookElement, template, hookPosition);
				if (componentId === this.defaultOption.componentId)
				{
					this.componentElment.id = componentId;
				}
			}

			let mvvmConfig = {
				el: `#${componentId}`,
				data: data || {}
			};
			this.mvvm = new MVVM(mvvmConfig);
			this.inited = true;
		}
	}

	update(info)
	{
		if (!info)
		{
			this.disappear();
		}
		else
		{
			if (!this.inited)
			{
				this.init(info);
			}
			else
			{
				for (let key in info)
				{
					if (info.hasOwnProperty(key))
					{
						this.mvvm.data[key] = info[key];
					}
				}
			}
			this.appear();
		}
	}

	show(className = this.options.showClass)
	{
		return this._showHide(className);
	}

	hide(className = this.options.showClass)
	{
		return this._showHide(className, false);
	}

	_showHide(className = this.options.showClass, isShow = true)
	{
		this._clearTimeout();
		let toggleClass = isShow ? addClass : removeClass;
		if (this.options.showClass)
		{
			toggleClass(this.componentElment, className);
		}
		else
		{
			if (!this.defaulDisplayValue && !isShow)
			{
				this.defaulDisplayValue = this.componentElment.style.display || 'block';
			}
			this.componentElment.style.display = isShow ? this.defaulDisplayValue : 'none';
		}
	}

	appear()
	{
		this._clearTimeout();
		this.appearTimeout = setTimeout(() => {
			this.show();
		}, this.options.appearDelaySeconds * 1000);
	}

	disappear()
	{
		this.durationTimeout = setTimeout(() => {
			this.options.hideClass && this.show(this.options.hideClass);
			this.disappearTimeout = setTimeout(() => {
				this.hide(this.options.hideClass);
				this.hide(this.options.showClass);
			}, 500);
		}, this.options.durationSeconds * 1000);
	}

	_clearTimeout()
	{
		this.appearTimeout && window.clearTimeout(this.appearTimeout);
		this.appearTimeout = null;
		this.disappearTimeout && window.clearTimeout(this.disappearTimeout);
		this.disappearTimeout = null;
		this.durationTimeout && window.clearTimeout(this.durationTimeout);
		this.durationTimeout = null;
	}
}

export default MVVMComponent