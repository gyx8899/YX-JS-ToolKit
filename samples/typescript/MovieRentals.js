/**
 *电影
 */
class Movie {
	constructor(title: string, priceCode: number)
	{
		this.title = title;
		this.priceCode = priceCode;
	}

	// 电影的种类
	static get REGULAR()
	{
		return 'regular'; // 普通片儿
	}

	static get NEW_RELEASE()
	{
		return 'new_release'; // 新片儿
	}

	static get CHILDRENS()
	{
		return 'childrens'; // 儿童片儿
	}
}

/**
 *租赁
 */
class Rental {
	/**
	 * @param {string} movie 租赁的电影
	 * @param {int} daysRented 租赁的时间
	 */
	constructor(movie: Movie, daysRented: number)
	{
		this.movie = movie;
		this.daysRented = daysRented;
	}
}

/**
 *顾客
 */
class Customer {
	constructor(name: string)
	{
		this.name = name; // 用户名字
		this.rentals = new Array(); // 用户所租赁的电影
	}

	addRental(rental: Rental)
	{
		this.rentals.push(rental);
	}

	statement()
	{
		let totalAmount = 0; // 总金额
		let frequentRenterPoints = 0; // 用户积分
		let result = `${this.name}的租赁账单:\n`;
		for (let i = 0; i < this.rentals.length; i++)
		{
			let rental = this.rentals[i];
			let thisAmount = 0; // 单价变量
			switch (rental.movie.priceCode)
			{
				case Movie.REGULAR:
					thisAmount += 2.5;
					if (rental.daysRented > 2)
					{
						thisAmount += (rental.daysRented - 2) * 1;
					}
					break;
				case Movie.NEW_RELEASE:
					thisAmount += rental.daysRented * 3;
					break;
				case Movie.CHILDRENS:
					thisAmount += 2;
					if (rental.daysRented > 2)
					{
						thisAmount += (rental.daysRented - 2) * 0.8;
					}
					break;
				default:
					break;
			}
			// 计算积分
			frequentRenterPoints++;
			if (
					rental.movie.priceCode == Movie.NEW_RELEASE &&
					rental.daysRented > 1
			)
			{
				frequentRenterPoints++;
			}
			// 展示result
			result += `${rental.movie.title} --- ${thisAmount}\n`;
			// 计算总金额
			totalAmount += thisAmount;
		}
		result += `总金额为：${totalAmount}\n`;
		result += `你本次出借获取的积分为：${frequentRenterPoints}`;
		return result;
	}
}

// 测试用例
let movie1 = new Movie('movie1', 'regular');
let movie2 = new Movie('movie2', 'new_release');
let movie3 = new Movie('movie3', 'childrens');
let rental1 = new Rental(movie1, 10);
let rental2 = new Rental(movie2, 5);
let rental3 = new Rental(movie3, 5);
let rental4 = new Rental(movie1, 1);
let rental5 = new Rental(movie1, 3);
let customer1 = new Customer('xiaobai');
customer1.addRental(rental1);
customer1.addRental(rental2);
customer1.addRental(rental3);
customer1.addRental(rental4);
customer1.addRental(rental5);
console.log(customer1.statement());
