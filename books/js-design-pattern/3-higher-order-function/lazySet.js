let addEvent = (elem, type, handler) => {
	if (window.addEventListener)
	{
		addEvent = (elem, type, handler) => {
			elem.addEventListener(type, handler, false);
		};
	}
	else if (window.attachEvent)
	{
		addEvent = (elem, type, handler) => {
			elem.attachEvent('on' + type, handler);
		};
	}
	addEvent(elem, type, handler);
};