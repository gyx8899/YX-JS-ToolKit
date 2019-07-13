import { debounce } from 'loadsh';
import React, { Component } from 'react';

class SearchBox extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.emitChangeDebounced = debounce(this.emitChange, 250);
	}

	handleChange(e) {
		this.emitChangeDebounced(e.target.value);
	}
	emitChange(value) {
		this.props.onChange(value);
	}

	componentWillUnmount() {
		this.emitChangeDebounced.cancel();
	}

	render() {
		return (<input
				type="text"
				placeholder={this.props.placeholder}
				defaultValue={this.props.value}
				onChange={this.handleChange}
		/>);
	}
}

export default SearchBox;