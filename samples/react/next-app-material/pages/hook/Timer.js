import React, {Fragment, useState, useEffect} from 'react';
import {Button} from "@material-ui/core";

function Timer() {
	const [timer, setTimer] = useState(0);
	const [isOn, setIsOn] = useState(false);

	function reset() {
		setIsOn(false);
		setTimer(0);
	}

	useEffect(() => {
		let interval;
		if (isOn) {
			interval = setInterval(() => setTimer((timer) => timer + 1), 1000);
		}
		return () => clearInterval(interval);
	}, [isOn]);

	return (
			<Fragment>
				<div>{timer}</div>
				<Button variant="contained" color="primary" onClick={() => setIsOn(!isOn)}>{`${isOn ? 'Stop' : 'Start'}`}</Button>
				<Button variant="contained" color="secondary"  onClick={() => reset()} disabled={timer === 0}>Reset</Button>
			</Fragment>
	);
}

export default Timer;