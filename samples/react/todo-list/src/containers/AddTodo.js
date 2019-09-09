import React from 'react';
import {connect} from "react-redux";
import {addTodo} from "../redux/actions";

const AddTodo = ({dispatch}) => {
	let input = null;

	return (
			<form onSubmit={e => {
				e.preventDefault();
				if (!input.value.trim()) {
					return ;
				}
				dispatch(addTodo(input.value));
				input.value = '';
			}}>
				<input ref={node => input = node}/>
				<button type="submit">Add todo</button>
			</form>
	);
};

export default connect()(AddTodo)