class Beverage {
	constructor()
	{
		this.init();
	}

	init()
	{
		this.boilWater();
		this.brew();
		this.pourInCup();
		this.addCondiments();
	}

	boilWater()
	{
		throw new Error('Must rewrite boilWater function');
	}

	brew()
	{
		throw new Error('Must rewrite brew function');
	}

	pourInCup()
	{
		throw new Error('Must rewrite pourInCup');
	}

	addCondiments()
	{
		throw new Error('Must rewrite addCondiments function');
	}
}