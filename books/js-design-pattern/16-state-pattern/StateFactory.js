class StateFactory {
	constructor(props)
	{
		this.props = props;
	}

	click1Handler()
	{
		throw new Error(`Sub class must override this function!`);
	}

	click2Handler()
	{
		throw new Error(`Sub class must override this function!`);
	}
}

class SignState extends StateFactory
{
	constructor(props)
	{
		super(props);

	}

	click1Handler()
	{
		console.log(`click1 handler!`);
	}

	click2Handler()
	{
		console.log(`click2 handler!`);
	}
}