import React, { useState, useEffect } from 'react';

function Counter () {
	const [count, setCount] = useState(0);

	useEffect(() => {
		document.title = `You click count: ${count}`;
	}, [count]);

	return (
			<div>
				<p>Your click count: {count}</p>
				<button onClick={() => {setCount(count + 1)}}>Click me</button>
			</div>
	);
}

export default Counter;