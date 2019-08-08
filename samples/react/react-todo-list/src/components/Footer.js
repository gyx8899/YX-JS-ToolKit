import React from 'react';
import {visibilityFilters} from "../redux/constants/Constants";
import FilterLink from '../containers/FilterLink';

const Footer = () => (
		<div>
			<span>Show:</span>
			<FilterLink filter={visibilityFilters.SHOW_ALL}>All</FilterLink>
			<FilterLink filter={visibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
			<FilterLink filter={visibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
		</div>
);

export default Footer