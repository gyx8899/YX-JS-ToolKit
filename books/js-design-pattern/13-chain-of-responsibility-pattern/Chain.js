class Chain {
	constructor(fn)
	{
		this.fn = fn;
		this.successor = null;
	}

	setNextSuccessor(successor)
	{
		this.successor = successor;
		return this;
	}

	after(fn)
	{
		this.passRequest(fn);
	}

	passRequest(fn)
	{
		let ret = (fn || this.fn).apply(this, arguments);

		if (ret === 'nextSuccessor')
		{
			return this.successor && this.successor.passRequest.apply(this.successor, arguments);
		}

		return ret;
	}
}