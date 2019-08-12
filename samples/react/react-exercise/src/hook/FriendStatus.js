import React, {useState, useEffect} from 'react';

function FriendStatus(props) {
	const [isOnline, setIsOnline] = useState(null);

	useEffect(() => {
		function handleStatusChange(state) {
			setIsOnline(stats.isOnline);
		}

		ChatAPI.subscribeFromFriendStatus(props.friend.id, handleStatusChange);

		return () => {
			ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
		}
	}, [props.firend.id]);

	let status = '';
	if (isOnline === null) {
		status = 'Loading';
	} else {
		status = isOnline ? 'Online' : 'Offline';
	}
	return status;
}

export default FriendStatus;