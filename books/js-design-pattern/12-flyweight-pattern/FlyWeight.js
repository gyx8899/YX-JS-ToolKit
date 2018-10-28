let objectPoolFactory = (createObjectFn) => {
	let objectPool = [];

	return {
		create: () => {
			return objectPool.length ? objectPool.shift() : createObjectFn.apply(this, arguments);
		},
		recover: (obj) => {
			objectPool.push(obj);
		}
	}
};