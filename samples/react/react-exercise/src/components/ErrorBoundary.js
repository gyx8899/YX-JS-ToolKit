import React, { Component } from 'react';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hasError: false
		}
	}
	static getDeriredStateFromError(error) {
		return  {
			hasError: true
		};
	}
	componentWillUpdate(nextProps, nextState, nextContext) {

	}

	render () {
		if (this.state.hasError) {
			return <div>There are something wrong!</div>
		}
		else
		{
			return this.props.children;
		}
	}
}