/* 洗牌算法：
    1.生成一个0 - arr.length 的随机数
    2.交换该随机数位置元素和数组的最后一个元素，并把该随机位置的元素放入结果数组
    3.生成一个0 - arr.length - 1 的随机数
    4.交换该随机数位置元素和数组的倒数第二个元素，并把该随机位置的元素放入结果数组
    依次类推，直至取完所需的10k个元素
*/

function shuffle(arr, size) {
	let result = []
	for (let i = 0; i < size; i++) {
		const randomIndex = Math.floor(Math.random() * (arr.length - i))
		const item = arr[randomIndex]
		result.push(item)
		arr[randomIndex] = arr[arr.length - 1 - i]
		arr[arr.length - 1 - i] = item
	}
	return result
}

const getRandomNumber = (max, min = 0) => {
	let randomNumbers = {};
	let random = Math.floor(Math.random() * (max - min + 1)) + min;
	if (randomNumbers[random] !== undefined) {
		return getRandomNumber.call(this, max, min);
	}
	return random;
};

const getRandomNumbers = (n = 1, max, min = 0) => {
	let randomNumbers = {};
	let randomNumber = null;
	for (let i = 0; i < n; i++) {
		randomNumber = getRandomNumber(max, min);
		randomNumbers[`${randomNumber}-${i}`] = randomNumber;
	}
	return Object.values(randomNumbers);
};

const getNonRedundantRandomNumbers = (n = 1, max, min = 0, randomNumbers = {}) => {
	if (n === 0) {
		return Object.keys(randomNumbers);
	} else {
		let randomNumber = getRandomNumber(max, min),
        next = n - 1;
		if (randomNumbers[randomNumber] === undefined) {
        randomNumbers[randomNumber] = randomNumber;
    } else {
        next = n;
    }
		return getNonRedundantRandomNumbers.call(this, next, max, min, randomNumbers);
	}
};

export {
	shuffle,
	getRandomNumber,
	getRandomNumbers,
	getNonRedundantRandomNumbers,
}