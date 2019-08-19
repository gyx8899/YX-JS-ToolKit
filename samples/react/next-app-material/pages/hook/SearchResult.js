import React, {useEffect, useState, Fragment} from 'react';
import axios from 'axios';

function SearchResult() {
	const [data, setData] = useState({hits: []});
	const [query, setQuery] = useState('react');

	useEffect(() => {
		let ignore = false;

		async function fetchData () {
			const result = await axios(`https://hn.algolia.com/api/v1/search?query=${query}`);
			if (!ignore) {
				setData(result.data);
			}
		}

		fetchData();

		return () => {ignore = true};
	}, [query]);

	return (
			<Fragment>
				<input value={query} onChange={(e) => setQuery(e.target.value)} />
				<ul>
					{data.hits.map(item => (
							<li key={item.objectID}>
								<a href={item.url}>{item.author} - {item.title}</a>
							</li>
					))}
				</ul>
			</Fragment>
	);
}

export default SearchResult;