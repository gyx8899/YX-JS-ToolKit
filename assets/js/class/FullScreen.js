/**
 * FullScreen v1.0.3.20190221
 */
class FullScreen {
	constructor()
	{
		this.enterFullscreen = null;
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
		}
		else if (document.mozFullScreenEnabled)
		{
			// Firefox/63.0
			fullScreenEnable = document.mozFullScreenEnabled;
		}
		else if (document.msFullscreenEnabled)
		{
			// IE11
			fullScreenEnable = document.msFullscreenEnabled;
		}

		return fullScreenEnable;
	}

	enterFullscreen(selector)
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

	exitFullscreen()
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

	fullScreenChanged(enter, exit)
	{
		if (!this.fullscreenEnabled)
		{
			return ;
		}

		let fullScreenChangeEvent = (e) => {
			if (FullScreen.isElementFullScreen())
			{
				enter && enter(e);
			}
			else
			{
				exit && exit(e);
			}
		};

		this.prefixNames.forEach(prefixName => {
			document.addEventListener(`${prefixName}fullscreenchange`, fullScreenChangeEvent);
		});
	};
}

export default FullScreen;