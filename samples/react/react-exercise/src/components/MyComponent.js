import React from 'react';

function SubComponent() {
	return (
			<div>1234</div>
	);
}

class MyComponent extends React.Component {
	render() {
		return (
				<div>
					<span className="heading">Title</span>
					<SubComponent foo="bar"/>
				</div>
		);
	}
}

export {MyComponent, SubComponent};