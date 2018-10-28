let cost = (() => {
	let costs = [];

	return function () {
		if (arguments.length === 0)
		{
			return costs.reduce((all, item) => all + item, 0);
		}
		else
		{
			[].push.apply(costs, arguments);
		}
	};
})();

cost(1);
cost(1);
cost(3);
cost(5);
console.log(cost());