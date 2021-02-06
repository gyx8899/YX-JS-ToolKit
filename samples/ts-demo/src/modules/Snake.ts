class Snake{
	head: HTMLElement;
	bodies: HTMLCollection;
	element: HTMLElement;

	constructor() {
		this.element = document.getElementById('snake');
		this.head = document.querySelector('#snake > div') as HTMLElement;
		this.bodies = document.getElementById('snake')!.getElementsByTagName('div');
	}

	getX() {
		return this.head.offsetLeft;
	}

	getY() {
		return this.head.offsetTop;
	}

	setX(value: number) {
		this.head.style.left = value + 'px';
	}

	setY(value: number) {
		this.head.style.top = value + 'px';
	}

	addBodies() {
		this.element.insertAdjacentHTML('beforeend', '<div></div>');
	}
}
