import React, {useState, useEffect, useReducer} from 'react';
import {Checkbox, FormControlLabel} from '@material-ui/core';

const Actions = {
	ADD_TODO: 'ADD_TODO',
	DO_TODO: 'DO_TODO',
	UNDO_TODO: 'UNDO_TODO'
};

const todoReducer = (state, action) => {
	const {ADD_TODO, DO_TODO, UNDO_TODO} = Actions;
	switch (action.type) {
		case ADD_TODO:
			return {
				...state
			};
		case DO_TODO:
			return state.map(todo => {
				if (todo.id === action.id && !todo.complete) {
					return {
						...todo,
						complete: true
					};
				} else {
					return todo;
				}
			});
		case UNDO_TODO:
			return state.map(todo => {
				if (todo.id === action.id && todo.complete) {
					return {
						...todo,
						complete: false
					}
				} else {
					return todo;
				}
			});
		default:
			return state;
	}
};


const initialTodos = [
	{
		id: 1,
		task: 'todo 1',
		complete: false
	},
	{
		id: 2,
		task: 'todo 2',
		complete: false
	}
];

function App() {
	const [todos, dispatch] = useReducer(todoReducer, initialTodos);

	const {DO_TODO, UNDO_TODO} = Actions;
	const onChange = (todo) => {
		dispatch({
			type: todo.complete ? UNDO_TODO : DO_TODO,
			id: todo.id
		})
	};

	return (
			<ul>
				{
					todos.map(todo => {
						return (
								<li key={todo.id}>
									<FormControlLabel control={
										<Checkbox checked={todo.complete}
															onChange={() => onChange(todo)}
															value={todo.task}
															color="primary"/>
									} label={todo.task}
									/>
								</li>
						);
					})
				}
			</ul>);
}

export default App;