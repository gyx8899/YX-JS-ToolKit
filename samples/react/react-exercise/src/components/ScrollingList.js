import React, { Component } from 'react';

class ScrollingList extends Component {

	constructor(props) {
		super(props);

		this.listRef = React.createRef();
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {

		if (prevProps.list.length < this.props.list.length) {
			const list = this.listRef.current;
			return list.scrollHeight - list.scrollTop;
		}
		return null;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

		if (snapshot !== null)
		{
			const list = this.listRef.current;
			list.scrollTop = list.scrollHeight - snapshot;
		}
	}

	render() {
		return (
				<div ref={this.listRef}>...</div>
		);
	}
}

export default ScrollingList;