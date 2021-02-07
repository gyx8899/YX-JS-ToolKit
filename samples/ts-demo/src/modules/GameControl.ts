import ScorePanel from "./ScorePanel";
import Snake from "./Snake";
import Food from "./Food";

class GameControl {
	scorePanel: ScorePanel;
	snake: Snake;
	food: Food;
	direction: string = '';

	constructor() {
		this.scorePanel = new ScorePanel();
		this.snake = new Snake();
		this.food = new Food();

		this.init();
	}

	init() {
		document.addEventListener('keydown', this.keyDownHandler.bind(this));
	}

	keyDownHandler(e) {
		console.log('keydown:', e.key);
		const started = this.direction !== '';
		this.direction = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.key) !== -1 ? e.key : this.direction;

		if (!started && this.direction !== '') {
			this.start();
		}
	}

	getNextPosition(dir) {
		let [x, y] = [this.snake.getX(), this.snake.getY()];
		switch (dir) {
			case 'ArrowUp':
				y -= 10;
				break;
			case 'ArrowDown':
				y += 10;
				break;
			case 'ArrowLeft':
				x -= 10;
				break;
			case 'ArrowRight':
				x += 10;
				break;
			default:

				break;
		}
		return [x, y];
	}

	start() {
		setTimeout(() => {
			if (this.direction && this.snake.isLive) {
				console.log('dir: ', this.direction);
				const [x, y] = this.getNextPosition(this.direction);
				console.log(x, y, this.food.getX(), this.food.getY());
				if (x ===this.food.getX() && y === this.food.getY()) {
					this.snake.addBodies();
					this.food.change();
					this.scorePanel.addScore();
				}
				this.snake.checkHead(x, y);
				this.snake.moveBody();
				this.snake.setHead(x, y);
				//
				this.start();
			}
		}, 300);
	}
}

export default GameControl;
