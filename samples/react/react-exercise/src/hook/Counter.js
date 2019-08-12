import React, { useState, useEffect, useRef } from 'react';

function Counter (props) {
	const [count, setCount] = useState(0);

	useEffect(() => {
		document.title = `You click count: ${count}`;
	}, [count]);

	let lastProps = useRef(props);
	useEffect(() => {
		lastProps.current = props;
	});

	return (
			<div>
				<p>Your click count: {count}</p>
				<button onClick={() => {setCount(count + 1)}}>Click me</button>
				<button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
				<button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
			</div>
	);
}

export default Counter;