class Singleton
{
	constructor()
	{
		this.instance = null;
	}

	getInstance()
	{
		if (!this.instance)
		{
			return new Singleton();
		}
		return this.instance;
	}
}