class ScorePanel{
	score = 0;
	level = 1;

	scoreEle: HTMLElement;
	levelEle: HTMLElement;

	maxLevel: number;
	upscore: number;

	constructor(maxLevel: number = 10, upscore: number = 10) {
		this.scoreEle = document.getElementById('score');
		this.levelEle = document.getElementById('level');
		this.maxLevel = maxLevel;
		this.upscore = upscore;
	}

	addScore() {
		this.scoreEle.innerHTML = ++this.score + '';

		if (this.score % this.upscore === 0) {
			this.levelUp();
		}
	}

	levelUp() {
		if (this.level < this.maxLevel) {
			this.levelEle.innerHTML = ++this.level + '';
		}
	}
}

export default ScorePanel;
