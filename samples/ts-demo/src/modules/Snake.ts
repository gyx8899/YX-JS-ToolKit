class Snake{
	head: HTMLElement;
	bodies: HTMLCollection;
	element: HTMLElement;
	isLive: boolean;

	constructor() {
		this.element = document.getElementById('snake');
		this.head = document.querySelector('#snake > div') as HTMLElement;
		this.bodies = this.element.getElementsByTagName('div');
		this.isLive = true;
	}

	getX() {
		return this.head.offsetLeft;
	}

	getY() {
		return this.head.offsetTop;
	}

	setX(value: number, isCheck: boolean) {
		if (value >= 0 && value <= 290) {
			if (!isCheck) {
				this.head.style.left = `${value}px`;
			}
		} else {
			console.log('Game over! 撞墙了！');
			this.isLive = false;
		}
	}

	setY(value: number, isCheck: boolean) {
		if (value >= 0 && value <= 290) {
			if (!isCheck) {
				this.head.style.top = `${value}px`;
			}
		} else {
			console.log('Game over! 撞墙了！');
			this.isLive = false;
		}
	}

	setHead(x: number, y: number) {
		this.setX(x, false);
		this.setY(y, false);
	}
	checkHead(x: number, y: number) {
		this.setX(x, true);
		this.setY(y, true);
	}

	addBodies() {
		this.element.insertAdjacentHTML('beforeend', '<div></div>');
	}

	moveBody() {
		if (this.isLive) {
			for (let i = this.bodies.length - 1; i > 0; i--) {
				const X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
				const Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
				console.log(`index: ${i}, (${X}, ${Y})`);
				(this.bodies[i] as HTMLElement).style.left = `${X}px`;
				(this.bodies[i] as HTMLElement).style.top = `${Y}px`;
			}
		}
	}
}

export default Snake;
