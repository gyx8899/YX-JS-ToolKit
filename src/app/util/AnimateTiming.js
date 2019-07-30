// https://javascript.info/js-animation
const TIMINGS = {
	LINEAR: linear,
	QUAD: quad,
	QUAD_EASE_OUT: makeEaseOut(quad),
	QUAD_EASE_IN_OUT: makeEaseInOut(quad),
	CIRC: circ,
	CIRC_EASE_OUT: makeEaseOut(circ),
	CIRC_EASE_IN_OUT: makeEaseInOut(circ),
	BACK: back,
	BACK_EASE_OUT: makeEaseOut(back),
	BACK_EASE_IN_OUT: makeEaseInOut(back),
	BOUNCE: bounce,
	BOUNCE_EASE_OUT: makeEaseOut(bounce),
	BOUNCE_EASE_IN_OUT: makeEaseInOut(bounce),
	ELASTIC: elastic,
	ELASTIC_EASE_OUT: makeEaseOut(elastic),
	ELASTIC_EASE_IN_OUT: makeEaseInOut(elastic),
};

function animate({draw = ()=>{}, value = 1, duration = 1000, timing = TIMINGS['LINEAR']})
{
	let start = performance.now();

	requestAnimationFrame(function animate(time) {
		let timeFraction = (time - start) / duration;
		if (timeFraction > 1)
		{
			timeFraction = 1;
		}

		let progress = timing(timeFraction) * value;

		draw(progress);

		if (timeFraction < 1)
		{
			requestAnimationFrame(animate);
		}
	});
}

function linear(timeFraction)
{
	return timeFraction;
}

function quad(timeFraction)
{
	return Math.pow(timeFraction, 2);
}

function circ(timeFraction)
{
	return 1 - Math.sin(Math.acos(timeFraction));
}

function back(x, timeFraction)
{
	return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
}

function bounce(timeFraction)
{
	for (let a = 0, b = 1, result; 1; a += b, b /= 2)
	{
		if (timeFraction >= (7 - 4 * a) / 11)
		{
			return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
		}
	}
}

function elastic(x, timeFraction)
{
	return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
}

// accepts a timing function, returns the transformed variant
function makeEaseOut(timing)
{
	return function (timeFraction) {
		return 1 - timing(1 - timeFraction);
	}
}

function makeEaseInOut(timing)
{
	return function (timeFraction) {
		if (timeFraction < .5)
			return timing(2 * timeFraction) / 2;
		else
			return (2 - timing(2 * (1 - timeFraction))) / 2;
	}
}

export {
	TIMINGS,
	animate
}