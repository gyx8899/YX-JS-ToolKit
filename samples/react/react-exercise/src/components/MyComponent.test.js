import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {MyComponent, SubComponent} from './MyComponent';

describe('<MyComponent />', () => {
	it('Test shallow', () => {
		const renderer = new ShallowRenderer();
		renderer.render(<MyComponent />);

		const result = renderer.getRenderOutput();

		expect(result.type).toBe('div');
		expect(result.props.children).toEqual([
			<span className="heading">Title</span>,
			<SubComponent foo="bar"/>
		]);
	})
});