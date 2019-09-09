import React, {Fragment} from "react";
import useOffline from '../hook/UseOffline';

function App () {
	const [isOffline, isReOnline] = useOffline();

	return (
			<Fragment>
				<div>{isOffline ? '>Sorry, you are offline ...' : 'You are online!'}</div>
				<div>{isReOnline ? 'You are Re-online ...' : ''}</div>
			</Fragment>
	);
}

export default App;