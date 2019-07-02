let randomNumbers = {};
const getRandomNumber = (max, min = 0) => {
	let random = Math.floor(Math.random() * (max - min + 1)) + min;
	if (randomNumbers[random] !== undefined) {
		return getRandomNumber.call(this, max, min);
	}
	return random;
};

const getRandomNumbersWithFor = (n = 1, max, min) => {
	randomNumbers = {};
	let randomNumber = null;
	for (let i = 0; i < n; i++) {
		randomNumber = getRandomNumber(max, min);
		randomNumbers[randomNumber] = randomNumber;
	}
	return Object.keys(randomNumbers);
};

const getRandomNumbersWithoutForEach = (n = 1, max, min) => {
	let numLength = Object.keys(randomNumbers).length;
	if (numLength === 5) {
		return Object.keys(randomNumbers);
	} else if (numLength < 5) {
		let randomNumber = getRandomNumber(max, min);
		randomNumbers[randomNumber] = randomNumber;
		return getRandomNumbersWithoutForEach.call(this, n, max, min);
	}
};

export default {
	getRandomNumbersWithFor,
	getRandomNumbersWithoutForEach,
};