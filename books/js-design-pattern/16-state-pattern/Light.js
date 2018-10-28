class LightState {
	constructor(light)
	{
		this.light = light;
	}

	btnPressed()
	{
		throw new Error(`This function must be override by extend class`);
	}
}

class OffLightState extends LightState
{
	constructor(props)
	{
		super(props);
	}

	btnPressed()
	{
		console.log(`Light pressed!`);
		this.light.setState(this.light.weakLightState);
	}
}
class WeakLightState extends LightState
{
	constructor(props)
	{
		super(props);
	}
	btnPressed()
	{
		console.log(`Light pressed!`);
		this.light.setState(this.light.strongLightState);
	}
}
class StrongLightState extends LightState
{
	btnPressed()
	{
		console.log(`Light pressed!`);
		this.light.setState(this.light.offLightState);
	}
}

class Light {
	constructor()
	{
		this.offLightState = new OffLightState(this);
		this.weakLightState = new WeakLightState(this);
		this.strongLightState = new StrongLightState(this);

		this.init();
	}

	init()
	{
		let btn = document.createElement('button');
		btn.innerHTML = 'Switcher';
		this.button = document.body.appendChild(btn);
		this.button.onclick = () => {
			this.currentState.btnPressed();
		};
		this.currentState = this.offLightState;
	}

	setState(newState)
	{
		this.currentState = newState;
	}
}