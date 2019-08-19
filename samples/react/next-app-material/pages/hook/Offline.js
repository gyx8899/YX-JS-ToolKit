import React, {useState, useEffect} from 'react';

function useOffline() {
	const [isOffline, setOffline] = useState(false);

	function onOffline() {
		setOffline(true);
	}
	function onOnline() {
		setOffline(false);
	}

	useEffect(() => {
		window.addEventListener('online', onOnline);
		window.addEventListener('offline', onOffline);

		return () => {
			window.removeEventListener('online', onOnline);
			window.removeEventListener('offline', onOffline);
		}
	}, [isOffline]);

	return isOffline;
}

function App () {
	const isOffline = useOffline();

	return (
			<div>{isOffline ? '>Sorry, you are offline ...' : 'You are online!'}</div>
	);
}

export default App;