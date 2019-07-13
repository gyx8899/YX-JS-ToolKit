import React, {useState, useEffect} from 'react';

function useFriendStatus(friendId) {
	const [isOnline, setIsOnline] = useState(null);

	useEffect(() => {
		function handleStatusChange (state) {
			setIsOnline(state.isOnline);
		}
		ChatAPI.subscribeToFriendStatus(friendId, handleStatusChange);
		return () => {
			ChatAPI.unsubscribeToFriendStatus(friendId, handleStatusChange);
		};
	}, [friendId]);

	return isOnline;
}

function friendStatus(props) {
	const isOnline = useFriendStatus(props.friend.id);

	if (isOnline === null) {
		return 'loading...';
	}
	return isOnline ? 'Online' : 'Offline';
}

function friendListItem(props) {
	const isOnline = useFriendStatus(props.friend.id);

	return (
			<li style={{color: (isOnline ? 'green' : 'black')}}>{props.friend.name}</li>
	);
}