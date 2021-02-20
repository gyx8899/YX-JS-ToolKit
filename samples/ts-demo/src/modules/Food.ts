class Food {
	private element: HTMLElement;

	constructor() {
		this.element = document.getElementById('food')!;
	}

	get X() {
		return this.element.offsetLeft;
	}

	get Y() {
		return this.element.offsetTop;
	}

	change() {
		this.element.style.left = `${this._random()}px`;
		this.element.style.top =  `${this._random()}px`;
	}

	_random() {
		return Math.round(Math.random() * 29) * 10;
	}
}

export default Food;
