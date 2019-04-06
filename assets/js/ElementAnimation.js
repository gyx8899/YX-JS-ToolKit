const elShow = (el, display = 'block') => {
	// display = 'inline' || 'inline-block' || 'inline-table' || 'block'
	if (!!el && el.nodeType === 1) //Element
	{
		el.style.display = display;
	}
};

const elHide = (el) => {
	if (!!el && el.nodeType === 1) //Element
	{
		el.style.display = 'none';
	}
}

const elToggle = (el, display = 'block') => {
	if (!!el && el.nodeType === 1) //Element
	{
		if (el.ownerDocument.defaultView.getComputedStyle(el, null).display === 'none')
		{
			el.style.display = display;
		}
		else
		{
			el.style.display = 'none';
		}
	}
}

const elFadeIn = (el, ms = 400, complete) => {
	if (!!el && el.nodeType === 1) //Element
	{
		el.style.opacity = 0;

		let opacity = 0,
				timeoutUnit = 50;
		const timer = setInterval(() => {
			opacity += 50 / ms;
			if (opacity >= 1)
			{
				clearInterval(timer);
				opacity = 1;
			}
			el.style.opacity = opacity;
			if (opacity >= 1)
			{
				complete && complete(el);
			}
		}, timeoutUnit);
	}
}

const elFadeOut = (el, ms = 400, complete) => {
	if (!!el && el.nodeType === 1) //Element
	{
		el.style.transition = `opacity ${ms}ms`;
		el.addEventListener(
				'transitionend',
				(event) => {
					el.style.display = 'none';
					complete && complete(el);
				},
				false
		);
		el.style.opacity = 0;
	}
}

const elFadeTo = (el, opacity, ms = 400) => {
	if (!!el && el.nodeType === 1) //Element
	{
		el.style.transition = `opacity ${ms}ms`;
		el.style.opacity = opacity;
	}
}

const elFadeToggle = (el, ms = 400) => {
	if (!!el && el.nodeType === 1) //Element
	{
		el.style.transition = 'opacity ${ms}ms';
		let {opacity} = el.ownerDocument.defaultView.getComputedStyle(el, null);
		if (opacity === '1')
		{
			el.style.opacity = 0;
		}
		else
		{
			el.style.opacity = 1;
		}
	}
}

const elSlideToggle = (el, ms = 400) => {
	if (!!el && el.nodeType === 1) //Element
	{
		el.style.transition = `height ${ms}ms`;
		const {height} = el.ownerDocument.defaultView.getComputedStyle(el, null);
		if (parseInt(height, 10) === 0)
		{
			el.style.height = el.getAttribute('attr-height');
		}
		else
		{
			el.setAttribute('attr-height', `${height}px`);
			el.style.height = '0px';
		}
	}
}

const elAnimate = (el, params, speed) => {
	if (!!el && el.nodeType === 1 && !!params) //Element
	{
		el.style.transition = `all ${speed}`;
		Object.keys(params).forEach((key) => {
			el.style[key] = params[key];
		})
	}
}

export {
	elShow,
	elHide,
	elToggle,
	elFadeIn,
	elFadeOut,
	elFadeTo,
	elFadeToggle,
	elSlideToggle,
	elAnimate
}