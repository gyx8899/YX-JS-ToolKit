import React, { Component } from 'react';
import { throttle } from 'loadsh';

export class LoadMoreButton extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.handleClickThrottle = throttle(this.handleClick, 1000);
	}

	handleClick () {
		this.props.loadMore();
	}

	componentWillUnmount() {
		this.handleClickThrottle.cancel();
	}

	render () {
		return <button onClick={this.handleClickThrottle}>Load more</button>
	}
}

LoadMoreButton.defaultProps = {
	loadMore: () => {}
};