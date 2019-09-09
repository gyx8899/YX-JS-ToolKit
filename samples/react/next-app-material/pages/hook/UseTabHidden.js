// https://caniuse.com/#feat=pagevisibility
import React, {useState, useEffect, useCallback} from 'react';

function useTabHidden() {
	const [isTabHidden, setTabHidden] = useState(false);
	const [hidden, setHidden] = useState('');
	const [visibilityChange, setVisibilityChange] = useState('');
	const onVisibilityChange = useCallback(() => {
		setTabHidden(document[hidden]);
	}, [hidden]);

	useEffect(() => {
		if (typeof document.hidden !== "undefined") {
			setHidden('hidden');
			setVisibilityChange('visibilitychange');
			setTabHidden(document['visibilityState'] === 'hidden');
		} else if (typeof document.msHidden !== "undefined") {
			setHidden('msHidden');
			setVisibilityChange('msvisibilitychange');
			setTabHidden(document['msVisibilityState'] === 'hidden');
		}
	}, []);

	useEffect(() => {
		window.addEventListener(visibilityChange, onVisibilityChange);

		return () => {
			window.removeEventListener(visibilityChange, onVisibilityChange);
		};
	}, [visibilityChange]);

	return [isTabHidden];
}

export default useTabHidden;