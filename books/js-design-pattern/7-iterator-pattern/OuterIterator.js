class OuterIterator
{
	constructor(obj)
	{
		this.current = 0;
	}

	next() {
		this.current++;
	}

	isDone() {
		return this.current === obj.length;
	}

	getCurrentItem() {
		return obj[this.current];
	}
}