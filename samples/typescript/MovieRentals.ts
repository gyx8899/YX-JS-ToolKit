/**
 * 电影
 */
class Movie
{
	private movieBasicPrice = {
		regular: 2,
		new_release: 0,
		childrens: 2,
	};
	private basicDaysRented = {
		regular: 2,
		new_release: 0,
		childrens: 2,
	};
	private movieUnitPrice = {
		regular: 1.3,
		new_release: 3,
		childrens: 0.8,
	};
	// 电影积分
	private moviePoints = {
		regular: 1,
		new_release: 2,
		childrens: 1,
	};
	private title: string;
	private type: string;

	constructor(title: string, type: string)
	{
		this.title = title;
		this.type = type;
	}

	public getTitle()
	{
		return this.title;
	}

	public getCost(daysRented: number)
	{
		let remainedDaysRented = (daysRented - this.basicDaysRented[this.type]);
		remainedDaysRented = remainedDaysRented > 0 ? remainedDaysRented : 0;
		return this.movieBasicPrice[this.type] +
				this.movieUnitPrice[this.type] * remainedDaysRented;
	}

	public getPoints()
	{
		return this.moviePoints[this.type];
	}
}

/**
 * 租赁
 */
class Rental
{
	/**
	 * @param {string} movie 租赁的电影
	 * @param {int} daysRented 租赁的时间
	 */
	private movie: Movie;
	private daysRented;

	constructor(movie: Movie, daysRented: number)
	{
		this.movie = movie;
		this.daysRented = daysRented;
	}

	public getMovieTitle = () => {
		return this.movie.getTitle();
	}
	public getMovieCost = () => {
		return this.movie.getCost(this.daysRented);
	}
	public getMoviePoints = () => {
		return this.movie.getPoints();
	}
}

/**
 * 顾客
 */
class Customer
{
	private name: string;
	private rentals: Rental[];

	constructor(name: string)
	{
		this.name = name; // 用户名字
		this.rentals = new Array(); // 用户所租赁的电影
	}

	public addRental(rental: Rental)
	{
		this.rentals.push(rental);
	}

	public statement()
	{
		let totalCost = 0; // 总金额
		let frequentRenterPoints = 0; // 用户积分
		let result = `${this.name}的租赁账单:\n`;
		// tslint:disable-next-line:prefer-for-of
		for (let i = 0; i < this.rentals.length; i++)
		{
			const rental = this.rentals[i];
			// 计算积分
			frequentRenterPoints += rental.getMoviePoints();
			// 展示result
			const movieCost = rental.getMovieCost();
			const movieTitle = rental.getMovieTitle();
			result += `${movieTitle} --- ${movieCost}\n`;
			// 计算总金额
			totalCost += movieCost;
		}
		result += `总金额为：${totalCost.toFixed(2)}\n`;
		result += `你本次出借获取的积分为：${frequentRenterPoints}`;
		return result;
	}
}

// 测试用例
function createMovie(title, type)
{
	return new Movie(title, type);
}

let movie1 = createMovie('movie1', 'regular');
let movie2 = createMovie('movie2', 'new_release');
let movie3 = createMovie('movie3', 'childrens');
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
