import React, { Component } from 'react';
import rafSchedule from 'raf-schd';

class ScrollListener extends Component {
	constructor(props)
	{
		super(props);

		this.handleScroll = this.handleScroll.bind(this);
		this.scheduleUpdate = rafSchedule((pointer) => {
			this.props.onScroll(pointer);
		});
	}

	handleScroll(e) {
		this.scheduleUpdate({x: e.clientX, y: e.clientY});
	}

	componentWillUnmount() {
		this.scheduleUpdate.cancel();
	}

	render() {
		return (
				<div
					style={{overflow: 'scroll'}}
					onScroll={this.handleScroll}
				>
					<img src="#" />
				</div>
		);
	}
}

ScrollListener.defaultProps = {
	onScroll: (pointer) => {
		console.log(JSON.stringify(pointer));
	}
};

export default ScrollListener;