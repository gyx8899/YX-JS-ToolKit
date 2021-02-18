class Snake{
	head: HTMLElement;
	bodies: HTMLCollection;
	element: HTMLElement;
	isLive: boolean;

	constructor() {
		this.element = document.getElementById('snake');
		this.head = document.querySelector('#snake > div') as HTMLElement;
		this.bodies = this.element.getElementsByTagName('div');
	}

	get X() {
		return this.head.offsetLeft;
	}

	get Y() {
		return this.head.offsetTop;
	}

	set X(value: number) {
		if (value >= 0 && value <= 290) {
				this.head.style.left = `${value}px`;
		} else {
			throw Error('Game over! 撞墙了！')
		}
	}

	set Y(value: number) {
		if (value >= 0 && value <= 290) {
				this.head.style.top = `${value}px`;
		} else {
			throw Error('Game over! 撞墙了！')
		}
	}

	addBodies() {
		this.element.insertAdjacentHTML('beforeend', '<div></div>');
	}

	moveBody() {
		for (let i = this.bodies.length - 1; i > 0; i--) {
			const X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
			const Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
			console.log(`index: ${i}, (${X}, ${Y})`);
			(this.bodies[i] as HTMLElement).style.left = `${X}px`;
			(this.bodies[i] as HTMLElement).style.top = `${Y}px`;
		}
	}
}

export default Snake;
