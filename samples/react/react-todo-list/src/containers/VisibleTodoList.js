import {connect} from "react-redux";
import TodoList from '../components/TodoList';
import {toggleTodo} from "../redux/actions";
import {visibilityFilters} from "../redux/constants/Constants";

const getVisibleTodos = (todos, type) => {
	switch (type) {
		case visibilityFilters.SHOW_ALL:
			return todos;
		case visibilityFilters.SHOW_ACTIVE:
			return todos.filter(todo => !todo.completed);
		case visibilityFilters.SHOW_COMPLETED:
			return todos.filter(todo => todo.completed);
		default:
			throw new Error('Unknown filter type!');
	}
};

const mapStateToProps = (state) => ({
	todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToProps = (dispatch) => ({
	toggleTodo: id => dispatch(toggleTodo(id))
});

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(TodoList);