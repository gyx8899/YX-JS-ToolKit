import React, {useState, useEffect} from 'react';
import useTabHidden from '../hook/UseTabHidden';

function App() {
	const [logs, setLogs] = useState([]);
	const [isTabHidden] = useTabHidden();

	useEffect(() => {
		console.log(logs);
		setLogs([...logs, `${new Date().toISOString()}  isTabHidden = ${isTabHidden}`]);
	}, [isTabHidden]);

	return (
			<div>
				{logs.map((item, index) => <div key={index}>{item}</div>)}
			</div>
	);
}

export default App;