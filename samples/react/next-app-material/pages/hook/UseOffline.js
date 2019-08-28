import React, {useState, useEffect, useCallback} from 'react';

function useOffline() {
	const [isOffline, setOffline] = useState(false);
	const [isReOnline, setReOnline] = useState(false);

	const onOffline = useCallback(() => {
		setOffline(true);
		setReOnline(false);
	}, [isOffline]);
	const onOnline = useCallback(() => {
		if (isOffline) {
			setReOnline(true);
		}
		setOffline(false);
	}, [isOffline, isReOnline]);

	useEffect(() => {
		window.addEventListener('online', onOnline);
		window.addEventListener('offline', onOffline);

		return () => {
			window.removeEventListener('online', onOnline);
			window.removeEventListener('offline', onOffline);
		}
	}, [isOffline]);

	return [isOffline, isReOnline];
}

function App () {
	const [isOffline, isReOnline] = useOffline();

	return (
			<div>
				<div>{isOffline ? '>Sorry, you are offline ...' : 'You are online!'}</div>
				<div>{isReOnline ? '>You are Re-online ...' : ''}</div>
			</div>
	);
}

export default App;