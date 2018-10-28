class FormVarifyStrategy {
	static isNotEmpty(value, errorMsg)
	{
		if (value === '')
		{
			return errorMsg;
		}
	}

	static minLength(value, length, errorMsg)
	{
		if (value.length < length)
		{
			return errorMsg;
		}
	}

	static isMobile(value, errorMsg)
	{
		if (!/(^1[3|5|8][0-9]{9}$/.test(value))
		{
			return errorMsg;
		}
	}
}

class Validator {
	constructor()
	{
		this.cache = [];
	}

	add(dom, rule, errorMsg)
	{
		let args = rule.split(':');
		this.cache.push(() => {
			let strategy = args.shift();
			args.unshift(dom.value);
			args.push(errorMsg);

			return FormVarifyStrategy[strategy].apply(dom, args);
		});
	}

	adds(dom, rules, errorMsg)
	{
		if (Array.isArray(rules))
		{
			rules.map(rule => this.add(dom, rule, errorMsg));
		}
		else
		{
			this.add(dom, rules, errorMsg);
		}
	}

	start()
	{
		for (let i = 0, validatorFunc, l = this.cache.length; validatorFunc = this.cache[i], i < l; i++)
		{
			let msg = validatorFunc();
			if (msg)
			{
				return msg;
			}
		}
	}
}
//-----------------------------------------------------------
let registerForm = document.getElementById('registerForm');
let validataForm = () => {
	let validator = new Validator();
	validator.add(registerForm.userName, [{
		strategy: 'isNotEmpty',
		errorMsg: 'User name should not be null!'
	}, {
		strategy: 'minLength:6',
		errorMsg: 'User name length must be longer than 6!'
	}]);
	validator.add(registerForm.password, [{
		strategy: 'minLength:6',
		errorMsg: 'User name length must be longer than 6!'
	}]);
	validator.add(registerForm.phoneNumber, [{
		strategy: 'isMobile',
		errorMsg: 'Phone number is not correct!'
	}]);
};
registerForm.onsubmit = () => {
	let errorMsg = validataForm();
	if (errorMsg)
	{
		alert(errorMsg);
		return false;
	}
	return true;
};