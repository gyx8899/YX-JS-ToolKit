import {SET_VISIBILITY_FILTER} from '../constants/ActionTypes';
import {visibilityFilters} from '../constants/Constants';

const visibilityFilter = (state = visibilityFilters.SHOW_ALL, action) => {
	switch (action.type) {
		case SET_VISIBILITY_FILTER:
			return action.filter;
		default:
			return state;
	}
};

export default visibilityFilter;