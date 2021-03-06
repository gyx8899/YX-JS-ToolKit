import React, {Fragment, useState} from "react";
import {List, ListItem, Link} from '@material-ui/core';
import useFetchData from "../hook/useFetchData";

function App() {
	const searchUrl = `https://hn.algolia.com/api/v1/search?query=`;
	const [query, setQuery] = useState('redux');
	const [state, setUrl] = useFetchData(`${searchUrl}redux`,
			{hits: []},);
	const {isError, isLoading, data} = state;

	return (
			<Fragment>
				<form onSubmit={(event) => {
					setUrl(`${searchUrl}${query}`);
					event.preventDefault();
				}}>
					<input type="text"
								 value={query}
								 onChange={event => setQuery(event.target.value)}
					/>
					<button type="submit">Search</button>
				</form>
				{isError && <div>Something went wrong...</div>}
				{isLoading ? (
								<div>Loading ...</div>
						)
						: (
								<List>
									{data.hits.map(item => (
											<ListItem button key={item.objectID}>
												<Link color="primary" underline="hover">
													<a href={item.url || item.story_url}>{item.title || item.story_title}</a>
												</Link>
											</ListItem>
									))}
								</List>
						)}
			</Fragment>
	);
}

export default App;