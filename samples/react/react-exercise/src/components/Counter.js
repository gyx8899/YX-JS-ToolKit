import React from 'react';

class Counter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			count: 0
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState((state) => ({
			count: state.count + 1
		}));
	}

	componentDidMount() {
		document.title = `Your click count: ${this.state.count}`;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		document.title = `Your click count: ${this.state.count}`;
	}

	render() {
		return (
				<div>
					<p>Your click count: {this.state.count}</p>
					<button onClick={this.handleClick}>Click me</button>
				</div>
		);
	}
}

export default Counter;