/**
 * FullScreen v1.0.4.20190617
 */
class FullScreen {
	constructor()
	{
		this.browserPrefixName = '';
		this.fullscreenEnabled = this.isFullScreenEnable();
	}

	isFullScreenEnable()
	{
		let fullScreenEnable = false;
		if (document.fullscreenEnabled)
		{
			// Chrome/71.0.3578.80,
			fullScreenEnable = document.fullscreenEnabled;
		}
		else if (document.webkitFullscreenEnabled)
		{
			// Chrome/71.0.3578.80, Edge/17.17134, Chrome/70.0.3538.77, Chrome/70.0.3538.102(Mac), Safari/601.2.7(MAC)
			fullScreenEnable = document.webkitFullscreenEnabled;
			this.browserPrefixName = 'webkit';
		}
		else if (document.mozFullScreenEnabled)
		{
			// Firefox/63.0
			fullScreenEnable = document.mozFullScreenEnabled;
			this.browserPrefixName = 'moz';
		}
		else if (document.msFullscreenEnabled)
		{
			// IE11
			fullScreenEnable = document.msFullscreenEnabled;
			this.browserPrefixName = 'ms';
		}

		return fullScreenEnable;
	}

	static enterFullscreen(selector)
	{
		const docElement = document.querySelector(selector);
		if (docElement.requestFullscreen)
		{
			docElement.requestFullscreen();
		}
		else if (docElement.mozRequestFullScreen)
		{
			docElement.mozRequestFullScreen();
		}
		else if (docElement.webkitRequestFullScreen)
		{
			docElement.webkitRequestFullScreen();
		}
		else if (docElement.msRequestFullscreen)
		{
			docElement.msRequestFullscreen();
		}
	}

	static exitFullscreen()
	{
		if (FullScreen.isElementFullScreen())
		{
			if (document.exitFullscreen)
			{
				document.exitFullscreen();
			}
			else if (document.mozCancelFullScreen)
			{
				document.mozCancelFullScreen();
			}
			else if (document.webkitCancelFullScreen)
			{
				document.webkitCancelFullScreen();
			}
			else if (document.msExitFullscreen)
			{
				document.msExitFullscreen();
			}
		}
	}

	static isElementFullScreen()
	{
		const fullscreenElement = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
		return !!fullscreenElement
	};

	fullScreenChanged(enter, exit, context)
	{
		if (!this.fullscreenEnabled)
		{
			return ;
		}

		let fullScreenChangeEvent = (e) => {
			if (FullScreen.isElementFullScreen())
			{
				(context && enter) ? enter.call(context, e) : enter(e);
			}
			else
			{
				(context && exit) ? exit.call(context, e) : exit(e);
			}
		};

		document.addEventListener(`${this.browserPrefixName}fullscreenchange`, fullScreenChangeEvent);
	};
}

export default FullScreen;