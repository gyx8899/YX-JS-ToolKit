class BonusStrategies {
	S(salary)
	{
		return salary * 4;
	}

	A(salary)
	{
		return salary * 3;
	}

	B(salary)
	{
		return salary * 2;
	}
}

export default BonusStrategies

let bonusStrategies = new BonusStrategies();
let calculateBonus = (level, salary) => {
	return bonusStrategies[level](salary);
};